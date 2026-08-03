let step9State = {
    step: 0,
    // Flask S filtration
    funnelSPlaced: false,
    filterPaperSPlaced: false,
    distillateSPoured: false,
    beakerSSwitched: false,
    // Flask B filtration
    funnelBPlaced: false,
    filterPaperBPlaced: false,
    distillateBPoured: false,
    beakerBSwitched: false
};

function startStep9() {
    document.querySelector("#stp9").style.visibility = "visible";
    document.querySelector("#ins").innerText = "Instructions :-";
    document.querySelector("#text").innerText = "Step 9 — Filtration of both sample flask and blank flask distillates using Whatman Grade 4 filter paper. Click on the funnel to begin.";
    step9State.step = 1;
    
    // Reset all state flags
    step9State.funnelSPlaced = false;
    step9State.filterPaperSPlaced = false;
    step9State.distillateSPoured = false;
    step9State.beakerSSwitched = false;
    step9State.funnelBPlaced = false;
    step9State.filterPaperBPlaced = false;
    step9State.distillateBPoured = false;
    step9State.beakerBSwitched = false;
    
    // Initialize positions for Flask S filtration
    let beakerS = document.querySelector("#beaker-s9");
    let beakerSFiltered = document.querySelector("#beaker-s-filtered9");
    let funnelS = document.querySelector("#funnel-s9");
    let filterPaperS = document.querySelector("#filter-paper-s9");
    let distillateS = document.querySelector("#distillate-s9");
    
    // ============================================================================
    // FLASK S FILTRATION - BEAKER (CENTER)
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 40% (center position)
    //   - top: 50% (vertical center)
    //   - width: 15% (beaker size)
    //   - height: 35% (beaker height)
    // ============================================================================
    if (beakerS) {
        beakerS.style.position = "absolute";
        beakerS.style.left = "40%";
        beakerS.style.top = "65%";
        beakerS.style.width = "15%";
        beakerS.style.height = "35%";
        beakerS.style.transition = "all 1s ease-in-out";
        beakerS.style.zIndex = "5";
    }
    
    // ============================================================================
    // FLASK S - FILTERED BEAKER (HIDDEN, SAME POSITION)
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 40% (same as beaker)
    //   - top: 50% (same as beaker)
    //   - width: 15% (same as beaker)
    //   - height: 35% (same as beaker)
    // ============================================================================
    if (beakerSFiltered) {
        beakerSFiltered.style.position = "absolute";
        beakerSFiltered.style.left = "40%";
        beakerSFiltered.style.top = "65%";
        beakerSFiltered.style.width = "15%";
        beakerSFiltered.style.height = "35%";
        beakerSFiltered.style.opacity = "0";
        beakerSFiltered.style.display = "none";
        beakerSFiltered.style.transition = "opacity 0.3s ease-in-out";
        beakerSFiltered.style.zIndex = "6";
    }
    
    // ============================================================================
    // FLASK S - FUNNEL (RIGHT SIDE OF BEAKER)
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 60% (right of beaker)
    //   - top: 55% (aligned with beaker)
    //   - width: 10% (funnel size)
    //   - height: 20% (funnel height)
    // ============================================================================
    if (funnelS) {
        funnelS.style.position = "absolute";
        funnelS.style.left = "60%";
        funnelS.style.top = "80%";
        funnelS.style.width = "7%";
        funnelS.style.height = "13%";
        funnelS.style.cursor = "pointer";
        funnelS.style.transition = "all 1s ease-in-out";
        funnelS.style.zIndex = "10";
    }
    
    // ============================================================================
    // FLASK S - FILTER PAPER (RIGHT OF FUNNEL)
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 72% (right of funnel)
    //   - top: 60% (aligned)
    //   - width: 8% (paper size)
    //   - height: 15% (paper height)
    // ============================================================================
    if (filterPaperS) {
        filterPaperS.style.position = "absolute";
        filterPaperS.style.left = "72%";
        filterPaperS.style.top = "80%";
        filterPaperS.style.width = "8%";
        filterPaperS.style.height = "15%";
        filterPaperS.style.cursor = "default";
        filterPaperS.style.transition = "all 1s ease-in-out";
        filterPaperS.style.zIndex = "11";
    }
    
    // ============================================================================
    // FLASK S - DISTILLATE (LEFT OF BEAKER)
    // ============================================================================
    // Dimensions for adjustment:
    //   - left: 20% (left of beaker)
    //   - top: 55% (aligned)
    //   - width: 12% (flask size)
    //   - height: 30% (flask height)
    // ============================================================================
    if (distillateS) {
        distillateS.style.position = "absolute";
        distillateS.style.left = "24%";
        distillateS.style.top = "60%";
        distillateS.style.width = "12%";
        distillateS.style.height = "32%";
        distillateS.style.cursor = "default";
        distillateS.style.transition = "all 1.5s ease-in-out";
        distillateS.style.zIndex = "12";
    }
    
    // Initialize positions for Flask B filtration (hidden initially)
    let beakerB = document.querySelector("#beaker-b9");
    let beakerBFiltered = document.querySelector("#beaker-b-filtered9");
    let funnelB = document.querySelector("#funnel-b9");
    let filterPaperB = document.querySelector("#filter-paper-b9");
    let distillateB = document.querySelector("#distillate-b9");
    
    // Hide Flask B elements initially
    if (beakerB) beakerB.style.display = "none";
    if (beakerBFiltered) beakerBFiltered.style.display = "none";
    if (funnelB) funnelB.style.display = "none";
    if (filterPaperB) filterPaperB.style.display = "none";
    if (distillateB) distillateB.style.display = "none";
}

