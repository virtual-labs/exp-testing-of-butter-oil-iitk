let step2State = {
    step: 0,
    glycerolCapOpen: false,
    naohCapOpen: false,
    pipetteFilled: false,
    naohPipetteFilled: false,
    currentSolution: null
};

function startStep2() {
    document.querySelector("#stp2").style.visibility = "visible";
    document.querySelector("#ins").innerText = "Instructions :-";
    document.querySelector("#text").innerText = "Take Flask S containing the ghee sample that was prepared in the previous step.";
    
    // Preload Flask B sample image
    let preloadImg = new Image();
    preloadImg.src = "images/flask-b-sample.png";
    
    setTimeout(() => {
        document.querySelector("#text").innerText = "Click on the glycerol bottle cap to open it.";
        step2State.step = 1;
    }, 5000);
}

function openGlycerolCap() {
    if (step2State.step === 1 && !step2State.glycerolCapOpen) {
        let cap = document.querySelector("#glycerol-cap");
        cap.style.transform = "rotate(90deg)";
        cap.style.top = "80%";
        cap.style.left = "20%";
        step2State.glycerolCapOpen = true;
        
        document.querySelector("#text").innerText = "Click on the pipette to insert it into the glycerol bottle and measure 20 ml of glycerol.";
        step2State.step = 2;
    }
}

function openNaOHCap() {
    if (step2State.step === 4 && !step2State.naohCapOpen) {
        let cap = document.querySelector("#naoh-cap");
        cap.style.transform = "rotate(180deg)";
        cap.style.top = "80%";
        cap.style.left = "80%";
        step2State.naohCapOpen = true;
        
        document.querySelector("#text").innerText = "Click on the NaOH pipette to insert it into the NaOH bottle and measure 2 ml of 0.5N NaOH.";
        step2State.step = 5;
    }
}

