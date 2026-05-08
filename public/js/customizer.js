/* TRG Sports — Jersey Customizer */

const state = {
  view: 'front',
  sport: 'football',
  primaryColor: '#1a1a2e',
  secondaryColor: '#e94560',
  textColor: '#ffffff',
  pattern: 'solid',
  playerName: '',
  playerNumber: '',
  font: 'Bebas Neue',
  logoUrl: null,
  logoImg: null,
  logoPosition: 'chest-left',
  logoSize: 60,
  fabric: 'dryfit',
  quantity: 10
};

const PRICES = { dryfit: 29, mesh: 32, premium: 38 };

const canvas = document.getElementById('jerseyCanvas');
const ctx = canvas.getContext('2d');

/* ── Drawing ──────────────────────────────── */

function drawJersey() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const W = canvas.width, H = canvas.height;

  // Jersey path
  const body = new Path2D();
  body.moveTo(W * .28, H * .07);
  body.bezierCurveTo(W * .22, H * .04, W * .16, H * .05, W * .10, H * .10);
  body.lineTo(W * .02, H * .22);
  body.lineTo(W * .09, H * .38);
  body.lineTo(W * .20, H * .32);
  body.lineTo(W * .20, H * .90);
  body.lineTo(W * .80, H * .90);
  body.lineTo(W * .80, H * .32);
  body.lineTo(W * .91, H * .38);
  body.lineTo(W * .98, H * .22);
  body.lineTo(W * .90, H * .10);
  body.bezierCurveTo(W * .84, H * .05, W * .78, H * .04, W * .72, H * .07);
  body.bezierCurveTo(W * .65, H * .02, W * .35, H * .02, W * .28, H * .07);
  body.closePath();

  // Collar
  const collar = new Path2D();
  collar.moveTo(W * .36, H * .07);
  collar.bezierCurveTo(W * .42, H * .13, W * .46, H * .15, W * .50, H * .15);
  collar.bezierCurveTo(W * .54, H * .15, W * .58, H * .13, W * .64, H * .07);
  collar.bezierCurveTo(W * .58, H * .11, W * .54, H * .12, W * .50, H * .12);
  collar.bezierCurveTo(W * .46, H * .12, W * .42, H * .11, W * .36, H * .07);
  collar.closePath();

  // Left sleeve panels
  const leftSleeve = new Path2D();
  leftSleeve.moveTo(W * .10, H * .10);
  leftSleeve.lineTo(W * .02, H * .22);
  leftSleeve.lineTo(W * .09, H * .38);
  leftSleeve.lineTo(W * .20, H * .32);
  leftSleeve.lineTo(W * .20, H * .20);
  leftSleeve.closePath();

  const rightSleeve = new Path2D();
  rightSleeve.moveTo(W * .90, H * .10);
  rightSleeve.lineTo(W * .98, H * .22);
  rightSleeve.lineTo(W * .91, H * .38);
  rightSleeve.lineTo(W * .80, H * .32);
  rightSleeve.lineTo(W * .80, H * .20);
  rightSleeve.closePath();

  fillBody(body, W, H);
  fillSleeves(leftSleeve, rightSleeve);
  fillCollar(collar);
  addPattern(body, W, H);
  drawSideStripes(W, H);
  drawOutline(body);

  if (state.view === 'front') {
    drawFrontDetails(W, H);
  } else {
    drawBackDetails(W, H);
  }
}

function fillBody(path, W, H) {
  const c = state.primaryColor;
  if (state.pattern === 'gradient') {
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, state.primaryColor);
    grad.addColorStop(1, lighten(state.primaryColor, 30));
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = c;
  }
  ctx.fill(path);
}

function fillSleeves(left, right) {
  ctx.fillStyle = state.secondaryColor;
  ctx.fill(left);
  ctx.fill(right);
}

function fillCollar(path) {
  ctx.fillStyle = state.secondaryColor;
  ctx.fill(path);
}

function addPattern(body, W, H) {
  ctx.save();
  ctx.clip(body);

  switch (state.pattern) {
    case 'stripes':
      for (let x = 0; x < W; x += 30) {
        ctx.fillStyle = hexToRgba(state.secondaryColor, 0.18);
        ctx.fillRect(x, 0, 14, H);
      }
      break;
    case 'diagonal':
      ctx.fillStyle = hexToRgba(state.secondaryColor, 0.22);
      for (let i = -H; i < W + H; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i + 22, 0);
        ctx.lineTo(i + 22 + H, H); ctx.lineTo(i + H, H);
        ctx.closePath(); ctx.fill();
      }
      break;
    case 'split':
      ctx.fillStyle = state.secondaryColor;
      ctx.beginPath();
      ctx.moveTo(W * .50, 0); ctx.lineTo(W * .55, 0);
      ctx.lineTo(W * .45, H); ctx.lineTo(W * .40, H);
      ctx.closePath(); ctx.fill();
      break;
    case 'panel':
      ctx.fillStyle = hexToRgba(state.secondaryColor, 0.35);
      ctx.fillRect(0, H * .62, W, H * .28);
      break;
  }
  ctx.restore();
}