// ============================================================================
// DROP ANIMATION CONFIGURATION FOR STEP 9
// ============================================================================
const dropConfigStep9 = {
    "drop-filtration-s": {
        top: "52%",      // Starting position (top of funnel)
        left: "49%",     // Horizontal position (center of funnel)
        width: "0.5%",   // Drop width
        height: "2%"     // Drop height
    },
    "drop-filtration-b": {
        top: "52%",      // Starting position (top of funnel) - SAME AS FLASK S
        left: "49%",     // Horizontal position (center of funnel) - SAME AS FLASK S
        width: "0.5%",   // Drop width
        height: "2%"     // Drop height
    }
};

// Helper function to trigger continuous drop animations for Step 9
function triggerContinuousDropsStep9(dropId, count = 10) {
    let drop = document.querySelector("#" + dropId);
    if (!drop) return;
    
    const config = dropConfigStep9[dropId];
    
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
        delay += 500;  // Drop every 500ms
    }
}

// ============================================================================
// FLASK S FILTRATION HANDLERS
// ============================================================================

function handleFunnelS9Click() {
    let funnelS = document.querySelector("#funnel-s9");
    let beakerS = document.querySelector("#beaker-s9");
    let filterPaperS = document.querySelector("#filter-paper-s9");
    
    if (step9State.step === 1 && !step9State.funnelSPlaced) {
        
        // ============================================================================
        // FUNNEL S - FINAL POSITION (ON BEAKER MOUTH)
        // ============================================================================
        // Dimensions for adjustment:
        //   - left: 42% (centered on beaker)
        //   - top: 47% (on beaker mouth)
        //   - width: 10%
        //   - height: 20%
        // ============================================================================
        funnelS.style.transition = "all 1s ease-in-out";
        funnelS.style.left = "45.5%";
        funnelS.style.top = "66.5%";
        funnelS.style.cursor = "default";
        
        step9State.funnelSPlaced = true;
        step9State.step = 2;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Good! The funnel is placed on the beaker. Now click on the filter paper to place it in the funnel.";
            
            // Make filter paper clickable
            filterPaperS.style.cursor = "pointer";
        }, 4000);  // 4 seconds for audio to complete
    }
}

function handleFilterPaperS9Click() {
    let filterPaperS = document.querySelector("#filter-paper-s9");
    let distillateS = document.querySelector("#distillate-s9");
    
    if (step9State.step === 2 && !step9State.filterPaperSPlaced) {
        
        // ============================================================================
        // FILTER PAPER S - FINAL POSITION (INSIDE FUNNEL)
        // ============================================================================
        // Dimensions for adjustment:
        //   - left: 43.5% (inside funnel)
        //   - top: 48% (inside funnel opening)
        //   - width: 6%
        //   - height: 12%
        // ============================================================================
        filterPaperS.style.transition = "all 1s ease-in-out";
        filterPaperS.style.left = "45.5%";
        filterPaperS.style.top = "65%";
        filterPaperS.style.width = "7%";
        filterPaperS.style.height = "7%";
        filterPaperS.style.cursor = "default";
        
        step9State.filterPaperSPlaced = true;
        step9State.step = 3;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Perfect! filter paper is now in place. Click on the Flask S distillate to pour it through the filter.";
            
            // Make distillate clickable
            distillateS.style.cursor = "pointer";
        }, 4000);  // 4 seconds for audio to complete
    }
}

