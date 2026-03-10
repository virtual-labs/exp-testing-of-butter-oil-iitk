let step12State = {
    step: 0,
    ethanolPoured: false,
    washingDone: false,
    solutionTransferred: false,
    phenolCapUsed: false,
    phenolDropsAdded: false,
    flaskUnderBurette: false,
    buretteOpen: false,
    titrationComplete: false,
    dropsCount: 0,
    dropInterval: null
};

function startStep12() {
    document.querySelector("#stp12").style.visibility = "visible";
    document.querySelector("#ins").innerText = "Instructions :-";
    document.querySelector("#text").innerText = "Step 12 — Wash the residue of Flask S with 50ml of hot 95% ethanol and titrate the washings. Click on the ethanol filled cylinder to pour into Flask S residue.";
    step12State.step = 1;

    // Reset State
    step12State.ethanolPoured = false;
    step12State.washingDone = false;
    step12State.solutionTransferred = false;
    step12State.phenolCapUsed = false;
    step12State.phenolDropsAdded = false;
    step12State.flaskUnderBurette = false;
    step12State.buretteOpen = false;
    step12State.titrationComplete = false;
    step12State.dropsCount = 0;

    // Initialize Images
    let ethanolCylinder = document.querySelector("#ethanol-cylinder12");
    let emptyCylinder = document.querySelector("#empty-cylinder12");
    let residueFlask = document.querySelector("#residue-flask12");
    let filledFlask = document.querySelector("#filled-flask12");
    let beaker = document.querySelector("#beaker12");
    let filtrateFlask = document.querySelector("#filtrate-flask12");
    let burette = document.querySelector("#burette12");
    let buretteKnob = document.querySelector("#burette-knob12");
    let titratedFlask = document.querySelector("#titrated-flask12");

    // Phenol Images
    let phenolBottle = document.querySelector("#phenol-bottle12");
    let phenolCap = document.querySelector("#phenol-cap12");

    // ============================================================================
    // 1. ETHANOL CYLINDER (Contains Ethanol)
    // ============================================================================
    // left: 30%, top: 60%, width: 6%, height: 25%
    if (ethanolCylinder) {
        ethanolCylinder.style.position = "absolute";
        ethanolCylinder.style.left = "40%";
        ethanolCylinder.style.top = "60%";
        ethanolCylinder.style.width = "9%";
        ethanolCylinder.style.height = "30%";
        ethanolCylinder.style.cursor = "pointer";
        ethanolCylinder.style.transition = "all 1s ease-in-out";
        ethanolCylinder.style.zIndex = "5";
        ethanolCylinder.style.display = "block";
    }

    // ============================================================================
    // 2. EMPTY CYLINDER (Hidden initially)
    // ============================================================================
    // Positioned same as ethanol cylinder
    if (emptyCylinder) {
        emptyCylinder.style.position = "absolute";
        emptyCylinder.style.left = "70%";
        emptyCylinder.style.top = "60%";
        emptyCylinder.style.width = "4%"; // Typical width for measuring cylinder image
        emptyCylinder.style.height = "22%";
        emptyCylinder.style.display = "none";
        emptyCylinder.style.zIndex = "4";
    }

    // ============================================================================
    // 3. RESIDUE FLASK (Empty 110ml Flask)
    // ============================================================================
    // left: 45%, top: 60%, width: 10%, height: 25%
    if (residueFlask) {
        residueFlask.style.position = "absolute";
        residueFlask.style.left = "55%";
        residueFlask.style.top = "62%";
        residueFlask.style.width = "10%";
        residueFlask.style.height = "25%";
        residueFlask.style.zIndex = "3";
        residueFlask.style.display = "block";
    }

    // ============================================================================
    // 4. FILLED FLASK (Replaces Residue Flask)
    // ============================================================================
    if (filledFlask) {
        filledFlask.style.position = "absolute";
        filledFlask.style.left = "54%";
        filledFlask.style.top = "58%";
        filledFlask.style.width = "12%";
        filledFlask.style.height = "35%";
        filledFlask.style.display = "none";
        filledFlask.style.zIndex = "3";
        filledFlask.style.cursor = "default";
        filledFlask.style.transition = "all 1.5s ease-in-out";
    }

    // ============================================================================
    // 5. BEAKER
    // ============================================================================
    // left: 60%, top: 65%, width: 8%, height: 15%
    if (beaker) {
        beaker.style.position = "absolute";
        beaker.style.left = "70%";
        beaker.style.top = "60%";
        beaker.style.width = "14%";
        beaker.style.height = "35%";
        beaker.style.zIndex = "3";
        beaker.style.display = "block";
    }

    // ============================================================================
    // 6. FILTRATE FLASK (Replaces Beaker)
    // ============================================================================
    if (filtrateFlask) {
        filtrateFlask.style.position = "absolute";
        filtrateFlask.style.left = "75%";
        filtrateFlask.style.top = "67%";
        filtrateFlask.style.width = "7%"; // Conical flask dim
        filtrateFlask.style.height = "21.5%";
        filtrateFlask.style.display = "none";
        filtrateFlask.style.zIndex = "3";
        filtrateFlask.style.cursor = "default";
        filtrateFlask.style.transition = "all 1.5s ease-in-out";
    }

    // ============================================================================
    // 7. BURETTE SETUP (Same as before)
    // ============================================================================
    // left: 15%, top: 28%, width: 20%, height: 70%
    if (burette) {
        burette.style.position = "absolute";
        burette.style.left = "15%";
        burette.style.top = "28%";
        burette.style.width = "20%";
        burette.style.height = "70%";
        burette.style.zIndex = "3";
    }

    if (buretteKnob) {
        buretteKnob.style.position = "absolute";
        buretteKnob.style.left = "25%";
        buretteKnob.style.top = "66%";
        buretteKnob.style.width = "2.5%";
        buretteKnob.style.height = "1.5%";
        buretteKnob.style.cursor = "default";
        buretteKnob.style.transition = "transform 0.3s ease-in-out";
        buretteKnob.style.zIndex = "5";
        buretteKnob.style.transform = "rotate(90deg)"; // Closed
    }

    // ============================================================================
    // 8. BURETTE SOLUTIONS
    // ============================================================================
    let sol1 = document.querySelector("#burette-sol-1-12");
    let sol2 = document.querySelector("#burette-sol-2-12");
    let sol3 = document.querySelector("#burette-sol-3-12");

    if (sol1) {
        sol1.style.display = "none";
        sol1.style.position = "absolute";
        sol1.style.top = "28%";
        sol1.style.left = "13.7%";
        sol1.style.width = "21%";
        sol1.style.height = "18";
    }
    if (sol2) {
        sol2.style.display = "none";
        sol2.style.position = "absolute";
        sol2.style.top = "29%";
        sol2.style.left = "12.7%";
        sol2.style.width = "21%";
        sol2.style.height = "18";
    }
    if (sol3) {
        sol3.style.display = "none";
        sol3.style.position = "absolute";
        sol3.style.top = "30%";
        sol3.style.left = "13.8%";
        sol3.style.width = "21%";
        sol3.style.height = "18";
    }


    // ============================================================================
    // 9. TITRATED FLASK (Final Result)
    // ============================================================================
    if (titratedFlask) {
        titratedFlask.style.position = "absolute";
        titratedFlask.style.left = "60%"; // Initial hidden pos or replace
        titratedFlask.style.top = "65%";
        titratedFlask.style.width = "7%";
        titratedFlask.style.height = "22%";
        titratedFlask.style.display = "none";
        titratedFlask.style.zIndex = "3";
        titratedFlask.style.transition = "all 1.5s ease-in-out";
    }
    
    // ============================================================================
    // 10. PHENOLPHTHALEIN SETUP (Right Side)
    // ============================================================================
    if (phenolBottle) {
        phenolBottle.style.position = "absolute";
        phenolBottle.style.left = "85%";
        phenolBottle.style.top = "65%";
        phenolBottle.style.width = "6%";
        phenolBottle.style.height = "20%"; // Adjusted height
        phenolBottle.style.zIndex = "2";
        phenolBottle.style.display = "block";
    }
    
    if (phenolCap) {
        phenolCap.style.position = "absolute";
        phenolCap.style.left = "85%";
        phenolCap.style.top = "63%"; // On top of bottle
        phenolCap.style.width = "6%";
        phenolCap.style.height = "9%"; 
        phenolCap.style.cursor = "default"; // Not active yet
        phenolCap.style.transition = "all 1s ease-in-out";
        phenolCap.style.zIndex = "10";
        phenolCap.style.display = "block";
    }
}

