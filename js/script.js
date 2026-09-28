console.log("JavaScript is working!");


// ======================================================
// DARK / LIGHT MODE
// ======================================================

const THEME_KEY = "damien-theme-v2";


// Get the saved theme.
//
// IMPORTANT:
// Dark mode is the default.
// Light mode ONLY happens if "light" was explicitly saved.
function getSavedTheme() {

    const saved =
        localStorage.getItem(THEME_KEY);

    if (saved === "light") {

        return "light";

    }

    return "dark";
}


// Apply the selected theme
function applyTheme(theme) {

    const isLight =
        theme === "light";


    document.body.classList.toggle(
        "light-mode",
        isLight
    );


    const themeButton =
        document.getElementById(
            "theme-toggle"
        );


    if (themeButton) {

        if (isLight) {

            themeButton.textContent =
                "🌙 Dark Mode";

        } else {

            themeButton.textContent =
                "☀️ Light Mode";
        }


        themeButton.setAttribute(
            "aria-pressed",
            String(isLight)
        );


        themeButton.setAttribute(
            "aria-label",

            isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
        );
    }
}


// Initialize the theme
function initializeTheme() {

    const savedTheme =
        getSavedTheme();


    applyTheme(
        savedTheme
    );


    const themeButton =
        document.getElementById(
            "theme-toggle"
        );


    if (!themeButton) {

        console.warn(
            "Theme button not found."
        );

        return;
    }


    themeButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const currentlyLight =
                document.body.classList.contains(
                    "light-mode"
                );


            let nextTheme;


            if (currentlyLight) {

                nextTheme = "dark";

            } else {

                nextTheme = "light";
            }


            localStorage.setItem(
                THEME_KEY,
                nextTheme
            );


            applyTheme(
                nextTheme
            );
        }
    );
}


// Run after HTML loads
if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeTheme
    );

} else {

    initializeTheme();
}
// ======================================================
// MOUSE GLOW
// ======================================================

const mouseGlow =
    document.querySelector(
        ".glow"
    );


if (mouseGlow) {

    document.addEventListener(
        "mousemove",
        function (event) {

            mouseGlow.style.left =
                event.clientX + "px";

            mouseGlow.style.top =
                event.clientY + "px";
        }
    );
}



// ======================================================
// GET CURRENT THEME COLOUR
// ======================================================

function getThemeColor(variable) {

    const color =
        getComputedStyle(
            document.body
        )
            .getPropertyValue(
                variable
            )
            .trim();


    return color || "#00ffff";
}



// ======================================================
// MOUSE PARTICLES
// ======================================================

document.addEventListener(
    "mousemove",
    function (event) {

        const particle =
            document.createElement(
                "div"
            );


        const color =
            getThemeColor(
                "--particle"
            );


        particle.style.position =
            "fixed";


        particle.style.left =
            event.clientX + "px";


        particle.style.top =
            event.clientY + "px";


        particle.style.width =
            "6px";


        particle.style.height =
            "6px";


        particle.style.background =
            color;


        particle.style.borderRadius =
            "50%";


        particle.style.pointerEvents =
            "none";


        particle.style.zIndex =
            "99999";


        particle.style.boxShadow =

            `0 0 5px ${color},
             0 0 15px ${color}`;


        particle.style.transform =
            "translate(-50%, -50%)";


        document.body.appendChild(
            particle
        );


        const startX =
            event.clientX;


        const startY =
            event.clientY;


        const moveX =
            (Math.random() - 0.5) *
            40;


        const moveY =
            (Math.random() - 0.5) *
            40;


        const startTime =
            performance.now();


        const duration =
            400;


        function animateParticle(
            currentTime
        ) {

            const progress =

                Math.min(

                    (
                        currentTime -
                        startTime
                    ) / duration,

                    1
                );


            particle.style.left =

                startX +
                moveX * progress +
                "px";


            particle.style.top =

                startY +
                moveY * progress +
                "px";


            particle.style.opacity =
                1 - progress;


            const size =
                6 * (1 - progress);


            particle.style.width =
                size + "px";


            particle.style.height =
                size + "px";


            if (progress < 1) {

                requestAnimationFrame(
                    animateParticle
                );

            } else {

                particle.remove();
            }
        }


        requestAnimationFrame(
            animateParticle
        );
    }
);
// ======================================================
// CLICK EFFECT
// ======================================================

