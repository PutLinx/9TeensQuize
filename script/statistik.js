// DATA PEMAIN - ISI DATA SENDIRI DI SINI
        const playersData = [
            {
                playerName: "Stefanus",
                chancesRemaining: 5,
                completedAt: "50",
                success: true
            },
            {
                playerName: "Jeosy",
                chancesRemaining: 4,
                completedAt: "50",
                success: true
            },
            {
                playerName: "Anastasya",
                chancesRemaining: 3,
                completedAt: "50",
                success: true
            },
            {
                playerName: "Faris",
                chancesRemaining: 3,
                completedAt: "50",
                success: true
            },
            {
                playerName: "Johan",
                chancesRemaining: 3,
                completedAt: "50",
                success: true
            }
        ];
        
        // Fungsi untuk mendapatkan data pemain
        function getAllGameData() {
            // Urutkan berdasarkan sisa nyawa (descending), lalu tanggal (ascending)
            const sortedData = [...playersData].sort((a, b) => {
                if (b.chancesRemaining !== a.chancesRemaining) {
                    return b.chancesRemaining - a.chancesRemaining;
                }
                return new Date(a.completedAt) - new Date(b.completedAt);
            });
            
            return sortedData.slice(0, 5);
        }
        
        // Fungsi untuk render hearts
        function renderHearts(count) {
            let hearts = '';
            for (let i = 0; i < count; i++) {
                hearts += '❤️';
            }
            for (let i = count; i < 5; i++) {
                hearts += '🤍';
            }
            return hearts;
        }
        
        // Fungsi untuk render podium (top 3)
        function renderPodium(data) {
            const podiumSection = document.getElementById('podiumSection');
            
            if (data.length === 0) {
                podiumSection.innerHTML = '<div class="no-data">Belum ada data pemain</div>';
                return;
            }
            
            const trophies = ['🥇', '🥈', '🥉'];
            const positions = ['first', 'second', 'third'];
            const rankNumbers = ['1st', '2nd', '3rd'];
            
            let podiumHTML = '<div class="podium">';
            
            // Render dalam urutan: 2nd, 1st, 3rd untuk tampilan podium
            const order = [1, 0, 2];
            
            for (let idx of order) {
                if (data[idx]) {
                    const player = data[idx];
                    podiumHTML += `
                        <div class="podium-item ${positions[idx]}">
                            <div class="rank-badge">${rankNumbers[idx]}</div>
                            <div class="trophy">${trophies[idx]}</div>
                            <div class="player-name">${player.playerName}</div>
                            <div class="hearts">${renderHearts(player.chancesRemaining)}</div>
                            <div class="score-info">
                                <strong>Skor:</strong> 50/50 Quiz<br>
                                <strong>Nyawa:</strong> ${player.chancesRemaining}/5
                            </div>
                        </div>
                    `;
                }
            }
            
            podiumHTML += '</div>';
            podiumSection.innerHTML = podiumHTML;
        }
        
        // Fungsi untuk render full leaderboard
        function renderLeaderboard(data) {
            const leaderboardList = document.getElementById('leaderboardList');
            
            if (data.length === 0) {
                leaderboardList.innerHTML = '<div class="no-data">Belum ada data pemain</div>';
                return;
            }
            
            let listHTML = '';
            
            data.forEach((player, index) => {
                const completedDate = new Date(player.completedAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
                
                listHTML += `
                    <div class="rank-item">
                        <div class="rank-number">${index + 1}</div>
                        <div class="rank-info">
                            <div class="rank-name">${player.playerName}</div>
                            <div class="rank-hearts">${renderHearts(player.chancesRemaining)}</div>
                        </div>
                        <div class="rank-score">
                            ${player.chancesRemaining}/5 ❤️
                        </div>
                    </div>
                `;
            });
            
            leaderboardList.innerHTML = listHTML;
        }
        
        // Inisialisasi
        function init() {
            const gameData = getAllGameData();
            renderPodium(gameData);
            renderLeaderboard(gameData);
        }
        
        // Jalankan saat halaman dimuat
        window.addEventListener('DOMContentLoaded', init);