function handleDistillateS9Click() {
    let distillateS = document.querySelector("#distillate-s9");
    
    if (step9State.step === 3 && !step9State.distillateSPoured) {
        
        // ============================================================================
        // DISTILLATE S - POURING POSITION (ABOVE FUNNEL WITH ROTATION)
        // ============================================================================
        // Dimensions for adjustment:
        //   - left: 38% (above funnel)
        //   - top: 35% (above funnel)
        //   - transform: rotate(45deg) for pouring effect
        // ============================================================================
        distillateS.style.transition = "all 1.5s ease-in-out";
        distillateS.style.left = "38%";
        distillateS.style.top = "45%";
        distillateS.style.transform = "rotate(45deg)";  // Pouring rotation
        distillateS.style.cursor = "default";
        
        step9State.distillateSPoured = true;
        step9State.step = 4;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Pouring Flask S distillate through the filter paper. Watch as it filters 100 ml into the beaker.";
            
            // Start drop animation
            triggerContinuousDropsStep9("drop-filtration-s", 10);
            
            // After drops finish, return flask to original position and switch beaker
            setTimeout(() => {
                // Return distillate flask to original position
                distillateS.style.transition = "all 1s ease-in-out";
                distillateS.style.left = "24%";
                distillateS.style.top = "60%";
                distillateS.style.transform = "rotate(0deg)";
                
                // Switch beaker after flask returns
                setTimeout(() => {
                    switchBeakerS();
                }, 1000);
            }, 5500);
        }, 1500);
    }
}

function switchBeakerS() {
    let beakerS = document.querySelector("#beaker-s9");
    let beakerSFiltered = document.querySelector("#beaker-s-filtered9");
    
    // Hide empty beaker instantly
    beakerS.style.opacity = "0";
    beakerS.style.display = "none";
    
    // Show filtered beaker instantly
    beakerSFiltered.style.display = "block";
    setTimeout(() => {
        beakerSFiltered.style.opacity = "1";
    }, 50);
    
    step9State.beakerSSwitched = true;
    step9State.step = 5;
    
    setTimeout(() => {
        document.querySelector("#text").innerText = "Excellent! Flask S distillate has been filtered.";
        
        // Start Flask B filtration after 4 seconds
        setTimeout(() => {
            startFlaskBFiltration();
        }, 4000);  // 4 seconds for audio to complete
    }, 4000);  // 4 seconds for audio to complete
}

// ============================================================================
// FLASK B FILTRATION HANDLERS
// ============================================================================

function startFlaskBFiltration() {
    // Hide Flask S elements
    document.querySelector("#beaker-s-filtered9").style.display = "none";
    document.querySelector("#funnel-s9").style.display = "none";
    document.querySelector("#filter-paper-s9").style.display = "none";
    document.querySelector("#distillate-s9").style.display = "none";
    
    // Show and position Flask B elements
    let beakerB = document.querySelector("#beaker-b9");
    let beakerBFiltered = document.querySelector("#beaker-b-filtered9");
    let funnelB = document.querySelector("#funnel-b9");
    let filterPaperB = document.querySelector("#filter-paper-b9");
    let distillateB = document.querySelector("#distillate-b9");
    
    // Position Flask B elements (same as Flask S)
    if (beakerB) {
        beakerB.style.position = "absolute";
        beakerB.style.left = "40%";
        beakerB.style.top = "65%";  // SAME AS FLASK S
        beakerB.style.width = "15%";
        beakerB.style.height = "35%";
        beakerB.style.display = "block";
        beakerB.style.zIndex = "5";
    }
    
    if (beakerBFiltered) {
        beakerBFiltered.style.position = "absolute";
        beakerBFiltered.style.left = "40%";
        beakerBFiltered.style.top = "65%";  // SAME AS FLASK S
        beakerBFiltered.style.width = "15%";
        beakerBFiltered.style.height = "35%";
        beakerBFiltered.style.opacity = "0";
        beakerBFiltered.style.display = "none";
        beakerBFiltered.style.zIndex = "6";
    }
    
    if (funnelB) {
        funnelB.style.position = "absolute";
        funnelB.style.left = "60%";
        funnelB.style.top = "80%";  // SAME AS FLASK S
        funnelB.style.width = "7%";  // SAME AS FLASK S
        funnelB.style.height = "13%";  // SAME AS FLASK S
        funnelB.style.cursor = "pointer";
        funnelB.style.display = "block";
        funnelB.style.transition = "all 1s ease-in-out";
        funnelB.style.zIndex = "10";
    }
    
    if (filterPaperB) {
        filterPaperB.style.position = "absolute";
        filterPaperB.style.left = "72%";
        filterPaperB.style.top = "80%";  // SAME AS FLASK S
        filterPaperB.style.width = "8%";
        filterPaperB.style.height = "15%";
        filterPaperB.style.cursor = "default";
        filterPaperB.style.display = "block";
        filterPaperB.style.transition = "all 1s ease-in-out";
        filterPaperB.style.zIndex = "11";
    }
    
    if (distillateB) {
        distillateB.style.position = "absolute";
        distillateB.style.left = "24%";  // SAME AS FLASK S
        distillateB.style.top = "60%";  // SAME AS FLASK S
        distillateB.style.width = "12%";
        distillateB.style.height = "32%";  // SAME AS FLASK S
        distillateB.style.cursor = "default";
        distillateB.style.display = "block";
        distillateB.style.transition = "all 1.5s ease-in-out";
        distillateB.style.zIndex = "12";
    }
    
    step9State.step = 6;
    document.querySelector("#text").innerText = "Now filtering Flask B distillate. Click on the funnel to place it on the beaker.";
}

