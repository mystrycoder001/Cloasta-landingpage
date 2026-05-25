const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token) {
    return serveErrorPage(res, 'Missing Access Token', 'You must provide a secure token to download Cloasta Pro. Please check your email for the correct link.');
  }

  const secret = process.env.RAZORPAY_SECRET || 'fallback-secret-for-local-dev';
  
  try {
    // Token format: base64(timestamp).hmac
    const [b64Timestamp, providedSignature] = token.split('.');
    
    if (!b64Timestamp || !providedSignature) {
      throw new Error('Malformed token');
    }

    const timestamp = Buffer.from(b64Timestamp, 'base64').toString('utf8');
    const timeMs = parseInt(timestamp, 10);
    
    if (isNaN(timeMs)) {
      throw new Error('Invalid timestamp');
    }

    // Verify signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(b64Timestamp);
    const expectedSignature = hmac.digest('hex');

    if (expectedSignature !== providedSignature) {
      return serveErrorPage(res, 'Invalid Access Token', 'The provided token is invalid or corrupted. Please check your email for the correct link or contact support.');
    }

    // Check expiration (10 minutes)
    const now = Date.now();
    const expirationTime = timeMs + (10 * 60 * 1000); // 10 minutes

    if (now > expirationTime) {
      return serveErrorPage(res, 'Download Link Expired', 'This secure download link has expired for your protection. Links are only valid for 10 minutes after generation. Please contact support at cloastaofficial@gmail.com with your receipt to get a fresh link.');
    }

    // Serve the file
    const filePath = path.join(process.cwd(), 'private', 'cloasta-pro.zip');
    
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return serveErrorPage(res, 'File Not Found', 'The requested file could not be found on the server. Please contact support.');
    }

    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Length': stat.size,
      'Content-Disposition': 'attachment; filename="cloasta-pro.zip"'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);

  } catch (err) {
    console.error('Error validating token:', err);
    return serveErrorPage(res, 'Invalid Request', 'There was an error processing your download request.');
  }
};

function serveErrorPage(res, title, message) {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} — Cloasta</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background-color: #fafafa;
        color: #111;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
      }
      .container {
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        max-width: 500px;
        text-align: center;
        border-top: 4px solid #ef4444;
      }
      h1 { font-size: 24px; margin-bottom: 16px; color: #ef4444; }
      p { color: #4b5563; line-height: 1.6; margin-bottom: 24px; }
      a { color: #a78bfa; text-decoration: none; font-weight: 500; }
      a:hover { text-decoration: underline; }
      .btn {
        display: inline-block;
        padding: 12px 24px;
        background: #111;
        color: white;
        border-radius: 8px;
        font-weight: 500;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${title}</h1>
      <p>${message}</p>
      <a href="mailto:cloastaofficial@gmail.com" class="btn">Contact Support</a>
    </div>
  </body>
  </html>
  `;
  res.status(403).setHeader('Content-Type', 'text/html');
  res.send(html);
}