function drawSideStripes(W, H) {
  ctx.save();
  ctx.fillStyle = hexToRgba(state.secondaryColor, 0.5);
  // left stripe
  ctx.beginPath();
  ctx.moveTo(W * .20, H * .32);
  ctx.lineTo(W * .28, H * .32);
  ctx.lineTo(W * .28, H * .90);
  ctx.lineTo(W * .20, H * .90);
  ctx.closePath(); ctx.fill();
  // right stripe
  ctx.beginPath();
  ctx.moveTo(W * .80, H * .32);
  ctx.lineTo(W * .72, H * .32);
  ctx.lineTo(W * .72, H * .90);
  ctx.lineTo(W * .80, H * .90);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function drawOutline(path) {
  ctx.strokeStyle = hexToRgba(state.secondaryColor, 0.6);
  ctx.lineWidth = 2;
  ctx.stroke(path);
}

function drawFrontDetails(W, H) {
  // Logo
  if (state.logoImg) {
    const sz = state.logoSize;
    let lx, ly;
    switch (state.logoPosition) {
      case 'chest-left':   lx = W * .28; ly = H * .18; break;
      case 'chest-center': lx = W * .50 - sz / 2; ly = H * .18; break;
      case 'chest-right':  lx = W * .60; ly = H * .18; break;
      default:             lx = W * .28; ly = H * .18;
    }
    ctx.drawImage(state.logoImg, lx, ly, sz, sz * (state.logoImg.height / state.logoImg.width || 1));
  }

  // Player name bar
  const name = state.playerName || '';
  if (name) {
    const barY = H * .78;
    ctx.save();
    ctx.fillStyle = hexToRgba(state.secondaryColor, 0.85);
    roundRect(ctx, W * .29, barY - 2, W * .42, 26, 3);
    ctx.fill();
    ctx.font = `bold 18px '${state.font}', Arial, sans-serif`;
    ctx.fillStyle = state.textColor;
    ctx.textAlign = 'center';
    ctx.fillText(name.toUpperCase(), W * .50, barY + 18);
    ctx.restore();
  }

  // Front number (small, chest right)
  if (state.playerNumber) {
    ctx.save();
    ctx.font = `bold 30px '${state.font}', Arial, sans-serif`;
    ctx.fillStyle = state.textColor;
    ctx.textAlign = 'center';
    ctx.fillText(state.playerNumber, W * .65, H * .35);
    ctx.restore();
  }
}

function drawBackDetails(W, H) {
  // Name bar
  const name = state.playerName || 'PLAYER';
  ctx.save();
  ctx.fillStyle = hexToRgba(state.secondaryColor, 0.85);
  roundRect(ctx, W * .22, H * .22, W * .56, 28, 3);
  ctx.fill();
  ctx.font = `bold 20px '${state.font}', Arial, sans-serif`;
  ctx.fillStyle = state.textColor;
  ctx.textAlign = 'center';
  ctx.fillText(name.toUpperCase(), W * .50, H * .22 + 20);
  ctx.restore();

  // Big number
  const num = state.playerNumber || '10';
  ctx.save();
  const numSize = Math.min(W * .52, 180);
  ctx.font = `bold ${numSize}px '${state.font}', Arial, sans-serif`;
  ctx.fillStyle = state.textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // outline
  ctx.strokeStyle = hexToRgba(state.secondaryColor, 0.7);
  ctx.lineWidth = numSize * .04;
  ctx.lineJoin = 'round';
  ctx.strokeText(num, W * .50, H * .57);
  ctx.fillText(num, W * .50, H * .57);
  ctx.restore();
}

/* ── Event Handlers ───────────────────────── */

function updatePreview() {
  state.primaryColor   = document.getElementById('colorPrimary').value;
  state.secondaryColor = document.getElementById('colorSecondary').value;
  state.textColor      = document.getElementById('colorText').value;
  state.playerName     = document.getElementById('playerName').value;
  state.playerNumber   = document.getElementById('playerNumber').value;
  state.sport          = document.getElementById('sportSelect').value;
  state.logoPosition   = document.getElementById('logoPosition').value;
  state.logoSize       = parseInt(document.getElementById('logoSize').value);
  updateOrder();
  drawJersey();
}

function switchView(view, btn) {
  state.view = view;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  drawJersey();
}

function selectPattern(p, btn) {
  state.pattern = p;
  document.querySelectorAll('.pattern-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  drawJersey();
}

function selectFont(f, btn) {
  state.font = f;
  document.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  drawJersey();
}

function applyPreset(p, s, t) {
  document.getElementById('colorPrimary').value   = p;
  document.getElementById('colorSecondary').value = s;
  document.getElementById('colorText').value      = t;
  updatePreview();
}

function selectSport(sport) {
  document.getElementById('sportSelect').value = sport;
  document.querySelectorAll('.sport-card').forEach(c => c.classList.remove('active'));
  event.currentTarget.classList.add('active');
  updatePreview();
  document.getElementById('customize').scrollIntoView({ behavior: 'smooth' });
}

function updateOrder() {
  const fabric  = document.querySelector('input[name="fabric"]:checked')?.value || 'dryfit';
  const qty     = parseInt(document.getElementById('quantity').value) || 10;
  const price   = PRICES[fabric] || 29;
  const total   = (price * qty).toFixed(2);

  document.getElementById('sumSport').textContent  = capitalise(document.getElementById('sportSelect').value);
  document.getElementById('sumColors').textContent = 'Custom';
  document.getElementById('sumFabric').textContent = { dryfit: 'Dry-Fit', mesh: 'Mesh', premium: 'Premium' }[fabric];
  document.getElementById('sumTotal').textContent  = `€${total}`;

  state.fabric   = fabric;
  state.quantity = qty;
}

/* ── Logo Upload ──────────────────────────── */

function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('logo', file);

  fetch('/api/upload-logo', { method: 'POST', body: formData })
    .then(r => r.json())
    .then(data => {
      if (data.url) {
        state.logoUrl = data.url;
        const img = new Image();
        img.onload = () => {
          state.logoImg = img;
          document.getElementById('logoPreview').src = data.url;
          document.getElementById('logoPreview').style.display = 'block';
          document.getElementById('uploadPlaceholder').style.display = 'none';
          document.getElementById('removeLogo').style.display = 'inline-block';
          document.getElementById('logoPosRow').style.display = 'flex';
          drawJersey();
        };
        img.src = data.url;
      }
    })
    .catch(() => {
      // fallback: use local object URL
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        state.logoImg = img;
        document.getElementById('logoPreview').src = url;
        document.getElementById('logoPreview').style.display = 'block';
        document.getElementById('uploadPlaceholder').style.display = 'none';
        document.getElementById('removeLogo').style.display = 'inline-block';
        document.getElementById('logoPosRow').style.display = 'flex';
        drawJersey();
      };
      img.src = url;
    });
}