function handleFunnelB9Click() {
    let funnelB = document.querySelector("#funnel-b9");
    let filterPaperB = document.querySelector("#filter-paper-b9");
    
    if (step9State.step === 6 && !step9State.funnelBPlaced) {
        
        funnelB.style.transition = "all 1s ease-in-out";
        funnelB.style.left = "45.5%";  // SAME AS FLASK S
        funnelB.style.top = "66.5%";  // SAME AS FLASK S
        funnelB.style.cursor = "default";
        
        step9State.funnelBPlaced = true;
        step9State.step = 7;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Good! The funnel is placed. Click on the filter paper to place it in the funnel.";
            filterPaperB.style.cursor = "pointer";
        }, 4000);  // 4 seconds for audio to complete
    }
}

function handleFilterPaperB9Click() {
    let filterPaperB = document.querySelector("#filter-paper-b9");
    let distillateB = document.querySelector("#distillate-b9");
    
    if (step9State.step === 7 && !step9State.filterPaperBPlaced) {
        
        filterPaperB.style.transition = "all 1s ease-in-out";
        filterPaperB.style.left = "45.5%";  // SAME AS FLASK S
        filterPaperB.style.top = "65%";  // SAME AS FLASK S
        filterPaperB.style.width = "7%";  // SAME AS FLASK S
        filterPaperB.style.height = "7%";  // SAME AS FLASK S
        filterPaperB.style.cursor = "default";
        
        step9State.filterPaperBPlaced = true;
        step9State.step = 8;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Perfect! filter paper is in place. Click on the Flask B distillate to pour it.";
            distillateB.style.cursor = "pointer";
        }, 4000);  // 4 seconds for audio to complete
    }
}

function handleDistillateB9Click() {
    let distillateB = document.querySelector("#distillate-b9");
    
    if (step9State.step === 8 && !step9State.distillateBPoured) {
        
        distillateB.style.transition = "all 1.5s ease-in-out";
        distillateB.style.left = "38%";  // SAME AS FLASK S
        distillateB.style.top = "45%";  // SAME AS FLASK S
        distillateB.style.transform = "rotate(45deg)";
        distillateB.style.cursor = "default";
        
        step9State.distillateBPoured = true;
        step9State.step = 9;
        
        setTimeout(() => {
            document.querySelector("#text").innerText = "Pouring Flask B distillate through the filter paper.";
            
            triggerContinuousDropsStep9("drop-filtration-b", 10);
            
            // After drops finish, return flask to original position and switch beaker
            setTimeout(() => {
                // Return distillate flask to original position
                distillateB.style.transition = "all 1s ease-in-out";
                distillateB.style.left = "24%";
                distillateB.style.top = "60%";
                distillateB.style.transform = "rotate(0deg)";
                
                // Switch beaker after flask returns
                setTimeout(() => {
                    switchBeakerB();
                }, 1000);
            }, 5500);
        }, 1500);
    }
}

function switchBeakerB() {
    let beakerB = document.querySelector("#beaker-b9");
    let beakerBFiltered = document.querySelector("#beaker-b-filtered9");
    
    beakerB.style.opacity = "0";
    beakerB.style.display = "none";
    
    beakerBFiltered.style.display = "block";
    setTimeout(() => {
        beakerBFiltered.style.opacity = "1";
    }, 50);
    
    step9State.beakerBSwitched = true;
    step9State.step = 10;
    
    setTimeout(() => {
        document.querySelector("#text").innerText = "Flask B distillate has been filtered successfully.";
        
        setTimeout(() => {
            step9State.step = 11;
            document.querySelector("#text").innerText = "Step 9 complete! Filtration of both distillates finished. Click NEXT to proceed.";
            
            // Show Next Button
            document.querySelector("#start").style.visibility = "visible";
            document.querySelector("#start").innerText = "NEXT";
            f = 90; // Flag for next step
            statuses = 11; // Status for next step
        }, 4000);  // 4 seconds for audio to complete
    }, 4000);  // 4 seconds for audio to complete
}
