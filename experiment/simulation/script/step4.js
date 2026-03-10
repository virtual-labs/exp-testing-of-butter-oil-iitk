let step4State = {
    step: 0,
    pour1Done: false,
    pour2Done: false,
    pour3Done: false,
    pour4Done: false,
    // States to track three-click flow: move -> switch images -> return
    bottleAtCylinder: false,      // Bottle is at cylinder position (click 1 done)
    bottlePoured: false,          // Bottle has poured (images switched, click 2 done, still in air)
    cylinderAtFlaskS: false,      // Cylinder is at Flask S position (click 1 done)
    cylinderPouredIntoS: false,   // Cylinder has poured into Flask S (images switched, click 2 done, still in air)
    cylinderAtFlaskB: false,       // Cylinder is at Flask B position (click 1 done)
    cylinderPouredIntoB: false,    // Cylinder has poured into Flask B (images switched, click 2 done, still in air)
    dropAnimationInProgress: false // Flag to prevent multiple clicks during animation
};

// ============================================================================
// DROP ANIMATION CONFIGURATION
// Adjust these values to control the starting position and size of the drops
// ============================================================================
const dropConfig = {
    // 1. Distilled Water -> Measuring Cylinder (Round 1)
    "drop-distilled-cylinder-1": {
        top: "65%",       // Lower to fall into cylinder
        left: "28.5%",      // Between bottle and cylinder
        width: "1.2%",
        height: "2.5%"
    },
    // 2. Measuring Cylinder -> Flask S
    "drop-cylinder-flask-s": {
        top: "64%",       // Below cylinder mouth
        left: "46.5%",      // Inside Flask S
        width: "1.2%",
        height: "2.5%"
    },
    // 3. Distilled Water -> Measuring Cylinder (Round 2)
    "drop-distilled-cylinder-2": {
        top: "65%",       // Near cylinder
        left: "28.5%",      // Near cylinder
        width: "1.2%",
        height: "2.5%"
    },
    // 4. Measuring Cylinder -> Flask B
    "drop-cylinder-flask-b": {
        top: "63%",       // Inside Flask B
        left: "62%",      // Inside Flask B
        width: "1.2%",
        height: "2.5%"
    }
};

// Helper function to trigger drop animations
function triggerDropAnimation(dropId, count = 3) {
    let drop = document.querySelector("#" + dropId);
    if (!drop) return;
    
    // Get configuration for this drop
    const config = dropConfig[dropId];
    
    let delay = 0;
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            // Clone the drop to animate multiple drops
            let newDrop = drop.cloneNode(true);
            newDrop.id = dropId + "-clone-" + i;
            newDrop.style.display = "block";
            
            // Apply configuration styles directly to the element
            if (config) {
                newDrop.style.top = config.top;
                newDrop.style.left = config.left;
                newDrop.style.width = config.width;
                newDrop.style.height = config.height;
            }
            
            newDrop.style.animation = "dropFall 0.8s linear"; // Faster fall
            
            // Append to the same parent
            drop.parentNode.appendChild(newDrop);
            
            // Remove after animation
            setTimeout(() => {
                newDrop.remove();
            }, 800);
        }, delay);
        delay += 300; // Gap between drops
    }
}

