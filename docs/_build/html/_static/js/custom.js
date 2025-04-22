document.addEventListener('DOMContentLoaded', function () {
    // --- Add GIF to sidebar ---
    const sidebar = document.querySelector('.sidebar-sticky');
    const gifImage = document.createElement('img');
    if (sidebar) {
        gifImage.src = '_static/assets/backdrop/working-dark.gif';
        gifImage.alt = '';
        gifImage.classList.add('sidebar-gif');  
        sidebar.appendChild(gifImage);
    }

    // --- Initialize carousel ---
    const swiper = new Swiper(".profile-carousel", {
        autoHeight: true,
        rewind: true,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
    });

    // --- Add SVG sine background ---
    gifImage.onload = function() {
        let currentPhase = 0;
        const phaseIncrement = 0.15;
        let animationIntervalId = null;
        let currentSvgElement = null;

        function updateAnimation() {
            const sticky = document.querySelector('.sidebar-sticky');
            const drawerHeight = sticky ? sticky.offsetHeight : 0;
            const drawer = document.querySelector('.sidebar-drawer');
            const drawerWidth = drawer ? drawer.offsetWidth : 0;
            const gifHeight = gifImage.height;
            currentPhase -= phaseIncrement;
    
            let frameConfig = {
                width: window.innerWidth,
                height: window.innerHeight,
                waves: [
                    {
                        startX: drawerWidth,
                        startY: drawerHeight - gifHeight,
                        angleRad: -(30 * Math.PI / 180),
                        amplitude: 40,
                        wavelength: window.innerWidth / 3,
                        fillUnderneathClass: 'wave-fill-top',
                        phaseShift: currentPhase,
                    },
                    {
                        startX: drawerWidth, 
                        startY: drawerHeight - gifHeight*0.6,
                        angleRad: -(5 * Math.PI / 180),
                        amplitude: 40,
                        wavelength: window.innerWidth / 3,
                        fillUnderneathClass: 'wave-fill-bottom',
                        phaseShift: currentPhase,
                    }
                ],
                pointsPerWavelength: 20,
                generationFactor: 3,
            };
            const newSvgElement = generateSineWaves(frameConfig);

            if (currentSvgElement && currentSvgElement.parentNode) {
                currentSvgElement.parentNode.replaceChild(newSvgElement, currentSvgElement);
            } else {
                document.body.appendChild(newSvgElement);
            }
            currentSvgElement = newSvgElement;
        }
        updateAnimation();
        if (animationIntervalId) clearInterval(animationIntervalId);
        animationIntervalId = setInterval(updateAnimation, 150);
    }
});