// ============================================================================
// HANDLER: ETHANOL POURING (Step 1 -> 2)
// ============================================================================
function handleEthanolClick12() {
    let ethanolCylinder = document.querySelector("#ethanol-cylinder12");
    let emptyCylinder = document.querySelector("#empty-cylinder12");
    let residueFlask = document.querySelector("#residue-flask12");
    let filledFlask = document.querySelector("#filled-flask12");

    if (step12State.step === 1 && !step12State.ethanolPoured) {

        // Move cylinder to flask
        ethanolCylinder.style.left = "50.5%"; // Near flask
        ethanolCylinder.style.top = "48%";
        ethanolCylinder.style.transform = "rotate(45deg)";
        ethanolCylinder.style.cursor = "default";

        setTimeout(() => {
            // Drop animation
             let drop = document.createElement("img");
             drop.src = "images/drop-light-blue.png"; // Changed to light blue as requested
             drop.style.position = "absolute";
             drop.style.left = "59.5%";
             drop.style.top = "57%"; // Spout position
             drop.style.width = "1%";
             drop.style.height = "2%";
             drop.style.zIndex = "10";
             drop.style.animation = "dropFall 1s infinite linear";
             document.querySelector("#stp12").appendChild(drop);

             setTimeout(() => {
                 drop.remove();

                 // Switch cylinder and flask
                 ethanolCylinder.style.display = "none";
                 emptyCylinder.style.display = "block";
                 // Position empty cylinder same as where ethanol was? Or back to start?
                 // Prompt: "ethanol 50 ml.png → switch to measuring cylinder.png (empty)"
                 emptyCylinder.style.left = "45%";
                 emptyCylinder.style.top = "65%";
                 emptyCylinder.style.transform = "rotate(0deg)";

                 residueFlask.style.display = "none";
                 filledFlask.style.display = "block";

                 step12State.ethanolPoured = true;
                 step12State.step = 2;

                 document.querySelector("#text").innerText = "Residue washed. Click the filled flask to transfer the solution into the beaker.";
                 filledFlask.style.cursor = "pointer";

             }, 2000); // Pouring time
        }, 1000); // Move time
    }
}