function handlePipetteClick() {
    let pipette = document.querySelector("#pipette2");
    
    if (step2State.step === 2 && step2State.glycerolCapOpen && !step2State.pipetteFilled) {
        // Measure Glycerol
        
        // Step 1: Move pipette horizontally to glycerol bottle mouth (still horizontal)
        pipette.style.left = "25%";
        pipette.style.top = "40%";
        pipette.style.transform = "rotate(0deg)"; // Keep horizontal initially
        
        setTimeout(() => {
            // Step 2: Rotate to vertical position at bottle mouth
            pipette.style.transform = "rotate(90deg)";
            pipette.style.top = "40%"; // Adjust position after rotation
            
            setTimeout(() => {
                // Step 3: Insert into bottle (move down)
                pipette.style.top = "50%";
                
                setTimeout(() => {
                    // Step 4: Fill - change to glycerol-filled dropper image
                    // Disable transition for instant switch
                    pipette.style.transition = "none";
                    pipette.src = "images/glycerol-in-pipette.png";
                    // Adjust position to match exactly where empty pipette was
                    pipette.style.left = "28%"; // Keep same horizontal position
                    pipette.style.top = "50%";  // Keep same vertical position
                    step2State.pipetteFilled = true;
                    step2State.currentSolution = "glycerol";
                    
                    // Re-enable transition after a brief moment
                    setTimeout(() => {
                        pipette.style.transition = "all 1s";
                    }, 50);
                    
                    setTimeout(() => {
                        // Step 5: Pull out of bottle (move up)
                        pipette.style.top = "40%";
                        
                        setTimeout(() => {
                            // Step 6: Move back to stand temporarily
                            pipette.style.left = "10%";
                            pipette.style.top = "65%";
                            pipette.style.transform = "rotate(20deg)"; // Back to horizontal
                            
                            setTimeout(() => {
                                // Close glycerol cap
                                let cap = document.querySelector("#glycerol-cap");
                                cap.style.transform = "rotate(0deg)";
                                cap.style.top = "64%";
                                cap.style.left = "30.3%";
                                step2State.glycerolCapOpen = false;
                                
                                document.querySelector("#text").innerText = "Click on the pipette to add the 20 ml glycerol into Flask S.";
                                step2State.step = 3;
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
        
    } else if (step2State.step === 3 && step2State.pipetteFilled && step2State.currentSolution === "glycerol") {
        // Add Glycerol to Flask S
        
        // Step 1: Move filled pipette horizontally to flask mouth (still horizontal)
        pipette.style.left = "39%"; // Adjusted for Flask S at 36%
        pipette.style.top = "20%";
        pipette.style.transform = "rotate(0deg)";
        
        setTimeout(() => {
            // Step 2: Rotate to vertical at flask mouth
            pipette.style.transform = "rotate(90deg)";
            pipette.style.top = "20%";
            
            setTimeout(() => {
                // Step 3: Insert into flask (move down slightly)
                pipette.style.top = "30%";
                
                setTimeout(() => {
                    // Step 4: Drop animation
                    dropSolution("glycerol", () => {
                        // Step 5: Empty the pipette
                        pipette.style.transition = "none";
                        pipette.src = "images/empty-glycerol-pipette.png";
                        pipette.style.left = "36.5%"; // Adjusted for Flask S
                        pipette.style.top = "30%"; 
                        step2State.pipetteFilled = false;
                        step2State.currentSolution = null;
                        
                        setTimeout(() => {
                            pipette.style.transition = "all 1s";
                            
                            // Step 6: Pull out of flask
                            pipette.style.top = "20%";
                            
                            setTimeout(() => {
                                // NEW: Move to Glycerol Bottle for Flask B
                                pipette.style.transform = "rotate(0deg)";
                                pipette.style.left = "25%";
                                pipette.style.top = "40%";
                                
                                // Auto open cap for second measurement
                                let cap = document.querySelector("#glycerol-cap");
                                cap.style.transform = "rotate(90deg)";
                                cap.style.top = "80%";
                                cap.style.left = "20%";
                                step2State.glycerolCapOpen = true;

                                document.querySelector("#text").innerText = "Click on the pipette to measure 20 ml of glycerol for Flask B.";
                                step2State.step = 3.5; // New step for measuring for Flask B
                            }, 1000);
                        }, 100);
                    });
                }, 500);
            }, 1000);
        }, 1000);

    } else if (step2State.step === 3.5 && !step2State.pipetteFilled) {
        // Measure Glycerol for Flask B
        
        // Already at bottle mouth from previous step
        
        // Rotate to vertical
        pipette.style.transform = "rotate(90deg)";
        pipette.style.top = "40%";
        
        setTimeout(() => {
            // Insert
            pipette.style.top = "50%";
            
            setTimeout(() => {
                // Fill
                pipette.style.transition = "none";
                pipette.src = "images/glycerol-in-pipette.png";
                pipette.style.left = "28%";
                pipette.style.top = "50%";
                step2State.pipetteFilled = true;
                step2State.currentSolution = "glycerol";
                
                setTimeout(() => {
                    pipette.style.transition = "all 1s";
                }, 50);
                
                setTimeout(() => {
                    // Pull out
                    pipette.style.top = "40%";
                    
                    setTimeout(() => {
                        // Move to Flask B
                        pipette.style.transform = "rotate(0deg)";
                        pipette.style.left = "53%"; // Adjusted for Flask B at 50%
                        pipette.style.top = "20%";
                        
                        // Automatically proceed to add to Flask B (Merged Step 3.6)
                        setTimeout(() => {
                            // Rotate to vertical
                            pipette.style.transform = "rotate(90deg)";
                            pipette.style.top = "20%";
                            
                            setTimeout(() => {
                                // Insert
                                pipette.style.top = "30%";
                                
                                setTimeout(() => {
                                    dropSolution("glycerol", () => {
                                        // Empty pipette
                                        pipette.style.transition = "none";
                                        pipette.src = "images/empty-glycerol-pipette.png";
                                        pipette.style.left = "50.5%"; // Adjusted for Flask B
                                        pipette.style.top = "30%";
                                        step2State.pipetteFilled = false;
                                        step2State.currentSolution = null;
                                        
                                        setTimeout(() => {
                                            pipette.style.transition = "all 1s";
                                            
                                            // Pull out
                                            pipette.style.top = "20%";
                                            
                                            setTimeout(() => {
                                                // Return to stand
                                                pipette.style.transform = "rotate(20deg)";
                                                pipette.style.left = "10%";
                                                pipette.style.top = "68%";
                                                
                                                setTimeout(() => {
                                                    // Close glycerol cap
                                                    let cap = document.querySelector("#glycerol-cap");
                                                    cap.style.transform = "rotate(0deg)";
                                                    cap.style.top = "64%";
                                                    cap.style.left = "30.3%";
                                                    step2State.glycerolCapOpen = false;
                                                    
                                                    document.querySelector("#text").innerText = "Click on the NaOH bottle cap to open it.";
                                                    step2State.step = 4;
                                                }, 1000);
                                            }, 1000);
                                        }, 100);
                                    }, "flaskB"); // Pass target
                                });
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 500);
    }
}

function handleNaOHPipetteClick() {
    let naohPipette = document.querySelector("#naoh-pipette");
    
    if (step2State.step === 5 && step2State.naohCapOpen && !step2State.naohPipetteFilled) {
        // Measure NaOH with NaOH pipette (Flask S)
        
        // Step 1: Move NaOH pipette horizontally to NaOH bottle mouth (keep slanted)
        naohPipette.style.left = "65%";
        naohPipette.style.top = "40%";
        naohPipette.style.transform = "rotate(0deg)";
        
        setTimeout(() => {
            // Step 2: Rotate to vertical position at bottle mouth
            naohPipette.style.transform = "rotate(0deg)"; // Was 0deg in previous user edit? Wait, user set it to 0deg?
            // User edit 13: changed rotate(90deg) to rotate(0deg).
            // But wait, 0deg is horizontal. Vertical is 90deg.
            // Ah, the user changed it to 0deg in Step Id 13.
            // "naohPipette.style.transform = "rotate(0deg)";"
            // If 0deg is vertical for the NaOH pipette image?
            // Let's stick to what was there.
            // Actually, I should check what the previous code was.
            // In Step 13, user changed line 183 to rotate(0deg).
            // And line 241 to rotate(0deg).
            // I should respect that.
            
            naohPipette.style.transform = "rotate(0deg)";
            naohPipette.style.top = "40%";
            
            setTimeout(() => {
                // Step 3: Insert into bottle (move down)
                naohPipette.style.top = "45%";
                
                setTimeout(() => {
                    // Step 4: Fill
                    naohPipette.style.transition = "none";
                    naohPipette.src = "images/naoh-2ml.png";
                    naohPipette.style.left = "65%";
                    naohPipette.style.top = "45%";
                    step2State.naohPipetteFilled = true;
                    
                    setTimeout(() => {
                        naohPipette.style.transition = "all 1s";
                    }, 50);
                    
                    setTimeout(() => {
                        // Step 5: Pull out
                        naohPipette.style.top = "40%";
                        
                        setTimeout(() => {
                            // Step 6: Move back to stand temporarily
                            naohPipette.style.left = "80%";
                            naohPipette.style.top = "65%";
                            naohPipette.style.transform = "rotate(80deg)";
                            
                            setTimeout(() => {
                                // Close NaOH cap
                                let cap = document.querySelector("#naoh-cap");
                                cap.style.transform = "rotate(0deg)";
                                cap.style.top = "65%";
                                cap.style.left = "70%";
                                step2State.naohCapOpen = false;
                                
                                document.querySelector("#text").innerText = "Click on the NaOH pipette to add the 2 ml NaOH into Flask S.";
                                step2State.step = 6;
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
        
    } else if (step2State.step === 6 && step2State.naohPipetteFilled) {
        // Add NaOH to Flask S
        
        // Step 1: Move filled NaOH pipette horizontally to flask mouth
        naohPipette.style.left = "38%"; // Adjusted for Flask S at 32%
        naohPipette.style.top = "20%";
        naohPipette.style.transform = "rotate(0deg)";
        
        setTimeout(() => {
            // Step 2: Rotate to vertical
            naohPipette.style.transform = "rotate(0deg)"; // Respecting user's 0deg
            naohPipette.style.top = "20%";
            
            setTimeout(() => {
                // Step 3: Insert into flask
                naohPipette.style.top = "30%";
                
                setTimeout(() => {
                    // Step 4: Drop animation
                    dropSolution("naoh", () => {
                        // Step 5: Empty
                        naohPipette.style.transition = "none";
                        naohPipette.src = "images/naoh-pipette.png";
                        naohPipette.style.left = "38%"; // Adjusted for Flask S
                        naohPipette.style.top = "30%";
                        step2State.naohPipetteFilled = false;
                        
                        setTimeout(() => {
                            naohPipette.style.transition = "all 1s";
                            
                            // Pull out
                            naohPipette.style.top = "20%";
                            
                            setTimeout(() => {
                                // NEW: Move to NaOH Bottle for Flask B
                                naohPipette.style.transform = "rotate(0deg)";
                                naohPipette.style.left = "65%";
                                naohPipette.style.top = "40%";
                                
                                // Auto open cap
                                let cap = document.querySelector("#naoh-cap");
                                cap.style.transform = "rotate(180deg)";
                                cap.style.top = "80%";
                                cap.style.left = "80%";
                                step2State.naohCapOpen = true;
                                
                                document.querySelector("#text").innerText = "Click on the NaOH pipette to measure 2 ml of NaOH for Flask B.";
                                step2State.step = 6.5; // New step
                            }, 1000);
                        }, 100);
                    });
                }, 500);
            }, 1000);
        }, 1000);

    } else if (step2State.step === 6.5 && !step2State.naohPipetteFilled) {
        // Measure NaOH for Flask B
        
        setTimeout(() => {
            // Rotate
            naohPipette.style.transform = "rotate(0deg)";
            naohPipette.style.top = "40%";
            
            setTimeout(() => {
                // Insert
                naohPipette.style.top = "45%";
                
                setTimeout(() => {
                    // Fill
                    naohPipette.style.transition = "none";
                    naohPipette.src = "images/naoh-2ml.png";
                    naohPipette.style.left = "65%";
                    naohPipette.style.top = "45%";
                    step2State.naohPipetteFilled = true;
                    
                    setTimeout(() => {
                        naohPipette.style.transition = "all 1s";
                    }, 50);
                    
                    setTimeout(() => {
                        // Pull out
                        naohPipette.style.top = "40%";
                        
                        setTimeout(() => {
                            // Move to Flask B
                            naohPipette.style.transform = "rotate(0deg)";
                            naohPipette.style.left = "52%"; // Adjusted for Flask B at 48%
                            naohPipette.style.top = "20%";
                            
                            // Automatically proceed to add to Flask B (Merged Step 6.6)
                            setTimeout(() => {
                                // Rotate
                                naohPipette.style.transform = "rotate(0deg)";
                                naohPipette.style.top = "10%";
                                
                                setTimeout(() => {
                                    // Insert
                                    naohPipette.style.top = "30%";
                                    
                                    setTimeout(() => {
                                        // Drop animation
                                        dropSolution("naoh", () => {
                                            // Swap Flask B image immediately after drops
                                            let flaskB = document.querySelector("#flask-b2");
                                            flaskB.style.transition = "none"; // Disable transition for instant swap
                                            flaskB.src = "images/flask-b-sample.png";
                                            
                                            // Preload image to ensure it's ready (can be done earlier, but ensuring it here too)
                                            let img = new Image();
                                            img.src = "images/flask-b-sample.png";
                                            
                                            // Empty
                                            naohPipette.style.transition = "none";
                                            naohPipette.src = "images/naoh-pipette.png";
                                            naohPipette.style.left = "52%"; // Adjusted for Flask B
                                            naohPipette.style.top = "30%";
                                            step2State.naohPipetteFilled = false;
                                            
                                            setTimeout(() => {
                                                naohPipette.style.transition = "all 1s";
                                                
                                                // Pull out
                                                naohPipette.style.top = "10%";
                                                
                                                setTimeout(() => {
                                                    // Return to stand
                                                    naohPipette.style.transform = "rotate(80deg)";
                                                    naohPipette.style.left = "80%";
                                                    naohPipette.style.top = "63%";
                                                    
                                                    setTimeout(() => {
                                                        // Close cap
                                                        let cap = document.querySelector("#naoh-cap");
                                                        cap.style.transform = "rotate(0deg)";
                                                        cap.style.top = "65%";
                                                        cap.style.left = "70%";
                                                        step2State.naohCapOpen = false;
                                                        
                                                        document.querySelector("#text").innerText = "Step 2 Completed. Click Next for Step 3.";
                                                        document.querySelector("#start").style.visibility = "visible";
                                                        document.querySelector("#start").innerText = "NEXT";
                                                        f = 30;
                                                        
                                                        // Ensure no further movement
                                                        step2State.step = 7; // Move to next logical step to prevent re-triggering
                                                    }, 1000);
                                                }, 1000);
                                            }, 100);
                                        }, "flaskB");
                                    });
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 500);
    }
}

function dropSolution(type, callback, targetFlask = "flaskS") {
    let drop = document.querySelector(type === "glycerol" ? "#drop-glycerol" : "#drop-naoh");
    
    // Call the appropriate animation function based on type
    if (type === "glycerol") {
        animateGlycerolDrops(drop, 3, callback, targetFlask);
    } else {
        animateNaOHDrops(drop, 3, callback, targetFlask);
    }
}

// ============= GLYCEROL DROP ANIMATION (Independent Section) =============
function animateGlycerolDrops(drop, count, callback, targetFlask) {
    if (count <= 0) {
        if (callback) callback();
        return;
    }
    
    // Determine horizontal position based on target flask
    // Flask S drops at 37.9% (Flask S is at 32%, center is ~39.5%, but pipette tip is at 35% + half width)
    // Pipette tip is at left: 35% (Flask S) and 51% (Flask B)
    // Pipette width is 12%, so center is +6% = 41% and 57%
    // Let's try aligning with pipette center: 41% and 57%
    // But previous values were specific. Let's use calculated values based on pipette position.
    // Glycerol pipette: 
    // Flask S: left 35% -> center ~41%
    // Flask B: left 51% -> center ~57%
    // Let's try these values.
    let leftPos = targetFlask === "flaskB" ? "56%" : "42%"; // Adjusted for new positions (shifted left by 3%)

    // Glycerol drop positioning and animation
    drop.style.left = leftPos; // Horizontal position
    drop.style.top = "68%"; // Start position (pipette tip)
    drop.style.visibility = "visible";
    drop.style.opacity = "1";
    drop.style.transition = "top 0.8s ease-in, opacity 0.6s ease-in";
    
    setTimeout(() => {
        // Fall into the solution inside the flask
        drop.style.top = "80%"; // End position (into flask solution)
        drop.style.opacity = "1";
        
        setTimeout(() => {
            drop.style.visibility = "hidden";
            drop.style.opacity = "1";
            drop.style.transition = "none";
            drop.style.top = "68%"; // Reset to start position
            
            setTimeout(() => {
                animateGlycerolDrops(drop, count - 1, callback, targetFlask);
            }, 150);
        }, 800);
    }, 50);
}

// ============= NaOH DROP ANIMATION (Independent Section) =============
function animateNaOHDrops(drop, count, callback, targetFlask) {
    if (count <= 0) {
        if (callback) callback();
        return;
    }
    
    // Determine horizontal position based on target flask
    // NaOH Pipette:
    // Flask S: left 34% -> center ~40%
    // Flask B: left 51% -> center ~57%
    let leftPos = targetFlask === "flaskB" ? "57.5%" : "43.5%"; 

    // NaOH drop positioning and animation
    drop.style.left = leftPos; // Horizontal position
    drop.style.top = "75%"; // Start position (pipette tip)
    drop.style.visibility = "visible";
    drop.style.opacity = "1";
    drop.style.transition = "top 0.8s ease-in, opacity 0.6s ease-in";
    
    setTimeout(() => {
        // Fall into the solution inside the flask
        drop.style.top = "85%"; // End position (into flask solution)
        drop.style.opacity = "1";
        
        setTimeout(() => {
            drop.style.visibility = "hidden";
            drop.style.opacity = "1";
            drop.style.transition = "none";
            drop.style.top = "75%"; // Reset to start position
            
            setTimeout(() => {
                animateNaOHDrops(drop, count - 1, callback, targetFlask);
            }, 150);
        }, 800);
    }, 50);
}