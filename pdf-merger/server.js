const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '.pdf');
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 100 * 1024 * 1024 },
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/upload', upload.array('pdfs', 20), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  const files = req.files.map((f) => ({
    id: f.filename,
    name: f.originalname,
    size: f.size,
    path: f.path,
  }));
  res.json({ files });
});

app.post('/merge', express.json(), async (req, res) => {
  const { order } = req.body;
  if (!order || !Array.isArray(order) || order.length < 2) {
    return res.status(400).json({ error: 'At least 2 files required' });
  }

  try {
    const merged = await PDFDocument.create();

    for (const fileId of order) {
      const filePath = path.join(uploadsDir, fileId);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: `File not found: ${fileId}` });
      }
      const bytes = fs.readFileSync(filePath);
      const pdf = await PDFDocument.load(bytes);
      const pages = await merged.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((p) => merged.addPage(p));
    }

    const mergedBytes = await merged.save();
    const outName = `merged-${Date.now()}.pdf`;
    const outPath = path.join(uploadsDir, outName);
    fs.writeFileSync(outPath, mergedBytes);

    res.json({ downloadId: outName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to merge PDFs' });
  }
});

app.get('/download/:id', (req, res) => {
  const filePath = path.join(uploadsDir, req.params.id);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }
  res.download(filePath, 'merged.pdf', (err) => {
    if (!err) {
      setTimeout(() => {
        try { fs.unlinkSync(filePath); } catch {}
      }, 5000);
    }
  });
});

app.delete('/file/:id', (req, res) => {
  const filePath = path.join(uploadsDir, req.params.id);
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Could not delete file' });
  }
});

app.listen(PORT, () => {
  console.log(`PDF Merger running at http://localhost:${PORT}`);
});