// ============================================================================
// HANDLER: TRANSFER TO BEAKER (Step 2 -> 3)
// ============================================================================
function handleFilledFlask12Click() {
    let filledFlask = document.querySelector("#filled-flask12");
    let beaker = document.querySelector("#beaker12");
    let filtrateFlask = document.querySelector("#filtrate-flask12");
    let phenolCap = document.querySelector("#phenol-cap12");

    if (step12State.step === 2 && !step12State.solutionTransferred) {

        // Move flask to beaker
        filledFlask.style.left = "68%";
        filledFlask.style.top = "52%";
        filledFlask.style.transform = "rotate(45deg)";
        filledFlask.style.cursor = "default";

        setTimeout(() => {
            // Pouring animation drops
             let drop = document.createElement("img");
             drop.src = "images/drop-light-blue.png"; // Blue solution? Prompt says "now has blue solution"
             drop.style.position = "absolute";
             drop.style.left = "78%"; // Over beaker
             drop.style.top = "62%";
             drop.style.width = "1%";
             drop.style.height = "2%";
             drop.style.zIndex = "10";
             drop.style.animation = "dropFall 1s infinite linear";
             document.querySelector("#stp12").appendChild(drop);

             setTimeout(() => {
                 drop.remove();

                 // Switch beaker to conical flask filled
                 beaker.style.display = "none";
                 filtrateFlask.style.display = "block";
                 // Prompt: "filled-flask.png → returns to its original position or becomes inactive."
                 filledFlask.style.transform = "rotate(0deg)";
                 filledFlask.style.left = "55%";
                 filledFlask.style.top = "62%";
                 
                 step12State.solutionTransferred = true;
                 step12State.step = 3; // Now Step 3 is Phenol Addition

                 document.querySelector("#text").innerText = "Solution collected. Now click the phenolphthalein cap to add indicator drops.";
                 phenolCap.style.cursor = "pointer";

             }, 2000);
        }, 3000);
    }
}

// ============================================================================
// HANDLER: PHENOL CAP CLICK (Step 3 -> 4)
// ============================================================================
function handlePhenolCap12Click() {
    let phenolCap = document.querySelector("#phenol-cap12");
    let filtrateFlask = document.querySelector("#filtrate-flask12");

    if (step12State.step === 3 && !step12State.phenolCapUsed) {

        // Move Cap to Flask Mouth
        phenolCap.style.left = "75%"; // Center of flask (55 + 3.5 = 58.5)
        phenolCap.style.top = "55%"; 
        phenolCap.style.cursor = "default";
        
        step12State.phenolCapUsed = true;

        setTimeout(() => {
            document.querySelector("#text").innerText = "Adding phenolphthalein indicator. Don't forget to shake properly.";

            // Add Drops
             let drop1 = document.createElement("img");
             drop1.src = "images/drop-light-blue.png";
             drop1.style.position = "absolute";
             drop1.style.left = "77.5%"; // Flask center
             drop1.style.top = "60%";
             drop1.style.width = "0.8%";
             drop1.style.height = "2.5%";
             drop1.style.animation = "dropFall 0.8s linear";
             drop1.style.zIndex = "15";
             document.querySelector("#stp12").appendChild(drop1);

             setTimeout(() => drop1.remove(), 800);

             setTimeout(() => {
                 let drop2 = document.createElement("img");
                 drop2.src = "images/drop-light-blue.png";
                 drop2.style.position = "absolute";
                 drop2.style.left = "77.5%";
                 drop2.style.top = "60%";
                 drop2.style.width = "0.8%";
                 drop2.style.height = "2.5%";
                 drop2.style.animation = "dropFall 0.8s linear";
                 drop2.style.zIndex = "15";
                 document.querySelector("#stp12").appendChild(drop2);
                 setTimeout(() => drop2.remove(), 800);
             }, 600);

             // Return Cap
             setTimeout(() => {
                 phenolCap.style.left = "85%";
                 phenolCap.style.top = "63%";
                 
                 step12State.phenolDropsAdded = true;
                 step12State.step = 4; // Proceed to Move to Burette

                 document.querySelector("#text").innerText = "Indicator added. Click the conical flask to place it under the burette.";
                 filtrateFlask.style.cursor = "pointer";

             }, 2000);
        }, 1000);
    }
}