function startStep4() {
    document.querySelector("#stp4").style.visibility = "visible";
    document.querySelector("#ins").innerText = "Instructions :-";
    document.querySelector("#text").innerText = "Step 4 — measure and add 93 millilitres of boiling distilled water to each flask. First Click on distilled water ";
    step4State.step = 1;
    
    // Reset all state flags
    step4State.bottleAtCylinder = false;
    step4State.bottlePoured = false;
    step4State.cylinderAtFlaskS = false;
    step4State.cylinderPouredIntoS = false;
    step4State.cylinderAtFlaskB = false;
    step4State.cylinderPouredIntoB = false;
    
    // Initialize positions to match CSS values
    let bottle = document.querySelector("#distilled-water4");
    let cylinder = document.querySelector("#measuring-cylinder4");
    let flaskS = document.querySelector("#flask-s4");
    let flaskB = document.querySelector("#flask-b4");
    
    // Distilled water bottle - initial state (matches CSS: distilled water (2).png)
    if (bottle) {
        bottle.style.left = "8%";
        bottle.style.top = "57%";
        bottle.style.width = "10%";
        bottle.style.height = "35%";
        bottle.style.transform = "rotate(0deg)";
    }
    
    // Measuring cylinder - initial empty state (matches CSS: measuring cylinder.png)
    if (cylinder) {
        cylinder.style.left = "25%";
        cylinder.style.top = "60%";
        cylinder.style.width = "8%";
        cylinder.style.height = "30%";
        cylinder.style.transform = "rotate(0deg)";
        cylinder.style.cursor = "pointer";
        cylinder.style.pointerEvents = "auto";
        cylinder.style.zIndex = "10";
        // Ensure click handler is attached
        cylinder.onclick = handleCylinderClick;
        cylinder.setAttribute("onclick", "handleCylinderClick()");
    }
    
    // Flask S - initial state (matches CSS: flask-saponifiedclear.png)
    if (flaskS) {
        flaskS.style.left = "40%";
        flaskS.style.top = "55%";
        flaskS.style.width = "15%";
        flaskS.style.height = "45%";
    }
    
    // Flask B - initial state (matches CSS: flask-b-sample.png)
    if (flaskB) {
        flaskB.style.left = "55%";
        flaskB.style.top = "54%";
        flaskB.style.width = "15%";
        flaskB.style.height = "45%";
    }
    
    // Play audio
    // Assuming playSound is available or we use the audio system
    // "Step 4 — measure and add 93 millilitres of boiling distilled water to each flask."
    // For now, we'll just rely on text or existing audio patterns if any.
    // If there's a specific audio file for this, we'd play it.
    // Since I don't have the audio mapping, I'll skip explicit audio call unless I see a pattern.
    // The user provided a script, so I should probably try to speak it if possible or just show text.
    // I'll stick to updating the text as requested.
}

