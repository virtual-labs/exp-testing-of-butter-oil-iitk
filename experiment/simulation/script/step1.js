let on = document.querySelector("#on")
let tare = document.querySelector("#tare")
let reading = document.querySelector("#reading")
let spatula = document.querySelector("#spatula")
let cap = document.querySelector("#cap")
let flaskS = document.querySelector("#flask-s")
let flaskB = document.querySelector("#flask-b")
let gheeOnSpatula = document.querySelector("#ghee-on-spatula")
let gheeDrop1 = document.querySelector("#ghee-drop1")
let gheeDrop2 = document.querySelector("#ghee-drop2")
let gheeDrop3 = document.querySelector("#ghee-drop3")


function on1(){
    if(f==1){
        reading.style.opacity="100%"
        f=2
        ins.innerText="Click on Flask S to place it on the weighing machine."
    }
}

function placeFlaskS(){
    if(f==2){
        f=3
        flaskS.style.top="45%"
        flaskS.style.left="6%"
        setTimeout(function(){
            reading.innerText="15.20"
            ins.innerText="Click TARE button to zero the balance."
            f=4
        },1000)
    }
}

function tare1(){
    if(f==4){
        f=5
        reading.innerText="00.00"
        ins.innerText="Click on 'GHEE SAMPLE' container's cap to open it."
    }
}

function cap1(){
    if(f==5){
        f=6
        cap.style.top="38%"
        setTimeout(function(){
            cap.style.left="40%"
            setTimeout(function(){
                cap.style.top="70%"
                ins.innerText="Click on Spatula to take ghee sample from the bottle."
                f=7
            },1000)
        },1000)
    }
    else if(f==10){
        f=11
        cap.style.top="38%"
        setTimeout(function(){
            cap.style.left="28%"
            setTimeout(function(){
                cap.style.top="45%"
                startbutton.innerText="NEXT"
                startbutton.style.visibility="visible"
                ins.innerText="Step 1 Completed! 5g ghee sample in Flask S collected successfully. Click NEXT button."
                f=20
            },1000)
        },1000)
    }
}

function spatula1(){
    if(f==7){
        f=8
        // Initial move to position
        spatula.style.rotate="0deg"
        spatula.style.top="40%"
        spatula.style.left="20%"
        
        setTimeout(function(){
            // Move closer to bottle
            spatula.style.left="35%"
            
            setTimeout(function(){
                // Spatula enters bottle (tilted)
                spatula.style.top="50%"
                spatula.style.rotate="-20deg"
                spatula.style.left="33%"
                
                setTimeout(function(){
                    // Spatula exits bottle - SWAP IMAGE
                    // Since images are same size now, use same coordinates as standard spatula
                    spatula.src = "images/ghee-on-spatula.png"
                    spatula.style.top="35%"
                    spatula.style.rotate="0deg"
                    spatula.style.left="35%"
                    
                    setTimeout(function(){
                        // Move spatula towards Flask S - Position at the brim
                        spatula.style.left="10%" 
                        spatula.style.top="30%" // Keep high approach
                        
                        setTimeout(function(){
                            // Position spatula exactly at Flask S mouth (tilted to pour)
                            spatula.style.rotate="-5deg"
                            spatula.style.left="10%" 
                            spatula.style.top="35%" // Maintain height, don't lower
                            
                            // Start dropping ghee drops (Two drops only)
                            setTimeout(function(){
                                // First drop
                                gheeDrop1.style.transition = "opacity 0.2s, top 0.2s"; // Fast initial transition
                                gheeDrop1.style.visibility = "visible";
                                gheeDrop1.style.opacity = "1";
                                gheeDrop1.style.top = "40%"; 
                                gheeDrop1.style.left = "9.5%"; // Centered in Flask S

                                setTimeout(function(){
                                    gheeDrop1.style.opacity = "0.3"; // Disappear slightly (breaking effect)
                                    
                                    setTimeout(function(){
                                        gheeDrop1.style.opacity = "1"; // Appear again
                                        gheeDrop1.style.transition = "top 0.8s ease-in, opacity 0.8s ease-in"; // Smooth fall
                                        gheeDrop1.style.top = "60%"; // Reach sample level inside flask
                                        
                                        setTimeout(function(){
                                            gheeDrop1.style.opacity = "0"; // Fade out
                                        }, 600);
                                    }, 200);
                                }, 200);
                                
                                // Second drop - 1.5 second delay
                                setTimeout(function(){
                                    gheeDrop2.style.transition = "opacity 0.2s, top 0.2s";
                                    gheeDrop2.style.visibility = "visible";
                                    gheeDrop2.style.opacity = "1";
                                    gheeDrop2.style.top = "45%";
                                    gheeDrop2.style.left = "9.5%"; 

                                    setTimeout(function(){
                                        gheeDrop2.style.opacity = "0.3";
                                        
                                        setTimeout(function(){
                                            gheeDrop2.style.opacity = "1";
                                            gheeDrop2.style.transition = "top 0.8s ease-in, opacity 0.8s ease-in";
                                            gheeDrop2.style.top = "60%";
                                            
                                            setTimeout(function(){
                                                gheeDrop2.style.opacity = "0";
                                                
                                                // After drops, deposit the sample
                                                setTimeout(function(){
                                                    flaskS.src = "images/flask-with-sample.png";
                                                    reading.innerText = "05.00";
                                                    
                                                    // Reset positions and SWITCH IMAGE HERE
                                                    spatula.style.transition = "all 1s"; 
                                                    spatula.style.rotate = "0deg";
                                                    spatula.style.left = "15%";
                                                    spatula.style.top = "40%";
                                                    
                                                    setTimeout(function(){
                                                        spatula.src = "images/spatula.png"; // Switch to empty spatula
                                                        
                                                        // Return to resting position
                                                        spatula.style.left = "15%";
                                                        spatula.style.top = "83%";
                                                        spatula.style.rotate = "30deg";
                                                        
                                                        ins.innerText = "Perfect! 5g ghee sample placed in Flask S. Click on bottle cap to close it.";
                                                        f = 10;
                                                    }, 500);
                                                }, 800);
                                            }, 600);
                                        }, 200);
                                    }, 200);
                                }, 1500); // 1.5s delay for second drop
                            }, 500);
                        },1000)
                    },1000)
                },1500)
            },1000)        
        },1000)
    }
}