const QRCode = require('qrcode');

async function generateQRCode(text) {
  try {
    return await QRCode.toDataURL(text);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

module.exports = { generateQRCode };