// ============================================================================
// HANDLER: MOVE TO BURETTE (Step 4 -> 5)
// ============================================================================
function handleFiltrateFlask12Click() {
    let filtrateFlask = document.querySelector("#filtrate-flask12");

    if (step12State.step === 4 && step12State.phenolDropsAdded && !step12State.flaskUnderBurette) {

        // Move to burette
        filtrateFlask.style.left = "21.5%";
        filtrateFlask.style.top = "72%";
        filtrateFlask.style.cursor = "default";

        step12State.flaskUnderBurette = true;
        step12State.step = 5;

        setTimeout(() => {
            document.querySelector("#text").innerText = "Click the burette knob to start titration with 0.1N NaOH.";
            document.querySelector("#burette-knob12").style.cursor = "pointer";
        }, 1500);
    }
}

// ============================================================================
// HANDLER: TITRATION (Step 5 -> 6 -> 7)
// ============================================================================
function handleBuretteKnob12Click() {
    let buretteKnob = document.querySelector("#burette-knob12");

    if (step12State.step === 5 && !step12State.buretteOpen) {

        // Open Knob
        buretteKnob.style.transform = "rotate(45deg)";
        buretteKnob.style.cursor = "default";
        step12State.buretteOpen = true;
        step12State.step = 6;

        // Start drops
        startContinuousDropsStep12();

        document.querySelector("#text").innerText = "Titrating... Watch for the pink color change.";

        // Animate Levels
        let sol1 = document.querySelector("#burette-sol-1-12");
        let sol2 = document.querySelector("#burette-sol-2-12");
        let sol3 = document.querySelector("#burette-sol-3-12");
        let filtrateFlask = document.querySelector("#filtrate-flask12");
        let titratedFlask = document.querySelector("#titrated-flask12");

        if(sol1) sol1.style.display = "block"; // Start full? Ensure it's visible.

        // Timing similar to Step 11
        setTimeout(() => {
            if(sol1) sol1.style.display = "none";
            if(sol2) sol2.style.display = "block";
        }, 3000);

        setTimeout(() => {
            if(sol2) sol2.style.display = "none";
            if(sol3) sol3.style.display = "block";

            // Endpoint reached
            filtrateFlask.style.display = "none";
            titratedFlask.style.display = "block";
            titratedFlask.style.left = filtrateFlask.style.left; // Ensure pos match
            titratedFlask.style.top = filtrateFlask.style.top;

            document.querySelector("#text").innerText = "Pink color observed! Turn off the burette knob to stop the titration.";
            buretteKnob.style.cursor = "pointer";

        }, 6000);

    } else if (step12State.step === 6) {

        // Stop Titration
        step12State.titrationComplete = true;
        step12State.step = 7;
        stopContinuousDropsStep12();

        buretteKnob.style.transform = "rotate(90deg)"; // Close
        buretteKnob.style.cursor = "default";

        document.querySelector("#text").innerText = "Titration complete, now note the burette reading. Step 12 finished. Click NEXT to proceed.";
        document.querySelector("#start").style.visibility = "visible";
        document.querySelector("#start").innerText = "NEXT";
        f = 120; // Flag for Step 12 done
        statuses = 14; 
    }
}

// ============================================================================
// DROP ANIMATION CONFIGURATION FOR STEP 12
// ============================================================================
const dropConfigStep12 = {
    "drop-titration-12": {
        top: "73%",      // Starting position (burette tip)
        left: "24.5%",     // Horizontal position (burette center)
        width: "0.5%",     // Drop width
        height: "2.5%"   // Drop height
    }
};

// Helper function to create continuous drop flow for Step 12
function startContinuousDropsStep12() {
    let dropId = "drop-titration-12";
    let drop = document.querySelector("#" + dropId);
    if (!drop) return;
    
    const config = dropConfigStep12[dropId];
    let dropCounter = 0;
    
    // Create drops continuously every 700ms (slower rate)
    step12State.dropInterval = setInterval(() => {
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

function stopContinuousDropsStep12() {
    if (step12State.dropInterval) {
        clearInterval(step12State.dropInterval);
        step12State.dropInterval = null;
    }
}
