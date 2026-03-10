let step10State = {
    step: 0,
    phenolCapUsed: false,
    phenolDropsAdded: false,
    flaskUnderBurette: false,
    buretteOpen: false,
    titrationComplete: false,
    dropsCount: 0,
    dropInterval: null  // To store the interval for continuous drops
};

function startStep10() {
    document.querySelector("#stp10").style.visibility = "visible";
    document.querySelector("#ins").innerText = "Instructions :-";
    document.querySelector("#text").innerText = "Step 10 — Titration of 100 ml filtrate using phenolphthalein indicator and 0.1 N NaOH. Click on the phenolphthalein cap to begin.";
    step10State.step = 1;
    
    // Reset all state flags
    step10State.phenolCapUsed = false;
    step10State.phenolDropsAdded = false;
    step10State.flaskUnderBurette = false;
    step10State.buretteOpen = false;
    step10State.titrationComplete = false;
    step10State.dropsCount = 0;
    
    // Initialize positions
    let buretteFilled = document.querySelector("#burette-filled10");
    let buretteKnob = document.querySelector("#burette-knob10");
    let filtrateFlask = document.querySelector("#filtrate-flask10");
    let titratedFlask = document.querySelector("#titrated-flask10");
    let phenolBottle = document.querySelector("#phenol-bottle10");
    let phenolCap = document.querySelector("#phenol-cap10");
    
    // ============================================================================
    // BURETTE FILLED WITH NaOH - LEFT SIDE
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 15% (left side of table)
    //   - top: 15% (on table)
    //   - width: 10% (burette width)
    //   - height: 60% (burette height)
    // ============================================================================
    if (buretteFilled) {
        buretteFilled.style.position = "absolute";
        buretteFilled.style.left = "15%";
        buretteFilled.style.top = "28%";
        buretteFilled.style.width = "20%";
        buretteFilled.style.height = "70%";
        buretteFilled.style.zIndex = "3";
    }
    
    // ============================================================================
    // BURETTE KNOB - ON BURETTE
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 14% (on burette)
    //   - top: 70% (bottom of burette)
    //   - width: 3% (knob size)
    //   - height: 3% (knob size)
    //   - width: 3% (knob size)
    //   - height: 3% (knob size)
    // ============================================================================
    if (buretteKnob) {
        buretteKnob.style.position = "absolute";
        buretteKnob.style.left = "25%";
        buretteKnob.style.top = "66%";
        buretteKnob.style.width = "2.5%";
        buretteKnob.style.height = "1.5%";
        buretteKnob.style.cursor = "default";
        buretteKnob.style.transition = "transform 0.3s ease-in-out";
        buretteKnob.style.zIndex = "5";
        buretteKnob.style.transform = "rotate(90deg)";
    }
    
    // ============================================================================
    // BURETTE SOLUTIONS - INSIDE BURETTE SEQUENCE
    // ============================================================================
    
    // SOLUTION 1 (FULL LEVEL)
    // Dimensions:
    //   - left: 23% (Centered in burette)
    //   - top: 29% (Start near top)
    //   - width: 4% (Matches burette inner width)
    //   - height: 40% (Full column height)
    let sol1 = document.querySelector("#burette-sol-1");
    if (sol1) {
        sol1.style.position = "absolute";
        sol1.style.left = "15.7%";
        sol1.style.top = "27%";
        sol1.style.width = "17.1%";
        sol1.style.height = "77%";
        sol1.style.display = "none";
        sol1.style.zIndex = "4";
    }

    // SOLUTION 2 (MIDDLE LEVEL)
    // Dimensions:
    //   - left: 23%
    //   - top: 35% (Lower start position)
    //   - width: 4%
    //   - height: 34% (Shorter column)
    let sol2 = document.querySelector("#burette-sol-2");
    if (sol2) {
        sol2.style.position = "absolute";
        sol2.style.left = "14.9%";   // Adjust left position here
        sol2.style.top = "29%";    // Adjust top position here
        sol2.style.width = "17.1%";   // Adjust width here
        sol2.style.height = "70%"; // Adjust height here
        sol2.style.display = "none";
        sol2.style.zIndex = "4";
    }

    // SOLUTION 3 (LOWEST LEVEL)
    // Dimensions:
    //   - left: 23%
    //   - top: 45% (Lowest start position)
    //   - width: 4%
    //   - height: 24% (Shortest column)
    let sol3 = document.querySelector("#burette-sol-3");
    if (sol3) {
        sol3.style.position = "absolute";
        sol3.style.left = "15.7%";   // Adjust left position here
        sol3.style.top = "30%";    // Adjust top position here
        sol3.style.width = "17.3%";   // Adjust width here
        sol3.style.height = "70%"; // Adjust height here
        sol3.style.display = "none";
        sol3.style.zIndex = "4";
    }
    
    // ============================================================================
    // FILTRATE FLASK - CENTER OF TABLE
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 45% (center position)
    //   - top: 55% (on table)
    //   - width: 15% (flask width)
    //   - height: 35% (flask height)
    // ============================================================================
    if (filtrateFlask) {
        filtrateFlask.style.position = "absolute";
        filtrateFlask.style.left = "45%";
        filtrateFlask.style.top = "60%";
        filtrateFlask.style.width = "15%";
        filtrateFlask.style.height = "35%";
        filtrateFlask.style.transition = "all 1.5s ease-in-out";
        filtrateFlask.style.zIndex = "4";
    }
    
    // ============================================================================
    // TITRATED FLASK - HIDDEN INITIALLY (OFF-SCREEN)
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 70% (off-screen right)
    //   - top: 90% (off-screen bottom)
    //   - width: 5%
    //   - height: 23%
    // ============================================================================
    if (titratedFlask) {
        titratedFlask.style.position = "absolute";
        titratedFlask.style.left = "70%";
        titratedFlask.style.top = "90%";
        titratedFlask.style.width = "5%";
        titratedFlask.style.height = "23%";
        titratedFlask.style.opacity = "0";
        titratedFlask.style.display = "none";
        titratedFlask.style.cursor = "default";
        titratedFlask.style.transition = "all 1.5s ease-in-out";
        titratedFlask.style.zIndex = "4";
    }
    
    // ============================================================================
    // PHENOLPHTHALEIN BOTTLE - RIGHT SIDE
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 75% (right side)
    //   - top: 60% (on table)
    //   - width: 10% (bottle width)
    //   - height: 25% (bottle height)
    // ============================================================================
    if (phenolBottle) {
        phenolBottle.style.position = "absolute";
        phenolBottle.style.left = "65%";
        phenolBottle.style.top = "65%";
        phenolBottle.style.width = "6%";
        phenolBottle.style.height = "25%";
        phenolBottle.style.zIndex = "2";
    }
    
    // ============================================================================
    // PHENOLPHTHALEIN CAP (DROPPER) - ON BOTTLE
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 76% (on bottle)
    //   - top: 58% (on bottle top)
    //   - width: 8% (cap width)
    //   - height: 8% (cap height)
    // ============================================================================
    if (phenolCap) {
        phenolCap.style.position = "absolute";
        phenolCap.style.left = "65%";
        phenolCap.style.top = "62%";
        phenolCap.style.width = "6%";
        phenolCap.style.height = "15%";
        phenolCap.style.cursor = "pointer";
        phenolCap.style.transition = "all 1s ease-in-out";
        phenolCap.style.zIndex = "10";
    }
}

