document.addEventListener('DOMContentLoaded', function () {
    function createWaveBackground(options = {}) {
        const defaults = {
            containerId: 'sine-background',
            targetSelector: '.main',
            colorTop: 'rgba(0, 150, 255, 0.1)',
            colorBot: 'var(--color-background-secondary)',
            amplitude: 40,
            frequency: 2.5,
            points: 100,
            angleDegreesTop: 30,
            angleDegreesBottom: 5,
            targetYFromBottomTop: 300,
            targetYFromBottomBottom: 180,
        };
        const config = { ...defaults, ...options };

        // --- Find Target Element and its Offset ---
        const targetElement = document.querySelector(config.targetSelector);
        let mainOffsetX = 0;
        if (targetElement) {
            mainOffsetX = Math.max(0, targetElement.getBoundingClientRect().left);
        } else {
            console.warn(`Target element "${config.targetSelector}" not found. Waves will align with viewport left edge.`);
        }

        // --- Setup Container (Fixed to Viewport) ---
        let container = document.getElementById(config.containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = config.containerId;
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100vw';
            container.style.height = '100vh';
            container.style.zIndex = '-1';
            container.style.pointerEvents = 'none';
            document.body.appendChild(container);
        }
        // Clear previous SVGs inside the container
        while (container.firstChild && container.firstChild.tagName.toLowerCase() === 'svg') {
             container.removeChild(container.firstChild);
        }

        // --- Setup SVG ---
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight; // Needed for bottom reference

        svg.setAttribute('viewBox', `0 0 ${viewportWidth} ${viewportHeight}`);
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.style.display = 'block';

        const pathTopEl = document.createElementNS(svgNS, "path");
        const pathBottomEl = document.createElementNS(svgNS, "path");
        const waveHeight = config.amplitude;

        // --- Helper Function to Generate Path Data (Unchanged Internally) ---
        // Takes absolute targetY (calculated beforehand)
        // Generates path from the wave down to the bottom of the viewport
        function generateWavePath(baselineAngle, startY_at_0, targetY_absolute, totalBaselineLength, angularFreq, perpAngleCos, perpAngleSin) {
            const cosBaseline = Math.cos(baselineAngle);
            // Calculate the exact visual start point of the wave at mainOffsetX
            let finalXStart = mainOffsetX;
            let finalYStart = targetY_absolute; // Use the absolute Y calculated outside

            // Calculate offset needed only if mainOffsetX > 0 and baseline isn't vertical
             if (mainOffsetX > 0 && Math.abs(cosBaseline) > 1e-6) {
                // Distance along baseline to reach the vertical line at mainOffsetX
                const distanceToStart = mainOffsetX / cosBaseline;
                const phaseStart = distanceToStart * angularFreq;
                const sineMagnitudeStart = waveHeight * Math.sin(phaseStart);
                const deltaXStart = sineMagnitudeStart * perpAngleCos;
                const deltaYStart = sineMagnitudeStart * perpAngleSin;

                const baseXStart = mainOffsetX;
                // Base Y at offset is the target absolute Y relative to viewport top
                const baseYStart = targetY_absolute;

                finalXStart = baseXStart + deltaXStart;
                finalYStart = baseYStart + deltaYStart;
            } else if (mainOffsetX <= 0) {
                 // If offset is 0 or negative, the start point is the first point of the full wave
                const phaseStart = 0; // distance is 0
                const sineMagnitudeStart = 0; // sin(0)
                const deltaXStart = 0;
                const deltaYStart = 0;
                finalXStart = 0 + deltaXStart;
                finalYStart = startY_at_0 + deltaYStart; // Baseline Y at x=0 relative to viewport top
            }


            let wavePoints = [];
            let firstPointIndex = -1;
            let lastPointIndex = -1;

            // Calculate all potential points along the baseline extended beyond viewport if needed
             const extendedEndX = viewportWidth + Math.abs(waveHeight / cosBaseline); // Extend past right edge slightly
             const extendedEndY = startY_at_0 + extendedEndX * Math.sin(baselineAngle);
             const extendedLength = Math.hypot(extendedEndX - 0, extendedEndY - startY_at_0);
             const numPointsExtended = Math.ceil(config.points * (extendedLength / totalBaselineLength));

            for (let i = 0; i <= numPointsExtended; i++) {
                const distanceAlongBaseline = (extendedLength / numPointsExtended) * i;
                const baseX = 0 + distanceAlongBaseline * cosBaseline;
                const baseY = startY_at_0 + distanceAlongBaseline * Math.sin(baselineAngle);
                const phase = distanceAlongBaseline * angularFreq;
                const sineMagnitude = waveHeight * Math.sin(phase);
                const deltaX = sineMagnitude * perpAngleCos;
                const deltaY = sineMagnitude * perpAngleSin;
                const finalX = baseX + deltaX;
                const finalY = baseY + deltaY;

                const pointString = `${finalX.toFixed(2)},${finalY.toFixed(2)}`;

                // Check if the *baseline* point is within the visual area of interest
                // We need points that *could* affect the view from mainOffsetX to viewportWidth
                if (baseX >= mainOffsetX - Math.abs(waveHeight) && baseX <= viewportWidth + Math.abs(waveHeight)) {
                    wavePoints.push(pointString);
                    if (firstPointIndex === -1 && baseX >= mainOffsetX) {
                        firstPointIndex = wavePoints.length - 1; // Index in the *filtered* wavePoints array
                    }
                     if (baseX >= viewportWidth) {
                        lastPointIndex = wavePoints.length -1;
                        // We can potentially break early if needed, but let's calculate all for now
                        // break; // Optimization: stop once we are past the right edge
                     }
                }
            }

             // Determine the actual last point coordinates needed to close the shape at viewportWidth
            let finalXEnd = viewportWidth;
            let finalYEnd = viewportHeight; // Default to bottom right corner
            // Find the wave's Y value where the *baseline* crosses viewportWidth
            const distanceToEndBaseline = viewportWidth / cosBaseline;
            const phaseEnd = distanceToEndBaseline * angularFreq;
            const sineMagnitudeEnd = waveHeight * Math.sin(phaseEnd);
            const deltaXEnd = sineMagnitudeEnd * perpAngleCos;
            const deltaYEnd = sineMagnitudeEnd * perpAngleSin;
            const baseEndX = viewportWidth;
            const baseEndY = startY_at_0 + distanceToEndBaseline * Math.sin(baselineAngle);
            const waveEndX = baseEndX + deltaXEnd; // Should be close to viewportWidth if calculation is correct
            const waveEndY = baseEndY + deltaYEnd; // This is the Y coordinate of the wave at the right edge

             // --- Construct the Path String 'd' ---
            // Start at the bottom-left corner (relative to mainOffsetX)
            let d = `M ${mainOffsetX},${viewportHeight} `;

            // Line up to the calculated visual start point of the wave
            d += `L ${finalXStart.toFixed(2)},${finalYStart.toFixed(2)} `;

             // Add the relevant wave points
             if (wavePoints.length > 0) {
                 // If the first relevant point isn't exactly the calculated start, the L above handles it.
                 d += `L ${wavePoints.join(' ')} `;
             }

             // Line to the calculated end point of the wave at the right edge
             // Use the calculated waveEndY, clamping X at viewportWidth
             d += `L ${viewportWidth.toFixed(2)},${waveEndY.toFixed(2)} `;


            // Line down to the bottom-right corner
            d += `L ${viewportWidth},${viewportHeight} Z`; // Close the path

            return d;
        }


        // --- Top Wave Calculations ---
        const angleRadiansTop = config.angleDegreesTop * Math.PI / 180;
        const baselineAngleTop = -angleRadiansTop; // Angle relative to positive x-axis
        const cosBaselineTop = Math.cos(baselineAngleTop);
        const sinBaselineTop = Math.sin(baselineAngleTop);
        const tanBaselineTop = Math.tan(baselineAngleTop);
        // *** Calculate Absolute Y from Bottom Reference ***
        const targetYTop_absolute = viewportHeight - config.targetYFromBottomTop;
        // Calculate start Y at x=0 (needed for baseline equation)
        const startYTop_at_0 = targetYTop_absolute - mainOffsetX * tanBaselineTop;
        // Recalculate total baseline length based on viewport width (approximate, but good enough for frequency)
        const endXTop = viewportWidth;
        const endYTop_at_0 = startYTop_at_0 + viewportWidth * sinBaselineTop; // Y if baseline started at 0,0
        const totalBaselineLengthTop = Math.hypot(viewportWidth, viewportWidth * tanBaselineTop); // Length across viewport
        const angularFrequencyPerUnitLengthTop = (totalBaselineLengthTop > 0) ? (config.frequency * 2 * Math.PI) / totalBaselineLengthTop : 0;
        const perpendicularAngleTop = baselineAngleTop + Math.PI / 2;
        const cosPerpTop = Math.cos(perpendicularAngleTop);
        const sinPerpTop = Math.sin(perpendicularAngleTop);

        // --- Bottom Wave Calculations ---
        const angleRadiansBottom = config.angleDegreesBottom * Math.PI / 180;
        const baselineAngleBottom = -angleRadiansBottom; // Angle relative to positive x-axis
        const cosBaselineBottom = Math.cos(baselineAngleBottom);
        const sinBaselineBottom = Math.sin(baselineAngleBottom);
        const tanBaselineBottom = Math.tan(baselineAngleBottom);
        // *** Calculate Absolute Y from Bottom Reference ***
        const targetYBottom_absolute = viewportHeight - config.targetYFromBottomBottom;
        // Calculate start Y at x=0 (needed for baseline equation)
        const startYBottom_at_0 = targetYBottom_absolute - mainOffsetX * tanBaselineBottom;
        // Recalculate total baseline length based on viewport width (approximate, but good enough for frequency)
        const endXBottom = viewportWidth;
        const endYBottom_at_0 = startYBottom_at_0 + viewportWidth * sinBaselineBottom; // Y if baseline started at 0,0
        const totalBaselineLengthBottom = Math.hypot(viewportWidth, viewportWidth * tanBaselineBottom); // Length across viewport
        const angularFrequencyPerUnitLengthBottom = (totalBaselineLengthBottom > 0) ? (config.frequency * 2 * Math.PI) / totalBaselineLengthBottom : 0;
        const perpendicularAngleBottom = baselineAngleBottom + Math.PI / 2;
        const cosPerpBottom = Math.cos(perpendicularAngleBottom);
        const sinPerpBottom = Math.sin(perpendicularAngleBottom);


        // --- Generate Paths using Helper ---
        // Pass the calculated *absolute* Y coordinates relative to viewport top
        const dTop = generateWavePath(
            baselineAngleTop, startYTop_at_0, targetYTop_absolute, totalBaselineLengthTop,
            angularFrequencyPerUnitLengthTop, cosPerpTop, sinPerpTop
        );
        const dBottom = generateWavePath(
            baselineAngleBottom, startYBottom_at_0, targetYBottom_absolute, totalBaselineLengthBottom,
            angularFrequencyPerUnitLengthBottom, cosPerpBottom, sinPerpBottom
        );

        // --- Assign Colors ---
        pathTopEl.setAttribute('d', dTop);
        pathTopEl.setAttribute('fill', config.colorTop); // Use colorTop here
        pathBottomEl.setAttribute('d', dBottom);
        pathBottomEl.setAttribute('fill', config.colorBot); // Use colorBot here

        // --- Assemble ---
        // IMPORTANT: Add Top wave path FIRST, then Bottom wave path SECOND.
        // This makes the bottom wave render ON TOP of the top wave.
        // The bottom wave's fill (colorBot) will cover the lower part of the top wave's fill.
        svg.appendChild(pathTopEl);
        svg.appendChild(pathBottomEl);
        container.appendChild(svg);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => createWaveBackground(), 100); // Pass existing options if needed, or re-read defaults
    });

    createWaveBackground();

    // --- Add GIF to sidebar ---
    const sidebar = document.querySelector('.sidebar-sticky');
    if (sidebar) {
        const gifImage = document.createElement('img');
    
        // --- Configure the image ---  
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
            colour: "#000",
        },
    });
});