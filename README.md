# PDF Merger

A lightweight, privacy-first web app to merge multiple PDF files in your browser. Upload your PDFs, drag to reorder them, and download a single merged file — all without sending your documents to any external server.

---

## Features

- **Drag & drop upload** — drop PDFs directly onto the page or use the file browser
- **Reorder before merging** — drag files up and down the list to set the exact page order
- **Live progress bar** — real-time upload and merge progress feedback
- **Privacy first** — files are processed locally on your machine and auto-deleted after download
- **No sign-up required** — open the app and start merging immediately
- **Up to 20 files** — merge up to 20 PDFs at a time (100 MB per file)
- **Clean, modern UI** — dark-themed interface with smooth drag-and-drop interactions

---

## Screenshots

> Upload your PDFs, drag to reorder, and hit **Merge PDFs**.

```
┌─────────────────────────────────────────────┐
│             📄  PDF Merger                  │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │   📂  Drop PDFs here                │   │
│   │      or browse files                │   │
│   │   PDF only · Max 100MB · 20 files   │   │
│   └─────────────────────────────────────┘   │
│                                             │
│   FILES TO MERGE              3 files       │
│   ⠿ 📄 report.pdf          1   1.2 MB  ✕   │
│   ⠿ 📄 appendix.pdf        2   800 KB  ✕   │
│   ⠿ 📄 cover.pdf           3   450 KB  ✕   │
│                                             │
│   [ 🗑 Clear all ]  [ ✨ Merge PDFs ]       │
└─────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | [Node.js](https://nodejs.org) + [Express](https://expressjs.com) |
| PDF processing | [pdf-lib](https://pdf-lib.js.org) |
| File uploads | [Multer](https://github.com/expressjs/multer) |
| Frontend | Vanilla HTML, CSS, JavaScript (no framework) |

---

## Prerequisites

- [Node.js](https://nodejs.org) v16 or higher
- npm (comes with Node.js)

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/pdf-merger.git
cd pdf-merger
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the server**

```bash
npm start
```

**4. Open in your browser**

```
http://localhost:3000
```

That's it — no environment variables, no database, no configuration needed.

---

## How to Use

1. **Upload PDFs** — drag and drop your PDF files onto the upload area, or click **browse files** to pick them from your file system. You can upload up to 20 files at once.

2. **Reorder** — drag the files in the list up or down to arrange them in the order you want them merged. The numbered badge on each row shows the final page order.

3. **Remove files** — click the **✕** button on any file to remove it from the list before merging.

4. **Merge** — once at least 2 files are uploaded, click **✨ Merge PDFs**. The merged file will download automatically to your machine.

5. **Start over** — click **🗑 Clear all** to remove all files and start fresh.

---

## Project Structure

```
pdf-merger/
├── public/
│   └── index.html      # Frontend UI (single page)
├── uploads/            # Temporary file storage (auto-cleaned)
├── server.js           # Express server & API routes
├── package.json
└── README.md
```

---

## API Endpoints

| Method | Endpoint          | Description                              |
|--------|-------------------|------------------------------------------|
| POST   | `/upload`         | Upload one or more PDF files             |
| POST   | `/merge`          | Merge uploaded files in the given order  |
| GET    | `/download/:id`   | Download the merged PDF                  |
| DELETE | `/file/:id`       | Delete a single uploaded file            |

---

## Privacy & File Handling

- Uploaded files are stored temporarily in the `uploads/` folder on the server running the app.
- Merged output files are automatically deleted 5 seconds after download.
- No files are ever sent to a third-party service — everything runs on your own machine.
- If you are self-hosting this for others, consider adding a scheduled cleanup job for the `uploads/` directory.

---

## License

MIT — free to use, modify, and distribute.
