/**
 * Generates an array of {x, y} points representing a sine wave segment
 * starting from the conceptual origin (x'=0) which maps to (startX, startY).
 * The wave extends forward from this point.
 * Includes phase shift for animation. // <-- Added note
 *
 * @param {number} startX The x-coordinate for the start of the sine wave.
 * @param {number} startY The y-coordinate for the start of the sine wave.
 * @param {number} angleRad The initial angle of the sine wave in radians.
 * @param {number} amplitude Amplitude of the sine wave.
 * @param {number} wavelength Wavelength of the sine wave.
 * @param {number} [phaseShift=0] Phase shift in radians (controls horizontal offset). // <-- ADDED PARAMETER
 * @param {number} generationLength The length of the wave segment to generate forward.
 * @param {number} pointsPerWavelength How many line segments for smoothness.
 * @returns {Array<{x: number, y: number}>} An array of {x, y} coordinates.
 */
function generateSinePoints(startX, startY, angleRad, amplitude, wavelength, phaseShift = 0, generationLength, pointsPerWavelength) {
    // --- Pre-calculations ---
    const omega = (2 * Math.PI) / wavelength;
    const cosTheta = Math.cos(angleRad);
    const sinTheta = Math.sin(angleRad);

    // --- Point Generation Setup ---
    const numPoints = Math.max(10, Math.ceil((generationLength / wavelength) * pointsPerWavelength));
    const step = generationLength / numPoints;

    const points = [];
    const originValueOffset = amplitude * Math.sin(phaseShift);

    for (let i = 0; i <= numPoints; i++) {
        const x_prime = i * step;
        const y_wave = amplitude * Math.sin(omega * x_prime + phaseShift);
        const y_prime = y_wave - originValueOffset; // <-- THE FIX

        const x_rotated = x_prime * cosTheta - y_prime * sinTheta;
        const y_rotated = x_prime * sinTheta + y_prime * cosTheta;

        const x_final = parseFloat((x_rotated + startX).toFixed(2));
        const y_final = parseFloat((y_rotated + startY).toFixed(2));

        points.push({ x: x_final, y: y_final });
    }

    return points;
}

/**
 * Generates the 'd' attribute string for a filled path underneath a wave.
 * @param {Array<{x: number, y: number}>} points - The points defining the wave shape.
 * @param {number} height - The total height of the SVG canvas.
 * @returns {string|null} The SVG path data string 'd', or null if points are insufficient.
 */
function getFillUnderneathPathData(points, height) {
    const firstPt = points[0];
    const lastPt = points[points.length - 1];
    const wavePathSegment = points.map(p => `${p.x} ${p.y}`).join(' L ');

    return `M ${firstPt.x} ${height} L ${wavePathSegment} L ${lastPt.x} ${height} Z`;
}

/**
 * Generates the 'd' attribute string for a filled path between two waves.
 * @param {Array<{x: number, y: number}>} points1 - Points for the first wave boundary.
 * @param {Array<{x: number, y: number}>} points2 - Points for the second wave boundary.
 * @returns {string|null} The SVG path data string 'd', or null if points are insufficient.
 */
function getFillBetweenPathData(points1, points2) {
    const formatPoints = (pts) => pts.map(p => `${p.x} ${p.y}`).join(' L ');
    return `M ${formatPoints(points1)} L ${formatPoints(points2.slice().reverse())} Z`;
}

/**
 * Generates the 'd' attribute string for a stroke path along a wave.
 * @param {Array<{x: number, y: number}>} points - The points defining the wave shape.
 * @returns {string|null} The SVG path data string 'd', or null if points are insufficient.
 */
function getStrokePathData(points) {
    return `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;
}

/**
 * Generates an SVG DOM element with multiple sine waves and fills.
 * Now uses phaseShift from wave configs if provided. // <-- Added note
 *
 * @param {object} config - Configuration object.
 * @param {number} [config.width=200], [config.height=200], [config.pointsPerWavelength=20], [config.generationFactor=2.5]
 * @param {boolean} [config.drawStrokes=true]
 * @param {Array<object>} config.waves - Wave configs { startX, startY, angleRad, amplitude, wavelength, fillUnderneathClass, strokeClass, phaseShift } // <-- Added phaseShift here
 * @param {Array<object>} [config.fills=[]] - Fill configs { wave1Index, wave2Index, fillClass }
 * @returns {SVGElement|null} The generated SVG element.
 */
function generateSineWaves(config) {
    // --- Configuration Defaults ---
    const defaults = {
        width: 200,
        height: 200,
        drawStrokes: true,
        waves: [],
        fills: [],
        pointsPerWavelength: 20,
        generationFactor: 2.5,
    };
    const cfg = { ...defaults, ...config };

    // --- Point Generation ---
    const diagonal = Math.sqrt(cfg.width ** 2 + cfg.height ** 2);
    const generationLength = diagonal * cfg.generationFactor;
    const allWavePoints = cfg.waves.map(waveConfig => {
        const wc = { amplitude: 20, wavelength: 100, phaseShift: 0, ...waveConfig }
        return generateSinePoints(wc.startX, wc.startY, wc.angleRad, wc.amplitude, wc.wavelength, wc.phaseShift, generationLength, cfg.pointsPerWavelength);
    });

    // --- SVG Element Creation ---
    const svgNS = "http://www.w3.org/2000/svg";
    const svgElement = document.createElementNS(svgNS, "svg");
    svgElement.setAttribute('xmlns', svgNS);
    svgElement.setAttribute('width', cfg.width);
    svgElement.setAttribute('height', cfg.height);
    svgElement.setAttribute('viewBox', `0 0 ${cfg.width} ${cfg.height}`);
    svgElement.classList.add('sine-background');


    // --- Assemble Paths (Same logic as before) ---
    const defaultFillUnderneathClass = 'svg-fill-underneath';
    const defaultFillBetweenClass = 'svg-fill-between';
    const addClasses = (element, classString) => {
        if (classString && typeof classString === 'string') {
            element.classList.add(...classString.split(' ').filter(Boolean));
        }
    };

    // Create Fill Underneath Paths
    allWavePoints.forEach((points, index) => {
        const waveConfig = cfg.waves[index];
        const className = waveConfig.fillUnderneathClass !== undefined ? waveConfig.fillUnderneathClass : defaultFillUnderneathClass;
        if (className && points && points.length >= 2) { // Added check for points
            const pathData = getFillUnderneathPathData(points, cfg.height);
            if (pathData) {
                const pathElement = document.createElementNS(svgNS, "path");
                pathElement.setAttribute('d', pathData);
                addClasses(pathElement, className);
                svgElement.appendChild(pathElement);
            }
        }
    });

    // Create Fill Between Paths
    cfg.fills.forEach(fillConfig => {
         const { wave1Index, wave2Index } = fillConfig;
         const className = fillConfig.fillClass !== undefined ? fillConfig.fillClass : defaultFillBetweenClass;
         if (className && wave1Index !== undefined ) {
             const points1 = allWavePoints[wave1Index];
             const points2 = allWavePoints[wave2Index];
              if (points1 && points1.length >= 2 && points2 && points2.length >= 2) {
                 const pathData = getFillBetweenPathData(points1, points2);
                 if (pathData) {
                     const pathElement = document.createElementNS(svgNS, "path");
                     pathElement.setAttribute('d', pathData);
                     addClasses(pathElement, className);
                     svgElement.appendChild(pathElement);
                 }
             }
         }
    });

    return svgElement;
}