function removeLogo() {
  state.logoImg = null; state.logoUrl = null;
  document.getElementById('logoPreview').style.display = 'none';
  document.getElementById('logoPreview').src = '';
  document.getElementById('uploadPlaceholder').style.display = 'flex';
  document.getElementById('removeLogo').style.display = 'none';
  document.getElementById('logoPosRow').style.display = 'none';
  document.getElementById('logoFile').value = '';
  drawJersey();
}

// Drag & drop
const zone = document.getElementById('uploadZone');
zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
zone.addEventListener('drop', e => {
  e.preventDefault(); zone.classList.remove('drag-over');
  const f = e.dataTransfer.files[0];
  if (f && f.type.startsWith('image/')) {
    const dt = new DataTransfer(); dt.items.add(f);
    document.getElementById('logoFile').files = dt.files;
    handleLogoUpload({ target: { files: [f] } });
  }
});

/* ── Order Modal ──────────────────────────── */

function openOrderModal() {
  document.getElementById('orderModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target.id === 'orderModal') closeModal();
}

function submitOrder(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Submitting…'; btn.disabled = true;

  const payload = {
    teamName:     document.getElementById('teamName').value,
    contactName:  document.getElementById('contactName').value,
    contactEmail: document.getElementById('contactEmail').value,
    contactPhone: document.getElementById('contactPhone').value,
    sizes:        document.getElementById('sizes').value,
    notes:        document.getElementById('notes').value,
    sport:        state.sport,
    primaryColor: state.primaryColor,
    secondaryColor: state.secondaryColor,
    pattern:      state.pattern,
    playerName:   state.playerName,
    playerNumber: state.playerNumber,
    font:         state.font,
    logoUrl:      state.logoUrl,
    fabric:       state.fabric,
    quantity:     state.quantity,
    logoPosition: state.logoPosition
  };

  fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(data => {
    document.getElementById('orderForm').style.display = 'none';
    document.getElementById('orderSuccess').style.display = 'block';
    document.getElementById('orderIdDisplay').textContent = 'Order ID: ' + data.orderId;
  })
  .catch(() => {
    document.getElementById('formError').textContent = 'Something went wrong. Please try again.';
    document.getElementById('formError').style.display = 'block';
    btn.textContent = 'Submit Order'; btn.disabled = false;
  });
}

/* ── Helpers ──────────────────────────────── */

function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.slice(0,2),16);
  const g = parseInt(hex.slice(2,4),16);
  const b = parseInt(hex.slice(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function lighten(hex, amount) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  let r = Math.min(255, parseInt(hex.slice(0,2),16) + amount);
  let g = Math.min(255, parseInt(hex.slice(2,4),16) + amount);
  let b = Math.min(255, parseInt(hex.slice(4,6),16) + amount);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function capitalise(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/* ── Init ─────────────────────────────────── */

window.addEventListener('load', () => {
  updateOrder();
  drawJersey();
});
