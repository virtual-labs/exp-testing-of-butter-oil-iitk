let step5State = {
    step: 0,
    corkOpened: false,
    // Round 1: H2SO4 -> Flask S
    pipetteAtBottle1: false,
    pipetteFilled1: false,
    pipetteAtFlaskS: false,
    pipetteEmptiedIntoS: false,
    // Round 2: H2SO4 -> Flask B
    pipetteAtBottle2: false,
    pipetteFilled2: false,
    pipetteAtFlaskB: false,
    pipetteEmptiedIntoB: false,
    pipetteReturned: false
};

// ============================================================================
// DROP ANIMATION CONFIGURATION FOR STEP 5
// Adjust these values to control the starting position and size of the drops
// ============================================================================
const dropConfigStep5 = {
    "drop-h2so4-flask-s": {
        top: "67%",
        left: "46.5%",
        width: "1%",
        height: "2.5%"
    },
    "drop-h2so4-flask-b": {
        top: "68%",
        left: "62%",
        width: "1%",
        height: "2.5%"
    }
};

// Helper function to trigger drop animations for Step 5
function triggerDropAnimationStep5(dropId, count = 4) {
    let drop = document.querySelector("#" + dropId);
    if (!drop) return;
    
    const config = dropConfigStep5[dropId];
    
    let delay = 0;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            let newDrop = drop.cloneNode(true);
            newDrop.id = dropId + "-clone-" + i;
            newDrop.style.display = "block";
            
            if (config) {
                newDrop.style.top = config.top;
                newDrop.style.left = config.left;
                newDrop.style.width = config.width;
                newDrop.style.height = config.height;
            }
            
            newDrop.style.animation = "dropFall 0.8s linear";
            drop.parentNode.appendChild(newDrop);
            
            setTimeout(() => {
                newDrop.remove();
            }, 800);
        }, delay);
        delay += 300;
    }
}

function startStep5() {
    document.querySelector("#stp5").style.visibility = "visible";
    document.querySelector("#ins").innerText = "Instructions :-";
    document.querySelector("#text").innerText = "Step 5 — Add 50 ml of 1.0 N sulfuric acid to both flasks. Click on the cork to open the H₂SO₄ bottle.";
    step5State.step = 1;
    
    // Reset all state flags
    step5State.corkOpened = false;
    step5State.pipetteAtBottle1 = false;
    step5State.pipetteFilled1 = false;
    step5State.pipetteAtFlaskS = false;
    step5State.pipetteEmptiedIntoS = false;
    step5State.pipetteAtBottle2 = false;
    step5State.pipetteFilled2 = false;
    step5State.pipetteAtFlaskB = false;
    step5State.pipetteEmptiedIntoB = false;
    step5State.pipetteReturned = false;
    
    // Initialize positions
    let bottle = document.querySelector("#h2so4-bottle");
    let cork = document.querySelector("#h2so4-cork");
    let pipette = document.querySelector("#h2so4-pipette");
    let flaskS = document.querySelector("#flask-s5");
    let flaskB = document.querySelector("#flask-b5");
    
    if (bottle) {
        bottle.style.left = "12%";
        bottle.style.top = "50%";
        bottle.style.width = "15%";
        bottle.style.height = "50%";
    }
    
    if (cork) {
        cork.style.left = "16.5%";
        cork.style.top = "62%";
        cork.style.width = "7%";
        cork.style.height = "10%";
        cork.style.cursor = "pointer";
    }
    
    if (pipette) {
        pipette.style.left = "25%";
        pipette.style.top = "68%";
        pipette.style.width = "12%";
        pipette.style.height = "40%";
        pipette.style.transform = "rotate(35deg)";
        pipette.style.cursor = "pointer";
    }
    
    if (flaskS) {
        flaskS.style.left = "40%";
        flaskS.style.top = "55%";
        flaskS.style.width = "15%";
        flaskS.style.height = "45%";
    }
    
    if (flaskB) {
        flaskB.style.left = "55%";
        flaskB.style.top = "54%";
        flaskB.style.width = "15%";
        flaskB.style.height = "45%";
    }
}

function handleCorkClick() {
    let cork = document.querySelector("#h2so4-cork");
    
    if (step5State.step === 1 && !step5State.corkOpened) {
        
        // Move cork to table
        cork.style.transition = "all 1s ease-in-out";
        cork.style.left = "25%";
        cork.style.top = "85%";
        cork.style.cursor = "default";
        
        step5State.corkOpened = true;
        step5State.step = 2;
        document.querySelector("#text").innerText = "Cork opened. Click on the pipette to measure 50 ml of 1.0N H₂SO₄.";
    }
}

