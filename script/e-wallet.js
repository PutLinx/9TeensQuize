let formData = {};

function handleSubmit(event) {
    event.preventDefault();
    
    // Ambil data dari form
    formData = {
        nama: document.getElementById('nama').value,
        pilihan: document.getElementById('pilihan').value,
        notelp: document.getElementById('notelp').value
    };
    
    // Tampilkan data di modal
    document.getElementById('modalNama').textContent = formData.nama;
    document.getElementById('modalPilihan').textContent = formData.pilihan;
    document.getElementById('modalNotelp').textContent = formData.notelp;
    
    // Show modal
    document.getElementById('modalOverlay').classList.add('show');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('show');
}

// Fungsi untuk generate kode acak
function generateRandomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Fungsi untuk format tanggal dan waktu
function getCurrentDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta'
    };
    return now.toLocaleDateString('id-ID', options) + ' WIB';
}

function confirmClaim() {
    // Simpan data atau kirim ke server di sini
    console.log('Data dikonfirmasi:', formData);
    
    // Generate kode acak dan timestamp
    const randomCode = generateRandomCode();
    const timestamp = getCurrentDateTime();
    const claimId = 'CLAIM-' + Date.now();
    
    // Format pesan WhatsApp yang lebih detail
    const message = `╔════════════════════════╗
║  🎁 KLAIM HADIAH E-WALLET  ║
╚════════════════════════╝

📋 *DATA PENERIMA*
━━━━━━━━━━━━━━━━━━━━━━
👤 Nama Lengkap    : ${formData.nama}
💳 Jenis E-Wallet  : ${formData.pilihan}
📱 No. Telepon     : ${formData.notelp}

🎯 *INFORMASI KLAIM*
━━━━━━━━━━━━━━━━━━━━━━
🔐 Kode Verifikasi : ${randomCode}
🆔 ID Transaksi    : ${claimId}
📅 Tanggal & Waktu : ${timestamp}
🎮 Sumber          : Quiz 9Teen's

✅ *STATUS*: Menunggu Verifikasi
━━━━━━━━━━━━━━━━━━━━━━

_Mohon untuk tidak membagikan kode verifikasi ini kepada siapapun. Terima kasih telah mengikuti Quiz 9Teen's!_ 🎉`;
    
    // Redirect ke WhatsApp
    window.location.href = 'https://wa.me/6282245078383?text=' + encodeURIComponent(message);
}

// Close modal saat klik di luar modal content
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Format nomor telepon otomatis
document.getElementById('notelp').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});