from flask import Flask, request, jsonify, render_template_string, send_from_directory, session, redirect, url_for, flash
import sqlite3
import os
from datetime import datetime, timedelta
import random
import string
from functools import wraps
import hashlib

app = Flask(__name__, static_folder='.')
app.secret_key = 'pooks_bnb_secret_key_2025'
ADMIN_HASH = hashlib.sha256('admin123'.encode()).hexdigest()

DB_PATH = 'bookings.db'

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            booking_ref TEXT UNIQUE,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            check_in DATE NOT NULL,
            check_out DATE NOT NULL,
            room_type TEXT NOT NULL,
            guests INTEGER DEFAULT 1,
            addons TEXT,
            total_price REAL,
            status TEXT DEFAULT 'pending',
            special_requests TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def generate_ref():
    return 'POO' + ''.join(random.choices(string.digits, k=6))

init_db()

ROOM_PRICES = {'standard': 149, 'deluxe': 229, 'suite': 349}
ADDON_PRICES = {'spa': 99, 'wine': 49, 'pet': 25}

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('admin'):
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        password = request.form.get('password', '')
        if hashlib.sha256(password.encode()).hexdigest() == ADMIN_HASH:
            session['admin'] = True
            return redirect('/admin')
        flash('Invalid password')
    return render_template_string(LOGIN_HTML)

@app.route('/logout')
def logout():
    session.pop('admin', None)
    return redirect('/login')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/sitemap.xml')
def sitemap():
    xml = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pooksbnb.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://pooksbnb.com/#features</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pooksbnb.com/#gallery</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://pooksbnb.com/#testimonials</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://pooksbnb.com/#contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>'''
    return xml, 200, {'Content-Type': 'application/xml'}

@app.route('/robots.txt')
def robots():
    txt = '''User-agent: *
Allow: /
Sitemap: https://pooksbnb.com/sitemap.xml'''
    return txt, 200, {'Content-Type': 'text/plain'}