function handleH2SO4PipetteClick() {
    let pipette = document.querySelector("#h2so4-pipette");
    let bottle = document.querySelector("#h2so4-bottle");
    let flaskS = document.querySelector("#flask-s5");
    let flaskB = document.querySelector("#flask-b5");
    
    // ROUND 1: Measure from bottle
    if (step5State.step === 2 && !step5State.pipetteAtBottle1) {
        
        // Ensure pipette is empty
        pipette.src = "images/h2so4-pipette.png";
        
        // Move pipette to H2SO4 bottle (vertical position)
        pipette.style.transition = "all 1s ease-in-out";
        pipette.style.left = "13.5%";
        pipette.style.top = "47%";
        pipette.style.transform = "rotate(90deg)";
        
        step5State.pipetteAtBottle1 = true;
        document.querySelector("#text").innerText = "Pipette is in the bottle. Click on it to measure 50 ml of H₂SO₄.";
    }
    else if (step5State.step === 2 && step5State.pipetteAtBottle1 && !step5State.pipetteFilled1) {
        
        // Fill pipette - switch to filled image
        setTimeout(() => {
            pipette.style.transition = "none";
            pipette.src = "images/h2s04-in-pipette.png";
            
            setTimeout(() => {
                pipette.style.transition = "all 1s ease-in-out";
            }, 50);
            
            step5State.pipetteFilled1 = true;
            step5State.step = 3;
            document.querySelector("#text").innerText = "perfect ! Pipette filled with 50 ml H₂SO₄. Click to move it to Flask S.";
        }, 500);
    }
    // ROUND 1: Move to Flask S
    else if (step5State.step === 3 && !step5State.pipetteAtFlaskS) {
        
        // Move pipette to Flask S
        pipette.style.transition = "all 1s ease-in-out";
        pipette.style.left = "41%";
        pipette.style.top = "35%";
        pipette.style.transform = "rotate(90deg)";
        
        step5State.pipetteAtFlaskS = true;
        document.querySelector("#text").innerText = "Now, Click on pipette to add H₂SO₄ into Flask S.";
    }
    else if (step5State.step === 3 && step5State.pipetteAtFlaskS && !step5State.pipetteEmptiedIntoS) {
        
        // Trigger drop animation
        triggerDropAnimationStep5("drop-h2so4-flask-s", 4);
        
        // Empty pipette after drops
        setTimeout(() => {
            pipette.style.transition = "none";
            pipette.src = "images/h2so4-pipette.png";
            
            setTimeout(() => {
                pipette.style.transition = "all 1s ease-in-out";
            }, 50);
            
            step5State.pipetteEmptiedIntoS = true;
            step5State.step = 4;
            document.querySelector("#text").innerText = "Great! H₂SO₄ added to Flask S. Click to return pipette to the bottle for adding it to flask B as well.";
        }, 1000);
    }
    // ROUND 2: Return to bottle
    else if (step5State.step === 4 && !step5State.pipetteAtBottle2) {
        
        // Move pipette back to H2SO4 bottle
        pipette.style.transition = "all 1s ease-in-out";
        pipette.style.left = "13.5%";
        pipette.style.top = "45%";
        pipette.style.transform = "rotate(90deg)";
        
        step5State.pipetteAtBottle2 = true;
        document.querySelector("#text").innerText = "Pipette is back in the bottle. Click to measure another 50 ml of H₂SO₄.";
    }
    else if (step5State.step === 4 && step5State.pipetteAtBottle2 && !step5State.pipetteFilled2) {
        
        // Fill pipette again
        setTimeout(() => {
            pipette.style.transition = "none";
            pipette.src = "images/h2s04-in-pipette.png";
            
            setTimeout(() => {
                pipette.style.transition = "all 1s ease-in-out";
            }, 50);
            
            step5State.pipetteFilled2 = true;
            step5State.step = 5;
            document.querySelector("#text").innerText = "As you can see, Pipette is filled with 50 ml H₂SO₄. Click to move it to Flask B.";
        }, 500);
    }
    // ROUND 2: Move to Flask B
    else if (step5State.step === 5 && !step5State.pipetteAtFlaskB) {
        
        // Move pipette to Flask B
        pipette.style.transition = "all 1s ease-in-out";
        pipette.style.left = "56%";
        pipette.style.top = "39%";
        pipette.style.transform = "rotate(90deg)";
        
        step5State.pipetteAtFlaskB = true;
        document.querySelector("#text").innerText = "Pipette is above Flask B. Click on it to add H₂SO₄ into Flask B.";
    }
    else if (step5State.step === 5 && step5State.pipetteAtFlaskB && !step5State.pipetteEmptiedIntoB) {
        
        // Trigger drop animation
        triggerDropAnimationStep5("drop-h2so4-flask-b", 4);
        
        // Empty pipette after drops
        setTimeout(() => {
            pipette.style.transition = "none";
            pipette.src = "images/h2so4-pipette.png";
            
            setTimeout(() => {
                pipette.style.transition = "all 1s ease-in-out";
            }, 50);
            
            step5State.pipetteEmptiedIntoB = true;
            step5State.step = 6;
            document.querySelector("#text").innerText = "H₂SO₄ added to Flask B. Click to return pipette to its original position.";
        }, 1000);
    }
    // Return to initial position
    else if (step5State.step === 6 && !step5State.pipetteReturned) {
        
        // Return pipette to starting position
        pipette.style.transition = "all 1s ease-in-out";
        pipette.style.left = "25%";
        pipette.style.top = "68%";
        pipette.style.transform = "rotate(35deg)";
        
        step5State.pipetteReturned = true;
        document.querySelector("#text").innerText = "Pipette is placed back. Closing the bottle...";
        
        // Automatically close the cork after pipette returns
        setTimeout(() => {
            let cork = document.querySelector("#h2so4-cork");
            
            // Move cork back to bottle
            cork.style.transition = "all 1s ease-in-out";
            cork.style.left = "16.5%";
            cork.style.top = "62%";
            
            // After cork is placed, complete the step
            setTimeout(() => {
                step5State.step = 7;
                document.querySelector("#text").innerText = "Step 5 complete! You successfully added 50 ml of 1.0 N H₂SO₄ to both the flasks.";
                
                // Show Next Button
                document.querySelector("#start").style.visibility = "visible";
                document.querySelector("#start").innerText = "NEXT";
                f = 50; // Flag for next step
                statuses = 7; // Status for next step
            }, 1000); // Wait for cork animation to complete
        }, 1000); // Wait for pipette to return first
    }
}