// ============================================================================
// DROP ANIMATION CONFIGURATION FOR STEP 10
// ============================================================================
const dropConfigStep10 = {
    "drop-titration": {
        top: "73%",      // Starting position (burette tip)
        left: "24.5%",     // Horizontal position (burette center)
        width: "0.5%",     // Drop width
        height: "2.5%"   // Drop height
    }
};

// Helper function to create continuous drop flow for Step 10
function startContinuousDropsStep10(dropId) {
    let drop = document.querySelector("#" + dropId);
    if (!drop) return;
    
    const config = dropConfigStep10[dropId];
    let dropCounter = 0;
    
    // Create drops continuously every 700ms (slower rate)
    step10State.dropInterval = setInterval(() => {
        let newDrop = drop.cloneNode(true);
        newDrop.id = dropId + "-clone-" + dropCounter;
        newDrop.style.display = "block";
        
        if (config) {
            newDrop.style.top = config.top;
            newDrop.style.left = config.left;
            newDrop.style.width = config.width;
            newDrop.style.height = config.height;
        }
        
        newDrop.style.animation = "dropFallFade 0.6s linear";  // Shorter animation (0.6s)
        newDrop.style.zIndex = "100";
        drop.parentNode.appendChild(newDrop);
        
        setTimeout(() => {
            newDrop.remove();
        }, 600);  // Remove after 0.6s
        
        dropCounter++;
    }, 700);  // New drop every 0.7s
}

