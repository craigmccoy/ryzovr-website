// Array of inspirational taglines
const allTaglines = [
    "Prove them wrong",
    "Defy the odds",
    "Break the limits",
    "Rewrite the ending",
    "Own your power",
    "Silence the doubt",
    "Stronger than before",
    "Unstoppable",
    "Turn doubt into power",
    "Take back your story",
    "From pain to strength",
    "Outlast, outshine, and rise over",
    "Burn the past, build the future",
    "Silence the noise, stand tall",
    "Rise over doubt",
    "Rise over fear",
    "Rise over pain",
    "Rise over failure",
    "Rise over the past. Outgrow, outlast, overcome",
    "Rise over limits, burn the doubt",
    "Rise over it all. Thrive louder than their doubts",
    "Rise over doubt. Reclaim your power",
    "Rise over fear. Let success be the answer",
    "Rise over pain. Write the ending they never saw coming",
    "Rise over failure. Build what they tried to break"
];

// Create a copy of taglines that we'll modify
let availableTaglines = [...allTaglines];

// Function to get a random tagline that's not currently being shown
function getRandomTagline() {
    // If we've shown all taglines, reset the available ones
    if (availableTaglines.length === 0) {
        availableTaglines = [...allTaglines];
    }
    
    // Get a random index from available taglines
    const randomIndex = Math.floor(Math.random() * availableTaglines.length);
    const selectedTagline = availableTaglines[randomIndex];
    
    // Remove the selected tagline from available ones
    availableTaglines.splice(randomIndex, 1);
    
    return selectedTagline;
}

// Function to check if a point is outside the logo's safe zone
function isOutsideLogo(x, y, taglineWidth, taglineHeight) {
    const logoRadius = 150; // Logo radius (300px width/2)
    const safeDistance = logoRadius + 20; // 20px buffer around logo
    const distanceFromCenter = Math.sqrt(x * x + y * y);
    
    // Calculate the angle to the point
    const angle = Math.atan2(y, x);
    
    // Calculate the bounding box of the tagline
    const halfWidth = taglineWidth / 2;
    const halfHeight = taglineHeight / 2;
    
    // Check all four corners of the tagline
    const corners = [
        { x: x - halfWidth, y: y - halfHeight }, // top-left
        { x: x + halfWidth, y: y - halfHeight }, // top-right
        { x: x - halfWidth, y: y + halfHeight }, // bottom-left
        { x: x + halfWidth, y: y + halfHeight }  // bottom-right
    ];
    
    // If any corner is within the logo's safe zone, return false
    return corners.every(corner => {
        const cornerDistance = Math.sqrt(corner.x * corner.x + corner.y * corner.y);
        return cornerDistance >= safeDistance;
    });
}

// Function to get a random position around the logo that doesn't overlap
function getRandomPosition(taglineText) {
    // Create a temporary element to measure text width
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.style.fontSize = '1.5rem';
    tempElement.style.fontWeight = 'bold';
    tempElement.textContent = taglineText;
    document.body.appendChild(tempElement);
    
    // Get the tagline dimensions
    const taglineWidth = tempElement.offsetWidth;
    const taglineHeight = tempElement.offsetHeight;
    document.body.removeChild(tempElement);
    
    // Viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    
    // Calculate safe boundaries
    const padding = 20;
    const minX = taglineWidth / 2 + padding;
    const maxX = viewportWidth - taglineWidth / 2 - padding;
    const minY = taglineHeight / 2 + padding;
    const maxY = viewportHeight - taglineHeight / 2 - padding;
    
    // Try random positions until we find one that doesn't overlap with the logo
    let x, y;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
        // Generate random position within viewport bounds
        x = Math.random() * (maxX - minX) + minX - centerX;
        y = Math.random() * (maxY - minY) + minY - centerY;
        
        attempts++;
        
        // If we've tried too many times, just return this position
        if (attempts >= maxAttempts) {
            break;
        }
    } while (!isOutsideLogo(x, y, taglineWidth, taglineHeight));
    
    return { 
        x: x,
        y: y,
        angle: Math.atan2(y, x) * (180 / Math.PI)
    };
}

// Function to create and show a tagline
function showTagline() {
    const container = document.getElementById('taglines-container');
    const tagline = document.createElement('div');
    tagline.className = 'tagline';
    
    // Get the next tagline in the sequence
    const randomTagline = getRandomTagline();
    tagline.textContent = randomTagline;
    
    // Get position that accounts for tagline dimensions and viewport bounds
    const pos = getRandomPosition(randomTagline);
    
    // Calculate center offset for the tagline
    const offsetX = 0; // Already handled in getRandomPosition
    const offsetY = 0; // Already handled in getRandomPosition
    
    // Set initial position
    tagline.style.left = `calc(50% + ${pos.x - offsetX}px)`;
    tagline.style.top = `calc(50% + ${pos.y - offsetY}px)`;
    
    // Add to container
    container.appendChild(tagline);
    
    // Trigger animation
    setTimeout(() => {
        tagline.style.animation = 'fadeInOut 4s forwards';
    }, 10);
    
    // Remove the tagline after animation completes
    setTimeout(() => {
        tagline.remove();
    }, 4000);
}

// Show a new tagline every 4 seconds (increased from 2 seconds)
setInterval(showTagline, 4000);

// Initial tagline
showTagline();

// Add hover effect to logo
const logo = document.querySelector('.logo');
logo.addEventListener('mouseover', () => {
    logo.style.transform = 'scale(1.05)';
});

logo.addEventListener('mouseout', () => {
    logo.style.transform = 'scale(1)';
});
