        let currentStep = 1;
        let chances = 5;
        let gameActive = true;
        let answers = {};
        let playerName = '';
        let gameSession = null;
        
        // Jawaban yang benar
        const correctAnswers = {
            1: "42",
            2: "D",
            3: "1697",
            4: "PETA",
            5: "3",
            6: "B",
            7: "NENEK",
            8: "SUBLIMASI",
            9: "PAPUA",
            10: "20",
            11: "A",
            12: "150.000",
            13: "B",
            14: "ARTERI",
            15: "KONDUKTOR",
            16: "RUMPUT",
            17: "SELATAN",
            18: "154cm2",
            19: "32",
            20: "NACI",
            21: "INFLASI",
            22: "B",
            23: "112118199",
            24: "RUSIA",
            25: "AYAM",
            26: "DEMOKRASI",
            27: "1945",
            28: "C",
            29: "B",
            30: "B",
            31: "A",
            32: "D",
            33: "MAMALIA",
            34: "A",
            35: "C",
            36: "LAMBUNG",
            37: "80",
            38: "1513",
            39: "ORGANIK",
            40: "A",
            41: "C",
            42: "B",
            43: "C",
            44: "B",
            45: "A",
            46: "D",
            47: "BLUE",
            48: "PETANI",
            49: "C",
            50: "BOROS"
        };
        
        // Cek apakah sudah pernah bermain saat halaman dimuat
        window.addEventListener('DOMContentLoaded', function() {
            checkIfAlreadyPlayed();
            preventCheating();
            checkReset();
        });
        
        function preventCheating() {
            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                    (e.ctrlKey && e.key === 'U')) {
                    e.preventDefault();
                }
            });
        }

        function updateProgressBar() {
            const completedSteps = currentStep - 1;
            const progress = (completedSteps / 50) * 100;
            const progressBar = document.getElementById('progressBar');
            const stepIndicator = document.querySelector('.step-indicator');
            
            progressBar.style.width = progress + '%';
            stepIndicator.setAttribute('data-progress', completedSteps + '/50');
        }
        
        function checkIfAlreadyPlayed() {
            const savedData = localStorage.getItem('puzzleGameData');
            const savedProgress = localStorage.getItem('puzzleGameProgress');
            
            if (savedData) {
                const gameData = JSON.parse(savedData);
                showAlreadyPlayedScreen(gameData);
                return;
            }
            
            if (savedProgress) {
                const progressData = JSON.parse(savedProgress);
                resumeGame(progressData);
            }
        }
        
        function resumeGame(progressData) {
            playerName = progressData.playerName;
            currentStep = progressData.currentStep;
            chances = progressData.chances;
            answers = progressData.answers;
            gameActive = progressData.gameActive;
            gameSession = progressData.sessionId;
            
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';
            document.getElementById('displayName').textContent = playerName;
            
            for (let i = 1; i <= 5; i++) {
                if (i > chances) {
                    document.getElementById(`heart${i}`).classList.add('lost');
                }
            }

            for (let i = 1; i < currentStep; i++) {
                document.getElementById(`step${i}`).classList.remove('active');
            }
            
            document.getElementById(`step${currentStep}`).classList.add('active');

            updateProgressBar();
            
            if (chances === 0) {
                endGame(false);
                return;
            }
            
            showMessage(`🔄 Progress dipulihkan! Kamu di Quiziz ${currentStep}`, 'info');
        }
        
        function showAlreadyPlayedScreen(gameData) {
            // Hide semua screen lain
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('successMessage').classList.remove('show');
            document.getElementById('gameOverMessage').classList.remove('show');
            
            // Show already played screen
            document.getElementById('alreadyPlayedMessage').classList.add('show');
            
            localStorage.removeItem('puzzleGameProgress');
            
            const infoDiv = document.getElementById('savedGameInfo');
            const playedDate = new Date(gameData.completedAt).toLocaleString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            if (gameData.success) {
                infoDiv.innerHTML = `
                    <p><strong>👤 Nama Pemain :</strong> ${gameData.playerName}</p>
                    <p><strong>📅 Tanggal :</strong> ${playedDate}</p>  
                    <p><strong>✅ Status :</strong> <span style="color: #48bb78; font-weight: bold;">NILAI SEMPURNA</span></p>
                    <p><strong>❤️ Kesempatan Sisa :</strong> ${gameData.chancesRemaining} Nyawa</p>
                    <p><strong>🏆 Skor :</strong> 50/50 Quiziz</p>
                    <button class="btn" onclick="window.location.href = 'reward.html'" style="font-size: 13px; margin-top: 5px; margin-bottom: 0; position: relative;">🎁AMBIL REWARD🎁</button>
                `;
            } else {
                infoDiv.innerHTML = `
                    <p><strong>👤 Nama Pemain :</strong> ${gameData.playerName}</p>
                    <p><strong>📅 Tanggal :</strong> ${playedDate}</p>
                    <p><strong>❌ Status :</strong> <span style="color: #e53e3e; font-weight: bold;">NYAWA HABIS</span></p>
                    <p><strong>📊 Progress :</strong> ${gameData.stepsCompleted}/50 Quiziz</p>
                    <button class="btn" id="btnReset" onclick="resetQuiz()" style="font-size: 13px; margin-top: 5px; margin-bottom: 0; position: relative;"><i class="fa fa-key"></i> Minta Reset Ulang..</button>
                `;
            }
        }
        
        function startGame() {
            const nameInput = document.getElementById('playerName');
            let name = nameInput.value.trim();
            let existName = false;
            
            if (!name) {
                alert('Silakan masukkan nama Kamu terlebih dahulu!');
                existName = false;
                return;
            }

            if(name || existName === true) {
                let except = confirm('Sudah baca Ketentuan & Peraturan? (WAJIB)');
                if (except === true) {
                    console.info("Game Dimulai!");
                }
                else {
                    setTimeout(() => {window.location.href = "ketper.html"}, 500);
                    return;
                }
            }
            
            playerName = name;
            gameSession = 'session_' + Date.now();
            
            document.getElementById('displayName').textContent = name;
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('gameScreen').style.display = 'block';
            
            saveProgress();
            updateProgressBar();
        }
        
        document.getElementById('playerName').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                startGame();
            }
        });
        
        function showMessage(text, type) {
            const messageArea = document.getElementById('messageArea');
            messageArea.innerHTML = `<div class="message ${type}">${text}</div>`;
            setTimeout(() => {
                messageArea.innerHTML = '';
            }, 3000);
        }
        
        function saveProgress() {
            const progressData = {
                playerName: playerName,
                currentStep: currentStep,
                chances: chances,
                answers: answers,
                lastSaved: new Date().toISOString(),
                gameActive: gameActive,
                sessionId: gameSession
            };
            
            localStorage.setItem('puzzleGameProgress', JSON.stringify(progressData));
        }
        
        function loseChance() {
            chances--;
            document.getElementById(`heart${5 - chances}`).classList.add('lost');
            saveProgress();
            
            if (chances === 0) {
                endGame(false);
            }
        }
        
        function checkAnswer(step) {
            if (!gameActive) return;
            
            const input = document.getElementById(`answer${step}`);
            const userAnswer = input.value.trim().toUpperCase();
            const correctAnswer = correctAnswers[step];
            
            if (!userAnswer) {
                showMessage('Silakan masukkan jawaban terlebih dahulu!', 'info');
                return;
            }
            
            let isCorrect = false;
            if (step === 4) {
                isCorrect = userAnswer === 'PETA' || userAnswer === 'MAP';
            } else {
                isCorrect = userAnswer === correctAnswer;
            }

            if (step === 7) {
                isCorrect = userAnswer === 'NENEK' || userAnswer === 'nenek' || userAnswer === 'Nenek';
            } else {
                isCorrect = userAnswer === correctAnswer;
            }

            if (step === 8) {
                isCorrect = userAnswer === 'SUBLIMASI' || userAnswer === 'Sublimasi' || userAnswer === 'sublimasi' || userAnswer === 'menyublim' || userAnswer === 'Menyublim' || userAnswer === 'MENYUBLIM';
            } else {
                isCorrect = userAnswer === correctAnswer;
            }

            if (step === 18) {
                isCorrect = userAnswer === '154cm2' || userAnswer === '154CM2';
            } else {
                isCorrect = userAnswer === correctAnswer;
            }
            
            if (isCorrect) {
                answers[`step${step}`] = userAnswer;
                showMessage('✅Benar! Lanjut ke Quiziz berikutnya!', 'success');
                saveProgress();
                
                if (step < 50) {
                    setTimeout(() => {
                        document.getElementById(`step${step}`).classList.remove('active');
                        document.getElementById(`step${step + 1}`).classList.add('active');
                        currentStep = step + 1;
                        saveProgress();
                        updateProgressBar();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        updateProgressBar();
                        endGame(true);
                    }, 1500);
                }
            } else {
                loseChance();
                showMessage(`❌Salah! Kesempatan tersisa: ${chances}`, 'error');
            }
        }
        
        function endGame(success) {
            gameActive = false;
            
            // Hide game screen
            document.getElementById('gameScreen').style.display = 'none';
            
            const gameData = {
                playerName: playerName,
                completedAt: new Date().toISOString(),
                answers: answers,
                chancesRemaining: success ? chances : 0,
                success: success,
                stepsCompleted: success ? 50 : currentStep - 1,
                sessionId: gameSession
            };
            
            localStorage.setItem('puzzleGameData', JSON.stringify(gameData));
            localStorage.removeItem('puzzleGameProgress');
            
            if (success) {
                document.getElementById('successName').textContent = playerName;
                document.getElementById('successMessage').classList.add('show');
            } else {
                document.getElementById('gameOverName').textContent = playerName;
                document.getElementById('gameOverMessage').classList.add('show');
            }

            setTimeout(() => {window.location.reload()}, 3000);
        }
        
        document.querySelectorAll('input[id^="answer"]').forEach((input, index) => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && gameActive) {
                    checkAnswer(index + 1);
                }
            });
        });

        function resetQuiz() {
            let valid = false;
            let keySet = prompt('Masukkan Kata Kunci Reset : ');

            if (keySet === "511160") {
                valid = true;

                if (keySet == "511160" && valid === true) {
                    window.localStorage.clear();
                    localStorage.setItem("reset", "true");
                    setTimeout(() => {window.location.reload()}, 600);
                }
            }
            else if (keySet == undefined) {
                console.info('Kata Kunci Kosong!');
            }
            else {
                alert('Kata Kunci Salah!, hubungi owner untuk meminta kunci..');
            }
        }

        function checkReset() {
            if (localStorage.getItem("reset", "true")) {
                document.getElementById('btnReset').style.display = "none";
            }
        }