// Helper function to stop continuous drops
function stopContinuousDropsStep10() {
    if (step10State.dropInterval) {
        clearInterval(step10State.dropInterval);
        step10State.dropInterval = null;
    }
}

// ============================================================================
// PHENOLPHTHALEIN CAP HANDLER
// ============================================================================

function handlePhenolCapClick() {
    let phenolCap = document.querySelector("#phenol-cap10");
    let filtrateFlask = document.querySelector("#filtrate-flask10");
    
    if (step10State.step === 1 && !step10State.phenolCapUsed) {
        
        // ============================================================================
        // PHENOL CAP - MOVE TO FLASK MOUTH
        // ============================================================================
        // Dimensions for adjustment:
        //   - left: 48% (above flask)
        //   - top: 50% (flask mouth)
        // ============================================================================
        phenolCap.style.transition = "all 1s ease-in-out";
        phenolCap.style.left = "51%";
        phenolCap.style.top = "50%";
        phenolCap.style.cursor = "default";
        
        step10State.phenolCapUsed = true;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Adding phenolphthalein indicator. Don't forget to shake the flask properly.";
            
            // Add 2 drops
            setTimeout(() => {
                let drop1 = document.createElement("img");
                drop1.src = "images/drop-light-blue.png";
                drop1.style.position = "absolute";
                drop1.style.left = "53.5%";
                drop1.style.top = "64%";
                drop1.style.width = "0.8%";
                drop1.style.height = "2.5%";
                drop1.style.animation = "dropFall 0.8s linear";
                drop1.style.zIndex = "15";
                document.querySelector("#stp10").appendChild(drop1);
                
                setTimeout(() => drop1.remove(), 800);
                
                // Second drop
                setTimeout(() => {
                    let drop2 = document.createElement("img");
                    drop2.src = "images/drop-light-blue.png";
                    drop2.style.position = "absolute";
                    drop2.style.left = "53.5%";
                    drop2.style.top = "60%";
                    drop2.style.width = "0.8%";
                    drop2.style.height = "2.5%";
                    drop2.style.animation = "dropFall 0.8s linear";
                    drop2.style.zIndex = "15";
                    document.querySelector("#stp10").appendChild(drop2);
                    
                    setTimeout(() => drop2.remove(), 800);
                }, 500);
            }, 500);
            
            // Return cap to bottle after drops
            setTimeout(() => {
                phenolCap.style.left = "65%";
                phenolCap.style.top = "62%";
                
                step10State.phenolDropsAdded = true;
                step10State.step = 2;
                
                setTimeout(() => {
                    document.querySelector("#text").innerText = "The flask will now move under the burette for titration.";
                    
                    // Move flask under burette
                    setTimeout(() => {
                        moveFlaskUnderBurette();
                    }, 4000);
                }, 4000);
            }, 2000);
        }, 1000);
    }
}

function moveFlaskUnderBurette() {
    let filtrateFlask = document.querySelector("#filtrate-flask10");
    
    document.querySelector("#text").innerText = "Click on the flask to move it under the burette.";
    
    // Make flask clickable
    filtrateFlask.style.cursor = "pointer";
}

function handleFiltrateFlaskClick() {
    let filtrateFlask = document.querySelector("#filtrate-flask10");
    
    if (step10State.step === 2 && step10State.phenolDropsAdded && !step10State.flaskUnderBurette) {
        
        // ============================================================================
        // FLASK - FINAL POSITION (UNDER BURETTE)
        // ============================================================================
        // Dimensions for adjustment:
        //   - left: 16% (under burette tip)
        //   - top: 64% (aligned for titration)
        // ============================================================================
        filtrateFlask.style.transition = "all 1.5s ease-in-out";
        filtrateFlask.style.left = "16%";
        filtrateFlask.style.top = "64%";
        filtrateFlask.style.cursor = "default";
        
        step10State.flaskUnderBurette = true;
        step10State.step = 3;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Click the burette knob to start adding NaOH solution.";
            
            // Make burette knob clickable
            document.querySelector("#burette-knob10").style.cursor = "pointer";
        }, 2000);
    }
}

