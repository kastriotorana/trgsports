const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const uploadDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|svg|webp/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
                allowed.test(file.mimetype);
    ok ? cb(null, true) : cb(new Error('Only image files allowed'));
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/upload-logo', upload.single('logo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: '/uploads/' + req.file.filename });
});

app.post('/api/order', (req, res) => {
  const order = {
    id: 'TRG-' + Date.now(),
    timestamp: new Date().toISOString(),
    ...req.body
  };
  const ordersFile = path.join(__dirname, 'orders.json');
  let orders = [];
  if (fs.existsSync(ordersFile)) {
    try { orders = JSON.parse(fs.readFileSync(ordersFile)); } catch {}
  }
  orders.push(order);
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
  res.json({ success: true, orderId: order.id });
});

app.listen(PORT, () => console.log(`TRG Sports running on port ${PORT}`));
