let formData = {};

        function handleSubmit(event) {
            event.preventDefault();
            
            // Ambil data dari form
            formData = {
                nama: document.getElementById('nama').value,
                nomor: document.getElementById('nomor').value,
                negara: document.getElementById('negara').value,
                provinsi: document.getElementById('provinsi').value,
                kabkota: document.getElementById('kabkota').value,
                kecamatan: document.getElementById('kecamatan').value,
                kodepos: document.getElementById('kodepos').value,
                detail: document.getElementById('detail').value,
                tujuan: document.getElementById('tujuan').value
            };
            
            // Tampilkan data di modal
            document.getElementById('modalNama').textContent = formData.nama;
            document.getElementById('modalNomor').textContent = formData.nomor;
            document.getElementById('modalNegara').textContent = formData.negara;
            document.getElementById('modalProvinsi').textContent = formData.provinsi;
            document.getElementById('modalKabkota').textContent = formData.kabkota;
            document.getElementById('modalKecamatan').textContent = formData.kecamatan;
            document.getElementById('modalKodepos').textContent = formData.kodepos;
            document.getElementById('modalTujuan').textContent = formData.tujuan;
            
            // Tampilkan detail alamat jika diisi
            if (formData.detail) {
                document.getElementById('modalDetail').textContent = formData.detail;
                document.getElementById('modalDetailItem').style.display = 'flex';
            } else {
                document.getElementById('modalDetailItem').style.display = 'none';
            }
            
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
            // Generate kode acak dan timestamp
            const randomCode = generateRandomCode();
            const timestamp = getCurrentDateTime();
            const claimId = 'CLAIM-' + Date.now();
            
            // Format alamat lengkap
            let alamatLengkap = `${formData.kecamatan}, ${formData.kabkota}, ${formData.provinsi}, ${formData.negara} ${formData.kodepos}`;
            if (formData.detail) {
                alamatLengkap = `${formData.detail}, ` + alamatLengkap;
            }
            
            // Format pesan WhatsApp
            const message = `╔════════════════════════╗
║  🧸 KLAIM HADIAH BONEKA FLUFFY  ║
╚════════════════════════╝

📋 *DATA PENERIMA*
━━━━━━━━━━━━━━━━━━━━━━
👤 Nama Lengkap    : ${formData.nama}
📱 Nomor Telepon   : ${formData.nomor}
🎁 Tujuan Hadiah   : ${formData.tujuan}

📍 *ALAMAT PENGIRIMAN*
━━━━━━━━━━━━━━━━━━━━━━
🏳️ Negara          : ${formData.negara}
🗺️ Provinsi        : ${formData.provinsi}
🏙️ Kab/Kota        : ${formData.kabkota}
📍 Kecamatan       : ${formData.kecamatan}
📮 Kode Pos        : ${formData.kodepos}${formData.detail ? `\n🏠 Detail          : ${formData.detail}` : ''}

📦 *ALAMAT LENGKAP*
${alamatLengkap}

🎯 *INFORMASI KLAIM*
━━━━━━━━━━━━━━━━━━━━━━
🔐 Kode Verifikasi : ${randomCode}
🆔 ID Transaksi    : ${claimId}
📅 Tanggal & Waktu : ${timestamp}
🎮 Sumber          : Quiz 9Teen's

✅ *STATUS*: Menunggu Verifikasi
━━━━━━━━━━━━━━━━━━━━━━

_Mohon untuk tidak membagikan kode verifikasi ini kepada siapapun. Pastikan alamat yang diberikan sudah benar. Terima kasih telah mengikuti Quiz 9Teen's!_ 🎉`;
            
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
        document.getElementById('nomor').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
        
        // Format kode pos otomatis
        document.getElementById('kodepos').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 5);
        });