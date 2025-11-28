function claimReward(rewardType) {
            // Tambahkan logika untuk klaim hadiah di sini
            const rewardNames = {
                'e-wallet': 'E-Wallet',
                'paket-data': 'Paket Data',
                'pulsa': 'Pulsa',
                'boneka': 'Boneka Fluffy'
            };
            
            // Atau redirect ke halaman form:
            // window.location.href = `/claim/${rewardType}`;
            window.location.href = `/${rewardType}.html`;
        }
        
        // Animasi tambahan saat card di klik
        document.querySelectorAll('.reward-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.claim-btn')) {
                    this.style.animation = 'none';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 10);
                }
            });
        });