document.addEventListener(
    "click",
    function (event) {

        const color =
            getThemeColor(
                "--click"
            );


        // ------------------------------
        // Expanding ring
        // ------------------------------

        const ring =
            document.createElement(
                "div"
            );


        ring.style.position =
            "fixed";


        ring.style.left =
            event.clientX + "px";


        ring.style.top =
            event.clientY + "px";


        ring.style.width =
            "10px";


        ring.style.height =
            "10px";


        ring.style.border =
            `2px solid ${color}`;


        ring.style.borderRadius =
            "50%";


        ring.style.pointerEvents =
            "none";


        ring.style.zIndex =
            "100000";


        ring.style.transform =
            "translate(-50%, -50%)";


        ring.style.boxShadow =
            `0 0 10px ${color}`;


        document.body.appendChild(
            ring
        );


        const ringStart =
            performance.now();


        const ringDuration =
            300;


        function animateRing(
            currentTime
        ) {

            const progress =

                Math.min(

                    (
                        currentTime -
                        ringStart
                    ) / ringDuration,

                    1
                );


            const size =
                10 + 70 * progress;


            ring.style.width =
                size + "px";


            ring.style.height =
                size + "px";


            ring.style.opacity =
                1 - progress;


            if (progress < 1) {

                requestAnimationFrame(
                    animateRing
                );

            } else {

                ring.remove();
            }
        }


        requestAnimationFrame(
            animateRing
        );



        // ------------------------------
        // Click particles
        // ------------------------------

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            const particle =
                document.createElement(
                    "div"
                );


            particle.style.position =
                "fixed";


            particle.style.left =
                event.clientX + "px";


            particle.style.top =
                event.clientY + "px";


            particle.style.width =
                "5px";


            particle.style.height =
                "5px";


            particle.style.background =
                color;


            particle.style.borderRadius =
                "50%";


            particle.style.pointerEvents =
                "none";


            particle.style.zIndex =
                "100001";


            particle.style.boxShadow =
                `0 0 8px ${color}`;


            particle.style.transform =
                "translate(-50%, -50%)";


            document.body.appendChild(
                particle
            );


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                20 +
                Math.random() *
                50;


            const endX =
                Math.cos(angle) *
                distance;


            const endY =
                Math.sin(angle) *
                distance;


            const startTime =
                performance.now();


            const duration =
                300 +
                Math.random() *
                200;


            function animateClickParticle(
                currentTime
            ) {

                const progress =

                    Math.min(

                        (
                            currentTime -
                            startTime
                        ) / duration,

                        1
                    );


                particle.style.left =

                    event.clientX +
                    endX * progress +
                    "px";


                particle.style.top =

                    event.clientY +
                    endY * progress +
                    "px";


                particle.style.opacity =
                    1 - progress;


                const size =
                    5 * (1 - progress);


                particle.style.width =
                    size + "px";


                particle.style.height =
                    size + "px";


                if (progress < 1) {

                    requestAnimationFrame(
                        animateClickParticle
                    );

                } else {

                    particle.remove();
                }
            }


            requestAnimationFrame(
                animateClickParticle
            );
        }
    }
);



// ======================================================
// FUTURISTIC PAGE LOAD LETTER FLICKER
// ======================================================

function startBootFlicker() {

    // Elements that receive the effect
    const elements =
        document.querySelectorAll(
            "h1, h2, p, li, nav a, .theme-toggle"
        );


    // Characters used during the
    // futuristic decoding effect
    const bootCharacters =
        "01XZΛΔΣΩΦΞ#%*+=<>/|_";


    const letters = [];


    elements.forEach(
        function (element) {

            // Prevent the same element
            // from being processed twice
            if (
                element.dataset.bootDone ===
                "true"
            ) {

                return;
            }


            element.dataset.bootDone =
                "true";


            // Find all text inside
            // the element
            const walker =
                document.createTreeWalker(
                    element,
                    NodeFilter.SHOW_TEXT
                );


            const textNodes = [];


            while (
                walker.nextNode()
            ) {

                textNodes.push(
                    walker.currentNode
                );
            }


            textNodes.forEach(
                function (textNode) {

                    const text =
                        textNode.textContent;


                    // Ignore completely empty
                    // text nodes
                    if (
                        !text.trim()
                    ) {

                        return;
                    }


                    const fragment =
                        document.createDocumentFragment();


                    for (
                        let i = 0;
                        i < text.length;
                        i++
                    ) {

                        const character =
                            text[i];


                        // Keep spaces EXACTLY
                        // as normal text
                        if (
                            /\s/.test(
                                character
                            )
                        ) {

                            fragment.appendChild(
                                document.createTextNode(
                                    character
                                )
                            );

                            continue;
                        }


                        const span =
                            document.createElement(
                                "span"
                            );


                        span.className =
                            "boot-letter";


                        span.textContent =
                            character;


                        fragment.appendChild(
                            span
                        );


                        letters.push({

                            element:
                                span,

                            original:
                                character,

                            // Characters start
                            // at different times
                            delay:
                                Math.random() *
                                250,

                            // How long each
                            // character flickers
                            duration:
                                180 +
                                Math.random() *
                                220
                        });
                    }


                    textNode.parentNode.replaceChild(
                        fragment,
                        textNode
                    );
                }
            );
        }
    );



    // ==================================================
    // ONE ANIMATION LOOP
    // ==================================================

    const startTime =
        performance.now();


    function animateBoot(
        currentTime
    ) {

        let finished =
            true;


        letters.forEach(
            function (letter) {

                const elapsed =

                    currentTime -
                    startTime -
                    letter.delay;


                // Character has not started yet
                if (
                    elapsed < 0
                ) {

                    finished =
                        false;

                    return;
                }


                // Character is currently
                // decoding
                if (
                    elapsed <
                    letter.duration
                ) {

                    finished =
                        false;


                    letter.element.classList.add(
                        "boot-flicker"
                    );


                    // Show a random
                    // futuristic character
                    letter.element.textContent =

                        bootCharacters[
                            Math.floor(
                                Math.random() *
                                bootCharacters.length
                            )
                        ];


                    return;
                }


                // Character is finished.
                // Restore the ORIGINAL
                // character.
                letter.element.textContent =
                    letter.original;


                letter.element.classList.remove(
                    "boot-flicker"
                );
            }
        );


        // Keep animating until every
        // character has finished
        if (
            !finished
        ) {

            requestAnimationFrame(
                animateBoot
            );

        } else {

            // Final safety check:
            // restore every character
            // exactly as it originally was.
            letters.forEach(
                function (letter) {

                    letter.element.textContent =
                        letter.original;


                    letter.element.classList.remove(
                        "boot-flicker"
                    );
                }
            );
        }
    }


    requestAnimationFrame(
        animateBoot
    );
}



