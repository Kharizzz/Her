/*

TemplateMo 595 3d coverflow

https://templatemo.com/tm-595-3d-coverflow

*/

// JavaScript Document

        // Coverflow functionality
        const items = document.querySelectorAll('.coverflow-item');
        const dotsContainer = document.getElementById('dots');
        const currentTitle = document.getElementById('current-title');
        const currentDescription = document.getElementById('current-description');
        const container = document.querySelector('.coverflow-container');
        const menuToggle = document.getElementById('menuToggle');
        const mainMenu = document.getElementById('mainMenu');
        const bgMusic = document.getElementById('bgMusic');
        const playPauseBtn = document.querySelector('.play-pause-btn');
        let currentIndex = 3;
        let isAnimating = false;

        // Mobile menu toggle
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on menu items (except external links)
        document.querySelectorAll('.menu-item:not(.external)').forEach(item => {
            item.addEventListener('click', (e) => {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                mainMenu.classList.remove('active');
            }
        });

        // Image data with titles and descriptions
        const imageData = [
            {
                title: "The Approach",
                description: "Wet lagi ngapain tuh keknya fokus banget😬. Langsung ke sini aja ya karena emang di awal2 KKN suasana masih cukup tegang dan ruwet. Banyak banget tugas dan konflik yang bikin kepala mumet😵. Diantara kita pun cukup banyak dinamika yang terjadi, tapi di situ kayanya kita udah mulai baikan setelah melewati banyaknya jalan yang belibet😕."
            },
            {
                title: "The Closing",
                description: "Penutupan di sini bener2 jadi akhir dari semua proker besar kita. Gak ada rapat serius ataupun eval2 lagi setelahnya. Lega, tapi rasanya kaya ada yang janggal di dada😓. Akhirnya gw sadar kalo ternyata kita belom menghabiskan cukup waktu bersama. Gw pun dengan canggung ngajak kita jalan berdua, tapi gajadi yauda kita fotbar aja😅."
            },
            {
                title: "The Sweet Remains",
                description: "Malam terindah selama KKN, dan mungkin selama gw hidup. Dalam sunyi kita deep-talk sama yang lain ditemani oleh pencahayaan redup. Ada lagi sebelum itu, gw pup🤣. Maksud gw sebelumnya lagi dimana kita berdua ngobrol banyak walau gugup. Tapi di malem itu gw coba keluarin semua isi hati dan pikiran gw yang selama ini ketutup😣. Yuk scroll👇"
            },
            {
                title: "The First Meeting",
                description: "Masih inget gak sama waktu pertama banget kita ketemu? Di situ kita semua kenalan dan maksain buat akrab walaupun malu-malu, apalagi kalo ke lu😣. Etapi malemnya kita langsung pulang bareng tau dan mungkin disitulah awal mula percikan2 itu🤔. (Btw kalo diliat2 dulu pada gemoy2 banget ya, apalagi yang black-pink xixixi)"
            },
            {
                title: "The Beginning of A Journey",
                description: "Kalo awalnya kita biasa di Lobar, makin sini pindah ke FSH, di situlah kita mulai sering bertukar pikiran dan cerita. Berbagi canda dan tawa dengan dialog yang kadang serius kadang kemana-mana😂. Yah itu semua proses yang harus kita lewatin bersama, dan kerennya kita berhasil melewati semuanya😎. Anjay bet dah emang pokoknyaaa👏."
            },
            {
                title: "The Preparation",
                description: "Di sini kita udah mulai riweh gak sih nyiapin ini itu? Mana ternyata DPL kita batu dan banyak mau😂. Oiya btw gemoy banget deh entitas yang megang boneka kuning itu. Jujur sebenernya gw sengaja bawa emang buat lu, dan yapp bener aja itu imut banget dan lucu😅. Maap banget kalo alay tapi emang bener begituu😭."
            },
            {
                title: "The Departure",
                description: "Ini pertama kalinya kita ke sana gak si? Kita langsung di sambut sama Pak RW dan beberapa akamsi😃. Ya walaupun bukan yang excited ato gimana2 tapi namanya juga perumahan awalnya kita pasti mikir emang bakal begini. Cuma seiring berjalannya waktu ternyata mereka asik parah dan friendly, jadi kangen dan pengen ke sana lagi😌." 
            }
        ];

        // Create dots
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.onclick = () => goToIndex(index);
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        let autoplayInterval = null;
        let isPlaying = true;
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');

        function updateCoverflow() {
            if (isAnimating) return;
            isAnimating = true;

            items.forEach((item, index) => {
                let offset = index - currentIndex;
                
                if (offset > items.length / 2) {
                    offset = offset - items.length;
                }
                else if (offset < -items.length / 2) {
                    offset = offset + items.length;
                }
                
                const absOffset = Math.abs(offset);
                const sign = Math.sign(offset);
                
                let translateX = offset * 220;
                let translateZ = -absOffset * 200;
                let rotateY = -sign * Math.min(absOffset * 60, 60);
                let opacity = 1 - (absOffset * 0.2);
                let scale = 1 - (absOffset * 0.1);

                if (absOffset > 3) {
                    opacity = 0;

                    translateX = sign * 800;
                }

                item.style.transform = `
                    translateX(${translateX}px) 
                    translateZ(${translateZ}px) 
                    rotateY(${rotateY}deg)
                    scale(${scale})
                `;
                item.style.opacity = opacity;
                item.style.zIndex = 100 - absOffset;

                item.classList.toggle('active', index === currentIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            const currentData = imageData[currentIndex];
            currentTitle.textContent = currentData.title;
            currentDescription.textContent = currentData.description;
            
            currentTitle.style.animation = 'none';
            currentDescription.style.animation = 'none';
            setTimeout(() => {
                currentTitle.style.animation = 'fadeIn 0.6s forwards';
                currentDescription.style.animation = 'fadeIn 0.6s forwards';
            }, 10);

            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }

        function navigate(direction) {
            if (isAnimating) return;
            
            currentIndex = currentIndex + direction;
            
            if (currentIndex < 0) {
                currentIndex = items.length - 1;
            } else if (currentIndex >= items.length) {
                currentIndex = 0;
            }
            
            updateCoverflow();
        }

        function goToIndex(index) {
            if (isAnimating || index === currentIndex) return;
            currentIndex = index;
            updateCoverflow();
        }

        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });

        // Click on items to select
        items.forEach((item, index) => {
            item.addEventListener('click', () => goToIndex(index));
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        let isSwiping = false;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = true;
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            
            const currentX = e.changedTouches[0].screenX;
            const diff = currentX - touchStartX;
            
            if (Math.abs(diff) > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        container.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
            isSwiping = false;
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 30;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
                handleUserInteraction();
                
                if (diffX > 0) {
                    navigate(1);
                } else {
                    navigate(-1);
                }
            }
        }

        // Initialize images and reflections
        items.forEach((item, index) => {
            const img = item.querySelector('img');
            const reflection = item.querySelector('.reflection');
            
            img.onload = function() {

                this.parentElement.classList.remove('image-loading');
                reflection.style.setProperty('--bg-image', `url(${this.src})`);
                reflection.style.backgroundImage = `url(${this.src})`;
                reflection.style.backgroundSize = 'cover';
                reflection.style.backgroundPosition = 'center';
            };
            
            img.onerror = function() {
                this.parentElement.classList.add('image-loading');
            };
        });
        window.addEventListener("DOMContentLoaded", () => {
            const fromLanding = sessionStorage.getItem("fromLanding");
            const urlParams = new URLSearchParams(window.location.search);
            const autoplayParam = urlParams.get("autoplay");
          
            if (fromLanding === "1" && autoplayParam === "1") {
              startAutoplay();
              playMusic();
              document.querySelector('.play-pause-btn')
                .classList.remove('paused');
              document.querySelector('.play-pause-btn')
                .classList.add('playing');
            }
          });
          // Observer untuk mendeteksi saat elemen masuk layar
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.3 }); // muncul saat 30% elemen terlihat

  // Target semua .scroll-text
  document.querySelectorAll('.scroll-text').forEach(el => observer.observe(el));
        // Autoplay functionality
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                updateCoverflow();
            }, 30000);
            isPlaying = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            bgMusic.play();
        
            playPauseBtn.classList.remove('paused');
            playPauseBtn.classList.add('playing');
        }
        
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
            isPlaying = false;
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            bgMusic.pause();
        
            playPauseBtn.classList.remove('playing');
            playPauseBtn.classList.add('paused');
        }
        function toggleAutoplay() {
            if (isPlaying) {
              stopAutoplay();
              pauseMusic();
            } else {
              startAutoplay();
              playMusic();
            }
          }
          

        function handleUserInteraction() {
            stopAutoplay();
        }

        // Add event listeners to stop autoplay on manual navigation
        items.forEach((item) => {
            item.addEventListener('click', handleUserInteraction);
        });

        document.querySelector('.nav-button.prev').addEventListener('click', handleUserInteraction);
        document.querySelector('.nav-button.next').addEventListener('click', handleUserInteraction);
        
        dots.forEach((dot) => {
            dot.addEventListener('click', handleUserInteraction);
        });

        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                handleUserInteraction();
            }
        });

        // Smooth scrolling and active menu item
        const sections = document.querySelectorAll('.section');
        const menuItems = document.querySelectorAll('.menu-item');
        const header = document.getElementById('header');
        const scrollToTopBtn = document.getElementById('scrollToTop');

        // Update active menu item on scroll
        function updateActiveMenuItem() {
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    menuItems.forEach(item => {
                        if (!item.classList.contains('external')) {
                            item.classList.remove('active');
                        }
                    });
                    if (menuItems[index] && !menuItems[index].classList.contains('external')) {
                        menuItems[index].classList.add('active');
                    }
                }
            });

            // Header background on scroll
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Show/hide scroll to top button
            if (window.scrollY > 3500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', updateActiveMenuItem);

        // Smooth scroll to section
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetId = item.getAttribute('href');
                
                // Check if it's an internal link (starts with #)
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                // External links will open normally in new tab
            });
        });

                // Logo click to scroll to bottom
        document.querySelector('.logo-container').addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });

        // Scroll to bottom button
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });


        // Form submission
        function handleSubmit(event) {
            event.preventDefault();
            alert('Thank you for your message! We\'ll get back to you soon.');
            event.target.reset();
        }

        // Initialize
        updateCoverflow();
        container.focus();
        stopAutoplay();