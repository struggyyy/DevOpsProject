(function () {
    const preTag = document.getElementById('donut');
    const funFactElement = document.getElementById('fun-fact');

    // Fetch and display a fun fact
    async function fetchFunFact() {
            console.log("fetchFunFact function called"); // Log when the function is called
        try {
            const response = await fetch(`http://localhost:5000/funfact?timestamp=${new Date().getTime()}`);
            const data = await response.json();
            console.log("Fetched fun fact:", data); // Log the fetched data
            funFactElement.querySelector('p').textContent = data.fact;
        } catch (error) {
            console.error("Error fetching fun fact:", error);
        }
    }

    // Update fun fact on click
    funFactElement.addEventListener('click', fetchFunFact);

    // Angles, Radius and Constants for ASCII animation
    let A = 1;
    let B = 1;
    const R1 = 1;
    const R2 = 2;
    const K1 = 150;
    const K2 = 5;

    // Function to render ASCII frame
    function renderAsciiFrame() {
        const b = []; // Array to store ASCII chars
        const z = []; // Array to store depth values

        const width = 280; // Width of frame
        const height = 160; // Height of frame

        A += 0.07; // Increment angle A
        B += 0.03; // Increment angle B

        // Precompute sines and cosines of A and B
        const cA = Math.cos(A), sA = Math.sin(A);
        const cB = Math.cos(B), sB = Math.sin(B);

        // Initialize arrays with default values
        for (let k = 0; k < width * height; k++) {
            b[k] = k % width === width - 1 ? '\n' : ' '; // Default ASCII char
            z[k] = 0; // Default depth
        }

        // Generate the ASCII frame
        for (let j = 0; j < 6.28; j += 0.07) {
            const ct = Math.cos(j); // Cosine of j
            const st = Math.sin(j); // Sine of j

            for (let i = 0; i < 6.28; i += 0.02) {
                const sp = Math.sin(i); // Sine of i
                const cp = Math.cos(i); // Cosine of i
                const h = ct + 2; // Temporary height
                const D = 1 / (sp * h * sA + st * cA + 5); // Perspective calculation
                const t = sp * h * cA - st * sA;

                // Calculate screen coordinates
                const x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                const y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));
                const o = x + width * y;

                // ASCII brightness index
                const N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

                // Update frame if within bounds and depth is valid
                if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                    z[o] = D;
                    b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
                }
            }
        }

        // Update the donut container with the ASCII frame
        preTag.innerHTML = b.join('');
    }

    // Function to start the ASCII animation
    function startAsciiAnimation() {
        setInterval(renderAsciiFrame, 50); // Render frame every 50ms
    }

    // Start the animation when the page loads
    if (document.all) {
        // For older versions of Internet Explorer
        window.attachEvent('onload', startAsciiAnimation);
    } else {
        // For modern browsers
        window.addEventListener('load', () => {
            startAsciiAnimation();
            fetchFunFact(); // Load an initial fun fact on page load
        }, false);
    }

    // Add event listener to re-render ASCII frame on window resize
    window.addEventListener('resize', renderAsciiFrame);
})();
