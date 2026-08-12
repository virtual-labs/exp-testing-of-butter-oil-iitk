let step3State = {
    step: 0,
    flaskSOnStand: false,
    flaskBOnStand: false,
    burnerOn: false,
    spatulaStirring: false,
    flaskSHeated: false,
    flaskBHeated: false
};

function startStep3() {
    document.querySelector("#stp3").style.visibility = "visible";
    document.querySelector("#ins").innerText = "Instructions :-";
    document.querySelector("#text").innerText = "First,Click on Flask S to place it on the funnel stand for heating.";
    step3State.step = 1;
    
    // Preload clear flask image
    let img = new Image();
    img.src = "images/flask-saponifiedclear.png";
}

function handleFlaskS3Click() {
    if (step3State.step === 1 && !step3State.flaskSOnStand) {
        let flask = document.querySelector("#flask-s3");
        
        // Move to stand
        flask.style.top = "38%";
        flask.style.left = "29%";
        step3State.flaskSOnStand = true;
        
        document.querySelector("#text").innerText = "Click on the burner to place it under the flask.";
        step3State.step = 2;
    }
}

function handleBurnerClick() {
    if (step3State.step === 2 && !step3State.burnerOn) {
        let burner = document.querySelector("#burner");
        
        // Move under flask
        burner.style.top = "68%";
        burner.style.left = "28%";
        step3State.burnerOn = true;
        
        document.querySelector("#text").innerText = "Now, Click on the stirrer to stir the solution while heating.";
        step3State.step = 3;
    } else if (step3State.step === 5 && !step3State.burnerOn) {
        // For Flask B
        let burner = document.querySelector("#burner");
        
        // Move under flask
        burner.style.top = "68%";
        burner.style.left = "28%";
        step3State.burnerOn = true;
        
        document.querySelector("#text").innerText = "Now, Click on the stirrer to stir the solution while heating.";
        step3State.step = 6;
    }
}

function handleStirrerClick() {
    let stirrer = document.querySelector("#stirrer");
    
    if (step3State.step === 3 && !step3State.spatulaStirring) {
        // Stir Flask S - Keep horizontal throughout
        
        // Step 1: Move stirrer horizontally to flask mouth
        stirrer.style.left = "31%";  // Above Flask S
        stirrer.style.top = "20%";   // At mouth level
        
        setTimeout(() => {
            // Step 2: Insert into flask (move down) - no rotation
            stirrer.style.top = "38%";  // Deep inside flask
            step3State.spatulaStirring = true;
            
            setTimeout(() => {
                // Step 3: Start circular stirring motion
                stirrer.style.animation = "stir 0.8s infinite ease-in-out";
                
                document.querySelector("#text").innerText = "Heating and stirring... Please wait for saponification (solution turns clear).";
                
                // Wait for heating to complete
                setTimeout(() => {
                    // Stop stirring
                    stirrer.style.animation = "none";
                    
                    // Step 4: Pull out of flask
                    stirrer.style.top = "20%";
                    
                    setTimeout(() => {
                        // Step 5: Move back to original position
                        stirrer.style.left = "5%";
                        stirrer.style.top = "70%";
                        step3State.spatulaStirring = false;
                        
                        // Change Flask S to clear (instant swap)
                        let flaskS = document.querySelector("#flask-s3");
                        flaskS.style.transition = "none";  // Disable transition for instant swap
                        flaskS.src = "images/flask-saponifiedclear.png";
                        flaskS.style.left = "30.5%";  // Adjusted for flask-saponifiedclear.png alignment on stand (29% + 1.5%)
                        step3State.flaskSHeated = true;
                        
                        // Re-enable transition after swap
                        setTimeout(() => {
                            flaskS.style.transition = "all 1s";
                        }, 50);
                        
                        // Move burner back
                        let burner = document.querySelector("#burner");
                        burner.style.top = "65%";
                        burner.style.left = "10%";
                        step3State.burnerOn = false;
                        
                        // Move Flask S back
                        setTimeout(() => {
                            flaskS.style.top = "63%";
                            flaskS.style.left = "59.5%";  // Return to table position (58% + 1.5%)
                            step3State.flaskSOnStand = false;
                            
                            document.querySelector("#text").innerText = "Flask S is saponified. Now click on Flask B to heat it.";
                            step3State.step = 4;
                        }, 1000);
                    }, 1000);
                }, 5000); // 5 seconds heating
            }, 500);
        }, 1000);
        
    } else if (step3State.step === 6 && !step3State.spatulaStirring) {
        // Stir Flask B - Keep horizontal throughout
        
        // Step 1: Move stirrer horizontally to flask mouth
        stirrer.style.left = "32%";  // Above Flask B
        stirrer.style.top = "20%";   // At mouth level
        
        setTimeout(() => {
            // Step 2: Insert into flask (move down) - no rotation
            stirrer.style.top = "35%";  // Deep inside flask
            step3State.spatulaStirring = true;
            
            setTimeout(() => {
                // Step 3: Start circular stirring motion
                stirrer.style.animation = "stir 0.8s infinite ease-in-out";
                
                document.querySelector("#text").innerText = "Heating and stirring Flask B...";
                
                // Wait for heating to complete
                setTimeout(() => {
                    // Stop stirring
                    stirrer.style.animation = "none";
                    
                    // Step 4: Pull out of flask
                    stirrer.style.top = "20%";
                    
                    setTimeout(() => {
                        // Step 5: Move back to original position
                        stirrer.style.left = "50%";
                        stirrer.style.top = "70%";
                        step3State.spatulaStirring = false;
                        
                        // Flask B does NOT change image (it's the blank)
                        step3State.flaskBHeated = true;
                        
                        // Move burner back
                        let burner = document.querySelector("#burner");
                        burner.style.top = "65%";
                        burner.style.left = "10%";
                        step3State.burnerOn = false;
                        
                        // Move Flask B back
                        setTimeout(() => {
                            let flaskB = document.querySelector("#flask-b3");
                            flaskB.style.top = "63%";
                            flaskB.style.left = "70%";
                            step3State.flaskBOnStand = false;
                            
                            document.querySelector("#text").innerText = "Great job! Step 3 Completed. All Saponification steps done successfully !!";
                            
                            // Show Next button or finish
                            document.querySelector("#start").style.visibility = "visible";
                            document.querySelector("#start").innerText = "NEXT";
                            f = 40; // Next step flag
                            step3State.step = 7;
                            
                        }, 1000);
                    }, 1000);
                }, 5000); // 5 seconds heating
            }, 500);
        }, 1000);
    }
}

function handleFlaskB3Click() {
    if (step3State.step === 4 && !step3State.flaskBOnStand) {
        let flask = document.querySelector("#flask-b3");
        
        // Move to stand
        flask.style.top = "36%";
        flask.style.left = "30%";
        step3State.flaskBOnStand = true;
        
        document.querySelector("#text").innerText = "Click on the burner to place it under the flask.";
        step3State.step = 5;
    }
}