// ============================================================================
// BURETTE KNOB HANDLER
// ============================================================================

function handleBuretteKnobClick() {
    let buretteKnob = document.querySelector("#burette-knob10");
    
    if (step10State.step === 3 && !step10State.buretteOpen) {
        
        // Rotate knob to open
        buretteKnob.style.transform = "rotate(45deg)";
        buretteKnob.style.cursor = "default";
        
        step10State.buretteOpen = true;
        step10State.step = 4;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "NaOH solution is being added drop by drop. Watch carefully for the persistent pink color.";
            
            // Start continuous drop flow
            startContinuousDropsStep10("drop-titration");
            
            // ============================================================================
            // LIQUID LEVEL ANIMATION SEQUENCE
            // ============================================================================
            
            // Phase 1: Show Full Level (Solution 1) immediately
            let sol1 = document.querySelector("#burette-sol-1");
            let sol2 = document.querySelector("#burette-sol-2");
            let sol3 = document.querySelector("#burette-sol-3");
            
            if(sol1) sol1.style.display = "block";
            
            // Phase 2: Switch to Solution 2 after 3.5 seconds
            setTimeout(() => {
                if(sol1) sol1.style.display = "none";
                if(sol2) sol2.style.display = "block";
            }, 3500);
            
            // Phase 3: Switch to Solution 3 after another 3.5 seconds (Total 7s)
            // AND simultaneously switch the flask to pink
            setTimeout(() => {
                if(sol2) sol2.style.display = "none";
                if(sol3) sol3.style.display = "block";
                
                // Switch to titrated flask instantly
                let filtrateFlask = document.querySelector("#filtrate-flask10");
                let titratedFlask = document.querySelector("#titrated-flask10");
                
                // Position titrated flask at same position as filtrate (under burette)
                titratedFlask.style.left = "18%";
                titratedFlask.style.top = "65%";
                titratedFlask.style.width = "15%";
                titratedFlask.style.height = "35%";
                
                filtrateFlask.style.display = "none";
                titratedFlask.style.display = "block";
                titratedFlask.style.opacity = "1";
                
                // Update instructions
                document.querySelector("#text").innerText = "Persistent pink color appeared! Click the knob immediately to stop the titration.";
                
                // Make knob clickable again to stop
                buretteKnob.style.cursor = "pointer";
                step10State.step = 5;
                
            }, 7000); // Extended to 7s to ensure the long audio instruction completes
            
        }, 1000);
    }
    else if (step10State.step === 5 && !step10State.titrationComplete) {
        
        // User clicked to stop titration
        // Stop the continuous drops
        stopContinuousDropsStep10();
        
        // Rotate knob back to close
        buretteKnob.style.transform = "rotate(90deg)";
        buretteKnob.style.cursor = "default";
        
        step10State.titrationComplete = true;
        step10State.step = 6;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Titration complete! Note the volume of NaOH used in the burette. Click on the titrated flask to move it back to the center.";
            
            // Make titrated flask clickable
            document.querySelector("#titrated-flask10").style.cursor = "pointer";
        }, 1000);
    }
}

// Handler for titrated flask click - move back to center
function handleTitratedFlaskClick() {
    let titratedFlask = document.querySelector("#titrated-flask10");
    
    if (step10State.step === 6 && step10State.titrationComplete) {
        
        // Move titrated flask back to center position
        titratedFlask.style.transition = "all 1.5s ease-in-out";
        titratedFlask.style.left = "40%";
        titratedFlask.style.top = "60%";
        titratedFlask.style.cursor = "default";
        
        step10State.step = 7;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Step 10 complete! Click NEXT to proceed.";
            
            // Show Next Button
            document.querySelector("#start").style.visibility = "visible";
            document.querySelector("#start").innerText = "NEXT";
            f = 100; // Flag for next step
            statuses = 12; // Status for next step
        }, 2000);
    }
}
