let step0State = {
    step: 0
};

function startStep0() {
    document.querySelector("#stp0").style.visibility = "visible";
    document.querySelector("#ins").innerText = "Instructions :-";
    document.querySelector("#text").innerText = "Let's familiarize ourselves with the laboratory instruments and glassware used in this experiment. Hover over each instrument to see its name.";
    step0State.step = 1;
    
    setTimeout(() => {
        document.querySelector("#text").innerText = "These instruments will be used throughout the quality testing of ghee. Click NEXT when you're ready to begin the experiment.";
        document.querySelector("#start").style.visibility = "visible";
        document.querySelector("#start").innerText = "NEXT";
        f = 0.5;
    }, 8000);
}

// Instrument data with names and image paths (initial/resting state only)
const instruments = [
    { name: "Weighing Machine", image: "images/wheighing-machine.png" },
    { name: "Spatula", image: "images/spatula.png" },
    { name: "Flask S (Sample Flask)", image: "images/flask-S.png" },
    { name: "Flask B (Blank Flask)", image: "images/flask-B.png" },
    { name: "Ghee Sample Bottle", image: "images/ghee-bottle copy.png" },
    { name: "Glycerol Bottle", image: "images/glycerol.png" },
    { name: "NaOH Solution Bottle", image: "images/naoh-bottle.png" },
    { name: "Glycerol Pipette", image: "images/empty-glycerol-pipette.png" },
    { name: "NaOH Pipette", image: "images/naoh-pipette.png" },
    { name: "Burner", image: "images/burner-new.png" },
    { name: "Stirrer", image: "images/stirrer.png" },
    { name: "Distilled Water Bottle", image: "images/distilled water (2).png" },
    { name: "Measuring Cylinder", image: "images/measuring cylinder.png" },
    { name: "H₂SO₄ Bottle", image: "images/h2so4.png" },
    { name: "H₂SO₄ Pipette", image: "images/h2so4-pipette.png" },
    { name: "Distillation Apparatus", image: "images/distillation-apparatus.png" },
    { name: "Funnel", image: "images/funnel copy.png" },
    { name: "Filter Paper", image: "images/filter-paper-step9.png" },
    { name: "Beaker", image: "images/beaker2.png" },
    { name: "Burette with NaOH", image: "images/burette-naoh.png" },
    { name: "Phenolphthalein Indicator", image: "images/phenolphthelein-bottle.png" },
    { name: "Ethanol (50ml)", image: "images/ethanol-50ml.png" },
    { name: "Empty Flask (110ml)", image: "images/empty-110ml-flask.png" },
    { name: "Conical Flask (50ml)", image: "images/conical-flask -50ml filled.png" }
];

// Create instrument display grid
function createInstrumentGrid() {
    const container = document.querySelector("#stp0");
    
    // Create grid container
    const gridContainer = document.createElement("div");
    gridContainer.id = "instrument-grid";
    gridContainer.style.position = "absolute";
    gridContainer.style.left = "8%";
    gridContainer.style.top = "10%";
    gridContainer.style.width = "80%";
    gridContainer.style.height = "110%";
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = "repeat(6, 1fr)";
    gridContainer.style.gridTemplateRows = "repeat(4, 1fr)";
    gridContainer.style.gap = "15px";
    gridContainer.style.padding = "20px";
    gridContainer.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    gridContainer.style.borderRadius = "10px";
    gridContainer.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    gridContainer.style.zIndex = "100";
    
    // Create instrument cards
    instruments.forEach((instrument, index) => {
        const card = document.createElement("div");
        card.className = "instrument-card";
        card.style.position = "relative";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.alignItems = "center";
        card.style.justifyContent = "center";
        card.style.padding = "10px";
        card.style.backgroundColor = "#f8f9fa";
        card.style.borderRadius = "8px";
        card.style.border = "2px solid #dee2e6";
        card.style.cursor = "pointer";
        card.style.transition = "all 0.3s ease";
        card.style.overflow = "hidden";
        
        // Create image
        const img = document.createElement("img");
        img.src = instrument.image;
        img.style.maxWidth = "120%";
        img.style.maxHeight = "120%";
        img.style.objectFit = "contain";
        img.style.transition = "transform 0.3s ease";
        if (index === 5) img.style.transform = "scale(1.6)";
        
        // Create label (hidden by default)
        const label = document.createElement("div");
        label.className = "instrument-label";
        label.textContent = instrument.name;
        label.style.position = "absolute";
        label.style.bottom = "0";
        label.style.left = "0";
        label.style.right = "0";
        label.style.padding = "8px";
        label.style.backgroundColor = "rgba(0, 123, 255, 0.95)";
        label.style.color = "white";
        label.style.fontSize = "12px";
        label.style.fontWeight = "bold";
        label.style.textAlign = "center";
        label.style.opacity = "0";
        label.style.transform = "translateY(100%)";
        label.style.transition = "all 0.3s ease";
        
        // Hover effects
        const baseScale = index === 5 ? "scale(1.6)" : "scale(1)";
        const hoverScale = index === 5 ? "scale(1.76)" : "scale(1.1)";

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-5px)";
            card.style.boxShadow = "0 6px 12px rgba(0, 123, 255, 0.3)";
            card.style.borderColor = "#007bff";
            img.style.transform = hoverScale;
            label.style.opacity = "1";
            label.style.transform = "translateY(0)";
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)";
            card.style.boxShadow = "none";
            card.style.borderColor = "#dee2e6";
            img.style.transform = baseScale;
            label.style.opacity = "0";
            label.style.transform = "translateY(100%)";
        });
        
        card.appendChild(img);
        card.appendChild(label);
        gridContainer.appendChild(card);
    });
    
    container.appendChild(gridContainer);
}

// Initialize Step 0 when called
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        // Create the grid when step 0 is started
        if (document.querySelector("#stp0")) {
            createInstrumentGrid();
        }
    });
}
