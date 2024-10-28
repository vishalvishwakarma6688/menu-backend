// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// const axios = require('axios');  // Ensure axios is imported
// const PDFDocument = require('pdfkit');
// const qrGenerator = require('./qrGenerator');  // Ensure this file is correct and exists

// const app = express();
// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(express.json());

// // Endpoint to generate a PDF file with menu items
// app.post('/generate-pdf', (req, res) => {
//   const { items } = req.body;

//   if (!items || items.length === 0) {
//     return res.status(400).json({ error: 'Items are required' });
//   }

//   const pdfPath = path.join(__dirname, 'menu.pdf');

//   // Generate the PDF document
//   const doc = new PDFDocument();
//   const stream = fs.createWriteStream(pdfPath);
//   doc.pipe(stream);

//   doc.fontSize(20).text('Menu Items', { align: 'center' });
//   doc.moveDown();

//   items.forEach((item, index) => {
//     doc.fontSize(14).text(`${index + 1}. ${item.item} - $${item.price}`);
//   });

//   doc.end();

//   stream.on('finish', () => {
//     res.json({ pdfUrl: `http://localhost:5000/menu.pdf` });
//   });

//   stream.on('error', (error) => {
//     console.error('PDF generation error:', error);
//     res.status(500).json({ error: 'Failed to generate PDF' });
//   });
// });

// // Serve the PDF file
// app.get('/menu.pdf', (req, res) => {
//   const pdfPath = path.join(__dirname, 'menu.pdf');
//   res.download(pdfPath);
// });

// // Generate QR code for the PDF URL
// app.post('/generate', async (req, res) => {
//   const { text } = req.body;

//   if (!text) {
//     return res.status(400).json({ error: 'Text is required for QR code generation' });
//   }

//   try {
//     // Generate QR code with the PDF URL
//     const qrCodeUrl = await qrGenerator.generateQRCode(text);
//     res.json({ qrCodeUrl });
//   } catch (error) {
//     console.error('Error generating QR code:', error.message);
//     res.status(500).json({ error: 'Failed to generate QR code' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });





const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const PDFDocument = require('pdfkit');
const qrGenerator = require('./qrGenerator');

const app = express();

// Use an environment variable or a default value for CORS
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'https://grand-dodol-366189.netlify.app/';
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// Endpoint to generate a PDF file with menu items
app.post('/generate-pdf', (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Items are required' });
  }

  const pdfPath = path.join(__dirname, 'menu.pdf');

  // Generate the PDF document
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  doc.fontSize(20).text('Menu Items', { align: 'center' });
  doc.moveDown();

  items.forEach((item, index) => {
    doc.fontSize(14).text(`${index + 1}. ${item.item} - $${item.price}`);
  });

  doc.end();

  stream.on('finish', () => {
    // Replace with your actual server URL, or use an environment variable
    const pdfUrl = `https://grand-dodol-366189.netlify.app//menu.pdf`;  // Update with your server URL
    res.json({ pdfUrl });
  });

  stream.on('error', (error) => {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  });
});

// Serve the PDF file
app.get('/menu.pdf', (req, res) => {
  const pdfPath = path.join(__dirname, 'menu.pdf');
  res.download(pdfPath);
});

// Generate QR code for the PDF URL
app.post('/generate', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required for QR code generation' });
  }

  try {
    // Generate QR code with the PDF URL
    const qrCodeUrl = await qrGenerator.generateQRCode(text);
    res.json({ qrCodeUrl });
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