function handleDistilledWaterClick() {
    let bottle = document.querySelector("#distilled-water4");
    let cylinder = document.querySelector("#measuring-cylinder4");
    
    if (step4State.step === 1 && !step4State.pour1Done) {
        // FIRST POUR - Three-click flow
        if (!step4State.bottleAtCylinder) {
            // FIRST CLICK: Move bottle to cylinder position
            
            // Move bottle to cylinder (Right side alignment) - smooth transition
            bottle.style.transition = "all 1s ease-in-out";
            bottle.style.left = "27.5%"; // Right of cylinder
            bottle.style.top = "40%";  // Above cylinder
            bottle.style.transform = "rotate(-50deg)"; // Pouring leftwards
            
            step4State.bottleAtCylinder = true;
            document.querySelector("#text").innerText = "Bottle is positioned. Click on distilled water bottle pour 93 ml water into the measuring cylinder.";
        } else if (!step4State.bottlePoured) {
            // SECOND CLICK: Switch images (bottle stays in air)
            
            // Preserve current positions before switching to prevent jumping
            let bottleCurrentLeft = bottle.style.left;
            let bottleCurrentTop = bottle.style.top;
            let bottleCurrentTransform = bottle.style.transform;
            let cylinderCurrentLeft = cylinder.style.left || "21%";
            let cylinderCurrentTop = cylinder.style.top || "52%";
            
            // Trigger drop animation BEFORE switching images completely
            // This makes it look like pouring is happening
            triggerDropAnimation("drop-distilled-cylinder-1", 4);
            
            // Delay the image switch slightly to let drops start falling
            setTimeout(() => {
                // Disable transitions during image switch to prevent jumping
                bottle.style.transition = "none";
                cylinder.style.transition = "none";
                
                // Set positions FIRST, then switch images
                bottle.style.left = "18.5%";
                bottle.style.top = "12%";
                bottle.style.transform = "rotate(-50deg)";
                bottle.style.width = "25%";
                bottle.style.height = "80%";
                
                cylinder.style.left = "21%";
                cylinder.style.top = "52%";
                cylinder.style.width = "13%";
                cylinder.style.height = "45%";

                // Now switch the images
                bottle.src = "images/after-distill.png"; // Half-filled
                cylinder.src = "images/distilled-93ml.png";
                
                // Ensure cylinder remains clickable when filled
                cylinder.style.cursor = "pointer";
                cylinder.style.pointerEvents = "auto";
                cylinder.style.zIndex = "10";
                // Attach click handler using multiple methods to ensure it works
                cylinder.onclick = handleCylinderClick;
                cylinder.setAttribute("onclick", "handleCylinderClick()");
                // Remove any existing listeners and add new one
                cylinder.removeEventListener("click", handleCylinderClick);
                cylinder.addEventListener("click", handleCylinderClick);
                
                // Re-enable transitions after a brief delay
                setTimeout(() => {
                    bottle.style.transition = "all 1s ease-in-out";
                    cylinder.style.transition = "all 1s ease-in-out";
                    // Ensure click handler is still attached after image loads
                    cylinder.onclick = handleCylinderClick;
                    cylinder.setAttribute("onclick", "handleCylinderClick()");
                    cylinder.removeEventListener("click", handleCylinderClick);
                    cylinder.addEventListener("click", handleCylinderClick);
                }, 100);
                
                step4State.bottlePoured = true;
                document.querySelector("#text").innerText = "Water has been poured. Click again to return the bottle to its place.";
            }, 1000); // Wait for drops to fall a bit before showing filled state
            
            step4State.bottlePoured = true;
            document.querySelector("#text").innerText = "Water has been poured. Click again to return the bottle to its place.";
        } else {
            // THIRD CLICK: Return bottle to its position
            
            // Return bottle to its position (half-filled state) - smooth transition
            bottle.style.transition = "all 1s ease-in-out";
            bottle.style.transform = "rotate(0deg)";
            bottle.style.left = "5%";
            bottle.style.top = "30%";
            // Reset cylinder to its resting position
            cylinder.style.transition = "all 1s ease-in-out";
            cylinder.style.left = "21%";
            cylinder.style.top = "52%";

            step4State.bottleAtCylinder = false;
            step4State.bottlePoured = false;
            step4State.pour1Done = true;
            step4State.step = 2;
            document.querySelector("#text").innerText = "Click on the measuring cylinder to move it to Flask S.";
        }
    } else if (step4State.step === 3 && !step4State.pour3Done) {
        // SECOND POUR - Three-click flow
        if (!step4State.bottleAtCylinder) {
            // FIRST CLICK: Move bottle to cylinder position
            
            // Move bottle to cylinder (Right side alignment) - smooth transition
            bottle.style.transition = "all 1s ease-in-out";
            bottle.style.left = "19%";
            bottle.style.top = "13%";
            bottle.style.transform = "rotate(-50deg)";
            
            step4State.bottleAtCylinder = true;
            document.querySelector("#text").innerText = "Bottle is positioned. Click again to pour 93ml of water into the measuring cylinder.";
        } else if (!step4State.bottlePoured) {
            // SECOND CLICK: Switch images (bottle stays in air)
            
            // Preserve current positions before switching to prevent jumping
            let bottleCurrentLeft = bottle.style.left;
            let bottleCurrentTop = bottle.style.top;
            let bottleCurrentTransform = bottle.style.transform;
            let cylinderCurrentLeft = cylinder.style.left || "27.5%";
            let cylinderCurrentTop = cylinder.style.top || "40%";
            
            // Trigger drop animation
            triggerDropAnimation("drop-distilled-cylinder-2", 4);
            
            // Delay image switch
            setTimeout(() => {
                // Disable transitions during image switch to prevent jumping
                bottle.style.transition = "none";
                cylinder.style.transition = "none";
                
                // Set positions FIRST, then switch images
                bottle.style.left = "27.5%";
                bottle.style.top = "40%";
                bottle.style.transform = "rotate(-50deg)";
                bottle.style.width = "10%";
                bottle.style.height = "35%";
                
                cylinder.style.left = "22%";
                cylinder.style.top = "54%";
                cylinder.style.width = "13%";
                cylinder.style.height = "44%";

                // Now switch the images
                bottle.src = "images/distilled water.png"; // Empty placeholder
                cylinder.src = "images/distilled-93ml.png";
                // Ensure cylinder remains clickable when filled
                cylinder.style.cursor = "pointer";
                cylinder.style.pointerEvents = "auto";
                cylinder.style.zIndex = "10";
                // Attach click handler using multiple methods to ensure it works
                cylinder.onclick = handleCylinderClick;
                cylinder.setAttribute("onclick", "handleCylinderClick()");
                // Remove any existing listeners and add new one
                cylinder.removeEventListener("click", handleCylinderClick);
                cylinder.addEventListener("click", handleCylinderClick);
                
                // Re-enable transitions after a brief delay
                setTimeout(() => {
                    bottle.style.transition = "all 1s ease-in-out";
                    cylinder.style.transition = "all 1s ease-in-out";
                    // Ensure click handler is still attached after image loads
                    cylinder.onclick = handleCylinderClick;
                    cylinder.setAttribute("onclick", "handleCylinderClick()");
                    cylinder.removeEventListener("click", handleCylinderClick);
                    cylinder.addEventListener("click", handleCylinderClick);
                }, 100);
                
                step4State.bottlePoured = true;
                document.querySelector("#text").innerText = "Water has been poured. Click again to return the bottle to its place.";
            }, 1000);
            
            step4State.bottlePoured = true;
            document.querySelector("#text").innerText = "Water has been poured. Click again to return the bottle to its place.";
        } else {
            // THIRD CLICK: Return bottle to its position
            
            // Return bottle to its position (empty state) - smooth transition
            bottle.style.transition = "all 1s ease-in-out";
            bottle.style.transform = "rotate(0deg)";
            bottle.style.left = "10%";
            bottle.style.top = "56%";
            
            // Reset cylinder to its resting position
            cylinder.style.transition = "all 1s ease-in-out";
            cylinder.style.left = "22%";
            cylinder.style.top = "54%";
            
            step4State.bottleAtCylinder = false;
            step4State.bottlePoured = false;
            step4State.pour3Done = true;
            step4State.step = 4;
            document.querySelector("#text").innerText = "Click on the measuring cylinder to move it to Flask B.";
        }
    }
}