@app.route('/api/book', methods=['POST'])
def create_booking():
    data = request.json
    
    required = ['name', 'email', 'check_in', 'check_out', 'room_type', 'guests']
    for field in required:
        if field not in data or not data[field]:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    check_in = datetime.strptime(data['check_in'], '%Y-%m-%d')
    check_out = datetime.strptime(data['check_out'], '%Y-%m-%d')
    nights = (check_out - check_in).days
    
    if nights <= 0:
        return jsonify({'error': 'Check-out must be after check-in'}), 400
    
    room_price = ROOM_PRICES.get(data['room_type'].lower(), 149)
    total = room_price * nights
    
    addons = data.get('addons', [])
    addon_list = []
    for addon in addons:
        if addon in ADDON_PRICES:
            qty = data.get('wine_qty', 1) if addon == 'wine' else 1
            total += ADDON_PRICES[addon] * qty
            addon_list.append(f"{addon}:{qty}")
    
    ref = generate_ref()
    while True:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('SELECT id FROM bookings WHERE booking_ref = ?', (ref,))
        if not c.fetchone():
            break
        ref = generate_ref()
    
    c.execute('''
        INSERT INTO bookings (booking_ref, name, email, phone, check_in, check_out, room_type, guests, addons, total_price, special_requests)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (ref, data['name'], data['email'], data.get('phone'), data['check_in'], 
           data['check_out'], data['room_type'], data['guests'], 
           ','.join(addon_list), total, data.get('special_requests', '')))
    conn.commit()
    conn.close()
    
    return jsonify({
        'success': True,
        'booking_ref': ref,
        'total': total,
        'message': 'Booking confirmed. Reference: ' + ref
    })

@app.route('/api/admin/bookings')
@login_required
def get_bookings():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    status = request.args.get('status', '')
    date = request.args.get('date', '')
    
    query = 'SELECT * FROM bookings WHERE 1=1'
    params = []
    if status:
        query += ' AND status = ?'
        params.append(status)
    if date:
        query += ' AND (check_in <= ? AND check_out > ?)'
        params.extend([date, date])
    query += ' ORDER BY created_at DESC'
    
    c.execute(query, params)
    rows = c.fetchall()
    cols = [d[0] for d in c.description]
    bookings = [dict(zip(cols, row)) for row in rows]
    conn.close()
    return jsonify(bookings)

@app.route('/api/admin/stats')
@login_required
def get_stats():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    today = datetime.now().strftime('%Y-%m-%d')
    
    c.execute("SELECT COUNT(*) FROM bookings WHERE check_in <= ? AND check_out > ?", (today, today))
    checkins = c.fetchone()[0]
    
    c.execute("SELECT COUNT(*) FROM bookings WHERE status = 'pending'")
    pending = c.fetchone()[0]
    
    c.execute("SELECT COUNT(*) FROM bookings WHERE status != 'cancelled'")
    total_active = c.fetchone()[0]
    
    c.execute("SELECT SUM(total_price) FROM bookings WHERE status != 'cancelled' AND strftime('%Y-%m', created_at) = ?", 
              (datetime.now().strftime('%Y-%m'),))
    monthly_revenue = c.fetchone()[0] or 0
    
    c.execute("SELECT room_type, COUNT(*) as cnt FROM bookings WHERE status != 'cancelled' GROUP BY room_type")
    room_stats = dict(c.fetchall())
    
    occupancy = min(100, int((checkins / 12) * 100))  # assuming 12 rooms
    
    conn.close()
    return jsonify({
        'today_checkins': checkins,
        'pending': pending,
        'total_active': total_active,
        'monthly_revenue': monthly_revenue,
        'occupancy': occupancy,
        'room_stats': room_stats
    })

@app.route('/api/admin/bookings/<int:booking_id>/status', methods=['PUT'])
@login_required
def update_status(booking_id):
    data = request.json
    new_status = data.get('status')
    if new_status not in ['pending', 'confirmed', 'checked-in', 'cancelled']:
        return jsonify({'error': 'Invalid status'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('UPDATE bookings SET status = ? WHERE id = ?', (new_status, booking_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/admin')
@login_required
def admin_panel():
    return render_template_string(ADMIN_HTML)

LOGIN_HTML = '''
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pooks B&B - Admin Login</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: { extend: { fontFamily: { sans: ['Outfit', 'sans-serif'] } } }
    }
  </script>
  <style>
    body { font-family: 'Outfit'; background: #0a0a08; color: #fffbeb; }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6">
  <div class="w-full max-w-md border border-[rgba(255,251,235,0.08)] p-8 md:p-12">
    <h1 class="text-2xl font-semibold mb-2">Pooks <span style="color: #d4af37;">Admin</span></h1>
    <p class="text-[#a8a29e] mb-8">Sign in to continue</p>
    {% with messages = get_flashed_messages() %}
      {% if messages %}
        <div class="mb-4 p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          {{ messages[0] }}
        </div>
      {% endif %}
    {% endwith %}
    <form method="POST">
      <label class="block text-sm text-[#a8a29e] mb-2">Password</label>
      <input type="password" name="password" required 
        class="w-full bg-[#0f0f0d] border border-[rgba(255,251,235,0.1)] px-4 py-3 text-sm focus:border-[#d4af37] outline-none mb-6">
      <button type="submit" class="w-full bg-[#d4af37] text-[#0a0a08] py-3 font-semibold text-sm hover:bg-[#f5e6a3] transition-colors">
        Sign In
      </button>
    </form>
  </div>
</body>
</html>
'''

ADMIN_HTML = '''
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pooks B&B - Admin Panel</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Outfit', 'sans-serif'] },
          colors: { bg: '#0a0a08', surface: '#0f0f0d' }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Outfit'; background: #0a0a08; color: #fffbeb; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0a0a08; }
    ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.25); border-radius: 3px; }
    .status-pending { background: rgba(245,158,11,0.15); color: #f59e0b; }
    .status-confirmed { background: rgba(34,197,94,0.15); color: #22c55e; }
    .status-checked-in { background: rgba(59,130,246,0.15); color: #3b82f6; }
    .status-cancelled { background: rgba(239,68,68,0.15); color: #ef4444; }
  </style>
</head>
<body>
  <div class="min-h-screen p-6" style="max-width: 1400px; margin: 0 auto;">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-semibold">Pooks <span style="color: #d4af37;">Admin</span></h1>
        <p class="text-[#a8a29e] mt-1">Booking Management</p>
      </div>
      <a href="/" class="border border-[rgba(255,251,235,0.2)] px-4 py-2 text-sm hover:border-[#d4af37] transition-colors">View Site</a>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8" id="stats">
      <div class="p-4 border border-[rgba(255,251,235,0.06)]">
        <p class="text-[#a8a29e] text-sm">Today Check-ins</p>
        <p class="text-3xl font-semibold mt-1" id="statCheckins">-</p>
      </div>
      <div class="p-4 border border-[rgba(255,251,235,0.06)]">
        <p class="text-[#a8a29e] text-sm">Pending</p>
        <p class="text-3xl font-semibold mt-1" id="statPending">-</p>
      </div>
      <div class="p-4 border border-[rgba(255,251,235,0.06)]">
        <p class="text-[#a8a29e] text-sm">Active Bookings</p>
        <p class="text-3xl font-semibold mt-1" id="statActive">-</p>
      </div>
      <div class="p-4 border border-[rgba(255,251,235,0.06)]">
        <p class="text-[#a8a29e] text-sm">Occupancy</p>
        <p class="text-3xl font-semibold mt-1" id="statOccupancy">-</p>
      </div>
      <div class="p-4 border border-[rgba(255,251,235,0.06)]">
        <p class="text-[#a8a29e] text-sm">Monthly Revenue</p>
        <p class="text-3xl font-semibold mt-1" id="statRevenue">-</p>
      </div>
      <div class="p-4 border border-[rgba(255,251,235,0.06)]">
        <p class="text-[#a8a29e] text-sm">Rooms Booked</p>
        <div class="mt-1 space-y-1 text-sm" id="statRooms">-</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 mb-6">
      <select id="filterStatus" class="bg-[#0f0f0d] border border-[rgba(255,251,235,0.1)] px-4 py-2 text-sm">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="checked-in">Checked-in</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <input type="date" id="filterDate" class="bg-[#0f0f0d] border border-[rgba(255,251,235,0.1)] px-4 py-2 text-sm">
      <button onclick="loadBookings()" class="bg-[#d4af37] text-[#0a0a08] px-6 py-2 text-sm font-semibold">Filter</button>
      <button onclick="exportCSV()" class="border border-[rgba(255,251,235,0.2)] px-6 py-2 text-sm hover:border-[#d4af37] transition-colors">Export CSV</button>
    </div>

    <!-- Bookings Table -->
    <div class="border border-[rgba(255,251,235,0.06)] overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-[rgba(255,251,235,0.06)]">
            <th class="text-left p-4 text-[#a8a29e] font-medium">Ref</th>
            <th class="text-left p-4 text-[#a8a29e] font-medium">Guest</th>
            <th class="text-left p-4 text-[#a8a29e] font-medium">Dates</th>
            <th class="text-left p-4 text-[#a8a29e] font-medium">Room</th>
            <th class="text-left p-4 text-[#a8a29e] font-medium">Guests</th>
            <th class="text-left p-4 text-[#a8a29e] font-medium">Total</th>
            <th class="text-left p-4 text-[#a8a29e] font-medium">Status</th>
            <th class="text-left p-4 text-[#a8a29e] font-medium">Actions</th>
          </tr>
        </thead>
        <tbody id="bookingsBody"></tbody>
      </table>
    </div>
    <p class="text-[#a8a29e] text-sm mt-4" id="bookingCount"></p>
  </div>

  <script>
    const STATUS_CLASSES = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'checked-in': 'status-checked-in',
      'cancelled': 'status-cancelled'
    };

    const STATUS_LABELS = {
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'checked-in': 'Checked In',
      'cancelled': 'Cancelled'
    };

    function loadStats() {
      fetch('/api/admin/stats')
        .then(r => r.json())
        .then(data => {
          document.getElementById('statCheckins').textContent = data.today_checkins;
          document.getElementById('statPending').textContent = data.pending;
          document.getElementById('statActive').textContent = data.total_active;
          document.getElementById('statOccupancy').textContent = data.occupancy + '%';
          document.getElementById('statRevenue').textContent = '$' + data.monthly_revenue.toFixed(0);
          
          const roomsDiv = document.getElementById('statRooms');
          roomsDiv.innerHTML = Object.entries(data.room_stats || {}).map(([room, cnt]) => 
            `<div><span class="capitalize">${room}</span>: ${cnt}</div>`
          ).join('') || '<div>N/A</div>';
        });
    }

    function loadBookings() {
      const status = document.getElementById('filterStatus').value;
      const date = document.getElementById('filterDate').value;
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (date) params.append('date', date);
      
      fetch('/api/admin/bookings?' + params)
        .then(r => r.json())
        .then(bookings => {
          document.getElementById('bookingCount').textContent = bookings.length + ' booking(s) found';
          const tbody = document.getElementById('bookingsBody');
          tbody.innerHTML = bookings.map(b => `
            <tr class="border-b border-[rgba(255,251,235,0.04)] hover:bg-[rgba(255,251,235,0.02)]">
              <td class="p-4 font-mono text-[#d4af37]">${b.booking_ref}</td>
              <td class="p-4">
                <div class="font-medium">${b.name}</div>
                <div class="text-[#a8a29e] text-xs">${b.email}</div>
                ${b.phone ? `<div class="text-[#a8a29e] text-xs">${b.phone}</div>` : ''}
              </td>
              <td class="p-4 text-xs">
                <div>${b.check_in}</div>
                <div class="text-[#a8a29e]">to ${b.check_out}</div>
              </td>
              <td class="p-4 capitalize">${b.room_type}<br><span class="text-[#a8a29e] text-xs">${b.addons || 'none'}</span></td>
              <td class="p-4">${b.guests}</td>
              <td class="p-4 font-medium">$${b.total_price.toFixed(0)}</td>
              <td class="p-4">
                <span class="px-2 py-1 text-xs rounded ${STATUS_CLASSES[b.status] || ''}">${STATUS_LABELS[b.status] || b.status}</span>
              </td>
              <td class="p-4">
                <select onchange="updateStatus(${b.id}, this.value)" class="bg-[#0f0f0d] border border-[rgba(255,251,235,0.1)] px-2 py-1 text-xs">
                  <option value="">Change...</option>
                  <option value="confirmed">Confirm</option>
                  <option value="checked-in">Check In</option>
                  <option value="cancelled">Cancel</option>
                </select>
              </td>
            </tr>
          `).join('');
        });
    }

    function updateStatus(id, status) {
      if (!status) return;
      fetch('/api/admin/bookings/' + id + '/status', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({status: status})
      }).then(() => {
        loadBookings();
        loadStats();
      });
    }

    function exportCSV() {
      const status = document.getElementById('filterStatus').value;
      const date = document.getElementById('filterDate').value;
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (date) params.append('date', date);
      
      fetch('/api/admin/bookings?' + params)
        .then(r => r.json())
        .then(bookings => {
          const headers = ['Ref', 'Name', 'Email', 'Phone', 'Check-in', 'Check-out', 'Room', 'Guests', 'Total', 'Status', 'Addons', 'Special Requests', 'Created'];
          const rows = bookings.map(b => [b.booking_ref, b.name, b.email, b.phone, b.check_in, b.check_out, b.room_type, b.guests, b.total_price, b.status, b.addons, b.special_requests, b.created_at]);
          const csv = [headers, ...rows].map(r => r.map(c => '"' + (c || '') + '"').join(',')).join('\\n');
          const blob = new Blob([csv], {type: 'text/csv'});
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'pooks-bookings-' + new Date().toISOString().slice(0,10) + '.csv';
          a.click();
        });
    }

    loadStats();
    loadBookings();
    setInterval(() => { loadStats(); loadBookings(); }, 30000);
  </script>
</body>
</html>
'''

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
