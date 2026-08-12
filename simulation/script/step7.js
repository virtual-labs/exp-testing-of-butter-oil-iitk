let step7State = {
    step: 0,
    funnelPlaced: false,
    flaskAttached: false,
    burnerMoved: false,
    dropsStarted: false,
    distillateShown: false
};

function startStep7() {
    document.querySelector("#stp7").style.visibility = "visible";
    document.querySelector("#ins").innerText = "Instructions :-";
    document.querySelector("#text").innerText = "Step 7 — Begin the distillation process. Click on the funnel to place it into the empty flask.";
    step7State.step = 1;
    
    // Reset all state flags
    step7State.funnelPlaced = false;
    step7State.flaskAttached = false;
    step7State.burnerMoved = false;
    step7State.dropsStarted = false;
    step7State.distillateShown = false;
    
    // Initialize positions
    let apparatus = document.querySelector("#distillation-apparatus7");
    let funnel = document.querySelector("#funnel7");
    let emptyFlask = document.querySelector("#empty-flask7");
    let distillateFlask = document.querySelector("#distillate-flask7");
    let burner = document.querySelector("#burner7");
    
    // ============================================================================
    // DISTILLATION APPARATUS - CENTER-LEFT POSITION
    // ============================================================================
    // Position: Center-left of the table
    // Dimensions for adjustment:
    //   - left: 20% (adjust to move left/right)
    //   - top: 5% (adjust to move up/down)
    //   - width: 50% (adjust size)
    //   - height: 90% (adjust height)
    // ============================================================================
    if (apparatus) {
        apparatus.style.position = "absolute";
        apparatus.style.left = "25%";
        apparatus.style.top = "5%";
        apparatus.style.width = "45%";
        apparatus.style.height = "95%";
        apparatus.style.transition = "all 1s ease-in-out";
    }
    
    // ============================================================================
    // FUNNEL - INITIAL POSITION (RIGHT SIDE)
    // ============================================================================
    // Position: Right side of table, ready to be clicked
    // Dimensions for adjustment:
    //   - left: 75% (adjust to move left/right)
    //   - top: 40% (adjust to move up/down)
    //   - width: 10% (adjust size)
    //   - height: 15% (adjust height)
    // ============================================================================
    if (funnel) {
        funnel.style.position = "absolute";
        funnel.style.left = "85%";
        funnel.style.top = "80%";
        funnel.style.width = "5%";
        funnel.style.height = "12%";
        funnel.style.cursor = "pointer";
        funnel.style.transition = "all 1s ease-in-out";
        funnel.style.zIndex = "10";
    }
    
    // ============================================================================
    // EMPTY FLASK - INITIAL POSITION (RIGHT SIDE)
    // ============================================================================
    // Position: Right side of table, below funnel
    // Dimensions for adjustment:
    //   - left: 73% (adjust to move left/right)
    //   - top: 60% (adjust to move up/down)
    //   - width: 12% (adjust size)
    //   - height: 30% (adjust height)
    // ============================================================================
    if (emptyFlask) {
        emptyFlask.style.position = "absolute";
        emptyFlask.style.left = "73%";
        emptyFlask.style.top = "65%";
        emptyFlask.style.width = "8%";
        emptyFlask.style.height = "25%";
        emptyFlask.style.cursor = "default";
        emptyFlask.style.transition = "all 1s ease-in-out";
        emptyFlask.style.zIndex = "5";
    }
    
    // ============================================================================
    // DISTILLATE FLASK - HIDDEN INITIALLY (SAME POSITION AS FLASK ON APPARATUS)
    // ============================================================================
    // This will replace empty flask after drops
    // Position: Same as flask when attached to apparatus stand (52%, 62%)
    // Dimensions for adjustment:
    //   - left: 52% (same as flask on apparatus)
    //   - top: 62% (same as flask on apparatus)
    //   - width: 8% (same as empty flask)
    //   - height: 25% (same as empty flask)
    // ============================================================================
    if (distillateFlask) {
        distillateFlask.style.position = "absolute";
        distillateFlask.style.left = "52%";      // FINAL position on apparatus
        distillateFlask.style.top = "62%";       // FINAL position on apparatus
        distillateFlask.style.width = "8%";
        distillateFlask.style.height = "25%";
        distillateFlask.style.opacity = "0";
        distillateFlask.style.display = "none";
        distillateFlask.style.transition = "opacity 0.3s ease-in-out";
        distillateFlask.style.zIndex = "6";
    }
    
    // ============================================================================
    // BURNER - INITIAL POSITION (LEFT SIDE)
    // ============================================================================
    // Position: Left side of table
    // Dimensions for adjustment:
    //   - left: 5% (adjust to move left/right)
    //   - top: 70% (adjust to move up/down)
    //   - width: 12% (adjust size)
    //   - height: 22% (adjust height)
    // ============================================================================
    if (burner) {
        burner.style.position = "absolute";
        burner.style.left = "5%";
        burner.style.top = "70%";
        burner.style.width = "12%";
        burner.style.height = "22%";
        burner.style.cursor = "default";
        burner.style.transition = "all 1s ease-in-out";
    }
}

// ============================================================================
// DROP ANIMATION CONFIGURATION FOR STEP 7
// ============================================================================
const dropConfigStep7 = {
    "drop-distillation": {
        top: "56%",      // Starting position (top of funnel/condenser)
        left: "55.8%",     // Horizontal position (center of apparatus)
        width: "0.5%",     // Drop width
        height: "2%"   // Drop height
    }
};