function handleCylinderClick() {
    let cylinder = document.querySelector("#measuring-cylinder4");
    let flaskS = document.querySelector("#flask-s4");
    let flaskB = document.querySelector("#flask-b4");
    
    // Ensure cylinder is always clickable
    if (cylinder) {
        cylinder.style.cursor = "pointer";
        cylinder.style.pointerEvents = "auto";
        cylinder.style.zIndex = "10";
        // Ensure click handler is attached using multiple methods
        cylinder.onclick = handleCylinderClick;
        cylinder.setAttribute("onclick", "handleCylinderClick()");
        cylinder.removeEventListener("click", handleCylinderClick);
        cylinder.addEventListener("click", handleCylinderClick);
    }
    
    if (step4State.step === 2 && !step4State.pour2Done) {
        // POUR INTO FLASK S - Three-click flow
        if (!step4State.cylinderAtFlaskS) {
            // FIRST CLICK: Move cylinder to Flask S position (rise up and move)
            
            // Store current position and size before moving
            let currentLeft = cylinder.style.left || "21%";
            let currentTop = cylinder.style.top || "52%";
            let currentWidth = cylinder.style.width || "13%";
            let currentHeight = cylinder.style.height || "45%";
            
            // Move cylinder to Flask S - smooth transition
            cylinder.style.transition = "all 1s ease-in-out";
            cylinder.style.left = "33%"; // Near Flask S (40%)
            cylinder.style.top = "33%";  // Above Flask S (rises up)
            cylinder.style.transform = "rotate(70deg)";
            // Maintain size during movement
            cylinder.style.width = currentWidth;
            cylinder.style.height = currentHeight;
            // Ensure it remains clickable
            cylinder.style.cursor = "pointer";
            cylinder.style.pointerEvents = "auto";
            cylinder.style.zIndex = "10";
            cylinder.onclick = handleCylinderClick;
            cylinder.setAttribute("onclick", "handleCylinderClick()");
            
            step4State.cylinderAtFlaskS = true;
            document.querySelector("#text").innerText = "Cylinder is positioned above Flask S. Click again to pour water into Flask S.";
        } else if (!step4State.cylinderPouredIntoS) {
            // SECOND CLICK: Switch images (cylinder stays in air, no position change)
            
            // ===================================================================
            // ADJUSTABLE POSITIONING FOR CYLINDER IN AIR AFTER POURING INTO FLASK S
            // ===================================================================
            // Modify these values to adjust the cylinder position, size, and margins
            // when it's in the air after pouring water into Flask S
            // ===================================================================
            let cylinderInAirLeft = "36.5%";      // ADJUST: Horizontal position (left)
            let cylinderInAirTop = "45%";       // ADJUST: Vertical position (top)
            let cylinderInAirWidth = "8%";     // ADJUST: Width of cylinder
            let cylinderInAirHeight = "30%";    // ADJUST: Height of cylinder
            let cylinderInAirRotate = "70deg";  // ADJUST: Rotation angle
            let cylinderInAirMargin = "0";      // ADJUST: Margin (e.g., "10px", "5%", "0")
            // ===================================================================
            
            // Trigger drop animation
            triggerDropAnimation("drop-cylinder-flask-s", 4);
            
            // Delay image switch
            setTimeout(() => {
                // Switch images - water is poured into Flask S
                // Set position FIRST to prevent jumping, then change src
                cylinder.style.transition = "none"; // No transition on image switch to prevent jump
                cylinder.style.left = cylinderInAirLeft;
                cylinder.style.top = cylinderInAirTop;
                cylinder.style.width = cylinderInAirWidth;
                cylinder.style.height = cylinderInAirHeight;
                cylinder.style.transform = "rotate(" + cylinderInAirRotate + ")";
                cylinder.style.margin = cylinderInAirMargin;

                // Now switch the image
                cylinder.src = "images/measuring cylinder.png"; // Empty
                
                // Update flask image
                flaskS.src = "images/flasks-after-93ml.png"; // Flask S filled
                
                // Re-enable transitions for future movements
                setTimeout(() => {
                    cylinder.style.transition = "all 1s ease-in-out";
                }, 50);
                
                step4State.cylinderPouredIntoS = true;
                document.querySelector("#text").innerText = "Water has been poured into Flask S. Click again to return the cylinder to its place.";
            }, 1000);
            
            step4State.cylinderPouredIntoS = true;
            document.querySelector("#text").innerText = "Water has been poured into Flask S. Click again to return the cylinder to its place.";
        } else {
            // THIRD CLICK: Return cylinder to its position
            
            // Return cylinder to its resting position - smooth transition
            cylinder.style.transition = "all 1s ease-in-out";
            cylinder.style.transform = "rotate(0deg)";
            cylinder.style.left = "25%";
            cylinder.style.top = "60%";
            cylinder.style.width = "8%";
            cylinder.style.height = "30%";
            
            step4State.cylinderAtFlaskS = false;
            step4State.cylinderPouredIntoS = false;
            step4State.pour2Done = true;
            step4State.step = 3;
            document.querySelector("#text").innerText = "Click on the distilled water bottle to measure again.";
        }
    } else if (step4State.step === 4 && !step4State.pour4Done) {
        // POUR INTO FLASK B - Three-click flow
        if (!step4State.cylinderAtFlaskB) {
            // FIRST CLICK: Move cylinder to Flask B position (rise up and move)
            
            // Store current position and size before moving
            let currentLeft = cylinder.style.left || "21%";
            let currentTop = cylinder.style.top || "52%";
            let currentWidth = cylinder.style.width || "8%";
            let currentHeight = cylinder.style.height || "30%";
            
            // Move cylinder to Flask B - smooth transition
            cylinder.style.transition = "all 1s ease-in-out";
            cylinder.style.left = "50%"; // Near Flask B (55%)
            cylinder.style.top = "38%";  // Above Flask B (rises up)
            cylinder.style.transform = "rotate(60deg)";
            // Maintain size during movement
            cylinder.style.width = currentWidth;
            cylinder.style.height = currentHeight;
            // Ensure it remains clickable
            cylinder.style.cursor = "pointer";
            cylinder.style.pointerEvents = "auto";
            cylinder.style.zIndex = "10";
            cylinder.onclick = handleCylinderClick;
            cylinder.setAttribute("onclick", "handleCylinderClick()");
            
            step4State.cylinderAtFlaskB = true;
            document.querySelector("#text").innerText = "Cylinder is positioned above Flask B. Click again to pour water into Flask B.";
        } else if (!step4State.cylinderPouredIntoB) {
            // SECOND CLICK: Switch images (cylinder stays in air, no position change)
            
            // ===================================================================
            // ADJUSTABLE POSITIONING FOR CYLINDER IN AIR AFTER POURING INTO FLASK B
            // ===================================================================
            // Modify these values to adjust the cylinder position, size, and margins
            // when it's in the air after pouring water into Flask B
            // ===================================================================
            let cylinderInAirLeftB = "52%";      // ADJUST: Horizontal position (left)
            let cylinderInAirTopB = "46%";        // ADJUST: Vertical position (top)
            let cylinderInAirWidthB = "8%";      // ADJUST: Width of cylinder
            let cylinderInAirHeightB = "30%";    // ADJUST: Height of cylinder
            let cylinderInAirRotateB = "60deg";  // ADJUST: Rotation angle
            let cylinderInAirMarginB = "0";       // ADJUST: Margin (e.g., "10px", "5%", "0")
            // ===================================================================
            
            // Trigger drop animation
            triggerDropAnimation("drop-cylinder-flask-b", 4);
            
            // Delay image switch
            setTimeout(() => {
                // Switch images - water is poured into Flask B
                // Set position FIRST to prevent jumping, then change src
                cylinder.style.transition = "none"; // No transition on image switch to prevent jump
                cylinder.style.left = cylinderInAirLeftB;
                cylinder.style.top = cylinderInAirTopB;
                cylinder.style.width = cylinderInAirWidthB;
                cylinder.style.height = cylinderInAirHeightB;
                cylinder.style.transform = "rotate(" + cylinderInAirRotateB + ")";
                cylinder.style.margin = cylinderInAirMarginB;

                // Now switch the image
                cylinder.src = "images/measuring cylinder.png"; // Empty
                
                // Update flask image
                flaskB.src = "images/flaskb-after-93ml.png"; // Flask B filled
                
                // Re-enable transitions for future movements
                setTimeout(() => {
                    cylinder.style.transition = "all 1s ease-in-out";
                }, 50);
                
                step4State.cylinderPouredIntoB = true;
                document.querySelector("#text").innerText = "Water has been poured into Flask B. Click again to return the cylinder to its place.";
            }, 1000);
            
            step4State.cylinderPouredIntoB = true;
            document.querySelector("#text").innerText = "Water has been poured into Flask B. Click again to return the cylinder to its place.";
        } else {
            // THIRD CLICK: Return cylinder to its position
            
            // Return cylinder to its resting position - smooth transition
            cylinder.style.transition = "all 1s ease-in-out";
            cylinder.style.transform = "rotate(0deg)";
            cylinder.style.left = "22%";
            cylinder.style.top = "58%";
            cylinder.style.width = "8%";
            cylinder.style.height = "30%";
            
            step4State.cylinderAtFlaskB = false;
            step4State.cylinderPouredIntoB = false;
            step4State.pour4Done = true;
            step4State.step = 5;
            document.querySelector("#text").innerText = "Both flasks now contain 93 ml of boiling distilled water. Dissolve properly and proceed to the next step.";
            
            // Show Next Button
            document.querySelector("#start").style.visibility = "visible";
            document.querySelector("#start").innerText = "NEXT";
            f = 50; // Flag for next step
            statuses = 6; // Status for next step
        }
    }
}