// ======================================================
// START LETTER FLICKER WHEN PAGE LOADS
// ======================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startBootFlicker
    );

} else {

    startBootFlicker();
}
// ======================================================
// QUICK SCREEN GLITCH EFFECT
// ======================================================

function startRealScreenGlitch() {

    const glitchScreen =
        document.createElement("div");

    glitchScreen.style.position = "fixed";
    glitchScreen.style.top = "0";
    glitchScreen.style.left = "0";
    glitchScreen.style.width = "100vw";
    glitchScreen.style.height = "100vh";

    // Prevent any horizontal shifting
    glitchScreen.style.margin = "0";
    glitchScreen.style.padding = "0";

    glitchScreen.style.pointerEvents = "none";
    glitchScreen.style.zIndex = "999999";
    glitchScreen.style.overflow = "hidden";

    document.body.appendChild(
        glitchScreen
    );


    // ----------------------------------------------
    // Create glitch lines
    // ----------------------------------------------

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const line =
            document.createElement("div");

        line.style.position = "absolute";

        line.style.left =
            Math.random() * 80 + "%";

        line.style.top =
            Math.random() * 100 + "%";

        line.style.width =
            (20 + Math.random() * 60) + "%";

        line.style.height =
            "2px";

        line.style.background =
            "#00ffff";

        line.style.boxShadow =
            "0 0 6px #00ffff";

        line.style.opacity =
            "0.8";

        glitchScreen.appendChild(
            line
        );
    }


    // ----------------------------------------------
    // Create glitch blocks
    // ----------------------------------------------

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const block =
            document.createElement("div");

        block.style.position = "absolute";

        block.style.left =
            Math.random() * 95 + "%";

        block.style.top =
            Math.random() * 100 + "%";

        block.style.width =
            (15 + Math.random() * 60) + "px";

        block.style.height =
            (2 + Math.random() * 8) + "px";

        block.style.background =
            "#00ffff";

        block.style.opacity =
            "0.65";

        glitchScreen.appendChild(
            block
        );
    }


    // ----------------------------------------------
    // Quick animation
    // ----------------------------------------------

    const startTime =
        performance.now();

    const duration =
        500;


    function animateGlitch(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;


        const pieces =
            glitchScreen.children;


        for (
            let i = 0;
            i < pieces.length;
            i++
        ) {

            const piece =
                pieces[i];


            // Small horizontal glitch,
            // never moves the entire screen
            piece.style.transform =
                `translateX(${
                    (Math.random() - 0.5) * 30
                }px)`;


            // Rapid flickering
            piece.style.opacity =
                Math.random() > 0.45
                    ? Math.random() * 0.8
                    : 0;
        }


        if (
            elapsed < duration
        ) {

            requestAnimationFrame(
                animateGlitch
            );

        } else {

            glitchScreen.remove();
        }
    }


    requestAnimationFrame(
        animateGlitch
    );
}



// ======================================================
// START QUICK SCREEN GLITCH
// ======================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startRealScreenGlitch
    );

} else {

    startRealScreenGlitch();
}