// Helper function to trigger continuous drop animations for Step 7
function triggerContinuousDropsStep7(dropId, count = 15) {
    let drop = document.querySelector("#" + dropId);
    if (!drop) return;
    
    const config = dropConfigStep7[dropId];
    
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
            
            newDrop.style.animation = "dropFall 1.2s linear";
            drop.parentNode.appendChild(newDrop);
            
            setTimeout(() => {
                newDrop.remove();
            }, 1200);
        }, delay);
        delay += 400;  // Drop every 400ms for continuous effect
    }
}

function handleFunnelClick() {
    let funnel = document.querySelector("#funnel7");
    let emptyFlask = document.querySelector("#empty-flask7");
    
    if (step7State.step === 1 && !step7State.funnelPlaced) {
        
        // ============================================================================
        // FUNNEL - FINAL POSITION (INSIDE EMPTY FLASK)
        // ============================================================================
        // Dimensions for adjustment:
        //   - left: 74% (adjust to align with flask opening)
        //   - top: 58% (adjust to position inside flask)
        //   - width: 8% (adjust size)
        //   - height: 12% (adjust height)
        // ============================================================================
        funnel.style.transition = "all 1s ease-in-out";
        funnel.style.left = "74.5%";
        funnel.style.top = "61%";
        funnel.style.width = "5%";
        funnel.style.height = "12%";
        funnel.style.cursor = "default";
        funnel.style.zIndex = "7";
        
        step7State.funnelPlaced = true;
        step7State.step = 2;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Good! The funnel is now placed inside the flask. Click on the flask to attach it to the apparatus stand.";
            
            // Make flask clickable
            emptyFlask.style.cursor = "pointer";
        }, 1000);
    }
}

function handleFlaskClick() {
    let emptyFlask = document.querySelector("#empty-flask7");
    let funnel = document.querySelector("#funnel7");
    let burner = document.querySelector("#burner7");
    
    if (step7State.step === 2 && !step7State.flaskAttached) {
        
        // ============================================================================
        // FLASK + FUNNEL - FINAL POSITION (ATTACHED TO APPARATUS STAND)
        // ============================================================================
        // Dimensions for adjustment:
        //   - left: 56% (adjust to align with apparatus stand)
        //   - top: 55% (adjust vertical position on stand)
        // ============================================================================
        emptyFlask.style.transition = "all 1.5s ease-in-out";
        emptyFlask.style.left = "52%";
        emptyFlask.style.top = "62%";
        emptyFlask.style.cursor = "default";
        
        // Move funnel with flask
        funnel.style.transition = "all 1.5s ease-in-out";
        funnel.style.left = "53.5%";
        funnel.style.top = "59%";
        
        step7State.flaskAttached = true;
        step7State.step = 3;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Excellent! The receiving flask is now attached to the apparatus. Click on the burner to position it below Flask S.";
            
            // Make burner clickable
            burner.style.cursor = "pointer";
        }, 1500);
    }
}

function handleBurner7Click() {
    let burner = document.querySelector("#burner7");
    
    if (step7State.step === 3 && !step7State.burnerMoved) {
        
        // ============================================================================
        // BURNER - FINAL POSITION (BELOW FLASK S)
        // ============================================================================
        // Dimensions for adjustment:
        //   - left: 32% (adjust to align below Flask S)
        //   - top: 72% (adjust vertical position)
        // ============================================================================
        burner.style.transition = "all 1.5s ease-in-out";
        burner.style.left = "32%";
        burner.style.top = "72%";
        burner.style.cursor = "default";
        
        step7State.burnerMoved = true;
        step7State.step = 4;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Perfect! The burner is heating Flask S. The distillation process is now beginning.";
            
            // Start drop animation after 3 seconds
            setTimeout(() => {
                step7State.dropsStarted = true;
                step7State.step = 5;
                document.querySelector("#text").innerText = "Watch and wait for 19 to 20 minutes as the distillate slowly collects in the receiving flask.";
                
                // Trigger continuous drops
                triggerContinuousDropsStep7("drop-distillation", 15);
                
                // After drops finish (15 drops × 400ms = 6 seconds), switch to distillate flask
                setTimeout(() => {
                    switchToDistillateFlask();
                }, 6500);
            }, 3000);
        }, 1500);
    }
}

function switchToDistillateFlask() {
    let emptyFlask = document.querySelector("#empty-flask7");
    let distillateFlask = document.querySelector("#distillate-flask7");
    
    // Hide empty flask instantly
    emptyFlask.style.opacity = "0";
    emptyFlask.style.display = "none";
    
    // Show distillate flask instantly at same position
    distillateFlask.style.display = "block";
    setTimeout(() => {
        distillateFlask.style.opacity = "1";
    }, 50);
    
    step7State.distillateShown = true;
    step7State.step = 6;
    
    setTimeout(() => {
        document.querySelector("#text").innerText = "Excellent! 110 ml of distillate has been collected successfully in the receiving flask.";
        
        setTimeout(() => {
            step7State.step = 7;
            document.querySelector("#text").innerText = "Step 7 complete! Distillation process finished. Click NEXT to proceed.";
            
            // Show Next Button
            document.querySelector("#start").style.visibility = "visible";
            document.querySelector("#start").innerText = "NEXT";
            f = 70; // Flag for next step
            statuses = 9; // Status for next step
        }, 5000);
    }, 5000);
}
