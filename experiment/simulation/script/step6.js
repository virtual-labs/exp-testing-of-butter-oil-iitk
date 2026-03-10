let step6State = {
    step: 0,
    burnerPlaced: false,
    apparatusShown: false
};

function startStep6() {
    document.querySelector("#stp6").style.visibility = "visible";
    document.querySelector("#ins").innerText = "Instructions :-";
    document.querySelector("#text").innerText = "Step 6 — Set up the distillation apparatus. Click on the burner to place it below Flask S.";
    step6State.step = 1;
    
    // Reset all state flags
    step6State.burnerPlaced = false;
    step6State.apparatusShown = false;
    
    // Initialize positions
    let apparatus = document.querySelector("#distillation-apparatus");
    let burner = document.querySelector("#burner6");
    
    // ============================================================================
    // DISTILLATION APPARATUS - INITIAL POSITION (EXTREME RIGHT SIDE OF TABLE)
    // ============================================================================
    // Position: Extreme right side of the table, visible from the start
    // Dimensions for adjustment:
    //   - left: 65% (adjust this to move left/right - higher = more right)
    //   - top: 20% (adjust this to move up/down - higher = more down)
    //   - width: 30% (adjust this to make bigger/smaller)
    //   - height: 70% (adjust this to make taller/shorter)
    // ============================================================================
    if (apparatus) {
        apparatus.style.position = "absolute";
        apparatus.style.left = "53%";      // EXTREME RIGHT position
        apparatus.style.top = "2%";       // Vertical position from top
        apparatus.style.width = "45%";     // Width of apparatus
        apparatus.style.height = "99%";    // Height of apparatus
        apparatus.style.opacity = "1";     // VISIBLE from start
        apparatus.style.transition = "all 1.5s ease-in-out";
    }
    
    // ============================================================================
    // BURNER - INITIAL POSITION (CENTER OF TABLE)
    // ============================================================================
    // Position: Center of the table, ready to be clicked
    // Dimensions for adjustment:
    //   - left: 44% (adjust this to move left/right - 50% = exact center)
    //   - top: 75% (adjust this to move up/down - higher = more down)
    //   - width: 12% (adjust this to make bigger/smaller)
    //   - height: 20% (adjust this to make taller/shorter)
    // ============================================================================
    if (burner) {
        burner.style.position = "absolute";
        burner.style.left = "35%";        // CENTER position
        burner.style.top = "70%";         // Vertical position from top
        burner.style.width = "12%";       // Width of burner
        burner.style.height = "22%";      // Height of burner
        burner.style.cursor = "pointer";
        burner.style.transition = "all 1s ease-in-out";
    }
}

function handleBurnerPlacement() {
    let burner = document.querySelector("#burner6");
    let apparatus = document.querySelector("#distillation-apparatus");
    
    if (step6State.step === 1 && !step6State.burnerPlaced) {
        
        // ============================================================================
        // BURNER - FINAL POSITION (BELOW FLASK S IN APPARATUS)
        // ============================================================================
        // Position: Below Flask S after clicking
        // Dimensions for adjustment:
        //   - left: 68% (adjust to align below Flask S in apparatus)
        //   - top: 78% (adjust vertical position below apparatus)
        // ============================================================================
        burner.style.transition = "all 1.5s ease-in-out";
        burner.style.left = "60.5%";        // Position below Flask S
        burner.style.top = "71%";         // Below the apparatus
        burner.style.cursor = "default";
        
        step6State.burnerPlaced = true;
        step6State.step = 2;
        
        // ============================================================================
        // INSTRUCTION TIMING - Increased delays to allow full audio reading
        // Each instruction gets 5-6 seconds to ensure audio completes
        // ============================================================================
        
        // INSTRUCTION 1: Burner placed and Flask S attached
        // Delay: 2 seconds (wait for burner animation to complete)
        setTimeout(() => {
            document.querySelector("#text").innerText = "Excellent! We have attached Flask S to the distillation apparatus.";
            
            // INSTRUCTION 2: Components connected
            // Delay: 6 seconds (allow full audio reading of instruction 1)
            setTimeout(() => {
                step6State.step = 3;
                document.querySelector("#text").innerText = "The condenser, burner, and other necessary components have been connected.";
                
                // INSTRUCTION 3: Setup purpose
                // Delay: 6 seconds (allow full audio reading of instruction 2)
                setTimeout(() => {
                    step6State.step = 4;
                    document.querySelector("#text").innerText = "This setup will help collect the distillate in the next step.";
                    
                    // INSTRUCTION 4: Step complete
                    // Delay: 5 seconds (allow full audio reading of instruction 3)
                    setTimeout(() => {
                        step6State.step = 5;
                        document.querySelector("#text").innerText = "Step 6 complete! The distillation apparatus is ready. Click NEXT to proceed.";
                        
                        // Show Next Button
                        document.querySelector("#start").style.visibility = "visible";
                        document.querySelector("#start").innerText = "NEXT";
                        f = 60; // Flag for next step
                        statuses = 8; // Status for next step
                    }, 5000);  // 5 seconds for instruction 4 to be read fully
                }, 6000);      // 6 seconds for instruction 3 to be read fully
            }, 6000);          // 6 seconds for instruction 2 to be read fully
        }, 2000);              // 2 seconds for burner animation + instruction 1
    }
}
