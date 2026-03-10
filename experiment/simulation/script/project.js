

let startlab = document.querySelector("#startinglab")
let startlab2 = document.querySelector("#workinglab")
let startbutton = document.querySelector("#start")
let ins = document.querySelector("#text")
let stp1 = document.querySelector("#stp1")




let statuses = 0
let f=0

function start(){
    if(statuses==0){
        statuses=1
        startbutton.style.visibility="hidden"
        document.querySelector("#expon").style.opacity="100%"
        setTimeout(function(){
            document.querySelector("#titletext").innerHTML="Welcome to the Experiment<br><span style='font-size: 0.8em; color: #FFD700;'>Quality Testing of Butter Oil (Ghee)</span>"
            document.querySelector("#titletext").style.fontSize="6vw"
            document.querySelector("#titletext").style.opacity="100%"
        },500)
        setTimeout(function(){
            startbutton.innerText="NEXT"
            startbutton.style.visibility="visible"
            ins.innerText="Click on NEXT button"
            statuses=2
        },5000)
    }
    else if(statuses==2){
        statuses=3
        startbutton.style.visibility="hidden"
        document.querySelector("#expon").style.opacity="0%"
        document.querySelector("#titletext").style.fontSize="0.01vw"
            document.querySelector("#titletext").style.opacity="0%"
            f=1
        setTimeout(function(){
            document.querySelector("#expon").style.visibility="hidden"
            document.querySelector("#titletext").style.visibility="hidden"
            ins.innerText="Turn on weighing scale to weigh ghee sample."
            
            // Initialize step 1 audio after a short delay
            setTimeout(function() {
                if (typeof initializeStep1Audio === 'function') {
                    // Wait for voices to load
                    if (speechSynthesis.getVoices().length === 0) {
                        speechSynthesis.addEventListener('voiceschanged', function() {
                            initializeStep1Audio()
                        })
                    } else {
                        initializeStep1Audio()
                    }
                }
            }, 500)
        },2000)
    }
    // Transition to Step 2
    else if(statuses==3 && f==20){ // f=20 is set in step1.js when Step 1 finishes
         
         // Hide Step 1
         stp1.style.visibility = "hidden";
         
         // Start Step 2
         startStep2();
         
         statuses = 4; // Move to next status
         startbutton.style.visibility = "hidden"; // Hide button until Step 2 is done
    }
    // Transition to Step 3
    else if(statuses==4 && f==30){ // f=30 is set in step2.js when Step 2 finishes
        
        // Hide Step 2
        document.querySelector("#stp2").style.visibility = "hidden";
        
        // Start Step 3
        startStep3();
        
        statuses = 5;
        startbutton.style.visibility = "hidden";
    }
    // Transition to Step 4
    else if(statuses==5 && f==40){ // f=40 is set in step3.js when Step 3 finishes
        
        // Hide Step 3
        document.querySelector("#stp3").style.visibility = "hidden";
        
        // Start Step 4
        startStep4();
        
        statuses = 6;
        startbutton.style.visibility = "hidden";
    }
    // Transition to Step 5
    else if(statuses==6 && f==50){ // f=50 is set in step4.js when Step 4 finishes
        
        // Hide Step 4
        document.querySelector("#stp4").style.visibility = "hidden";
        
        // Start Step 5
        startStep5();
        
        statuses = 7;
        startbutton.style.visibility = "hidden";
    }
    // Transition to Step 6
    else if(statuses==7 && f==60){ // f=60 is set in step5.js when Step 5 finishes
        
        // Hide Step 5
        document.querySelector("#stp5").style.visibility = "hidden";
        
        // Start Step 6
        startStep6();
        
        statuses = 8;
        startbutton.style.visibility = "hidden";
    }
    // Transition to Step 7
    else if(statuses==8 && f==70){ // f=70 is set in step6.js when Step 6 finishes
        
        // Hide Step 6
        document.querySelector("#stp6").style.visibility = "hidden";
        
        // Start Step 7
        startStep7();
        
        statuses = 9;
        startbutton.style.visibility = "hidden";
    }
    // Transition to Step 8
    else if(statuses==9 && f==80){ // f=80 is set in step7.js when Step 7 finishes
        
        // Hide Step 7
        document.querySelector("#stp7").style.visibility = "hidden";
        
        // Start Step 8
        startStep8();
        
        statuses = 10;
        startbutton.style.visibility = "hidden";
    }
    // Transition to Step 9
    else if(statuses==10 && f==90){ // f=90 is set in step8.js when Step 8 finishes
        
        // Hide Step 8
        document.querySelector("#stp8").style.visibility = "hidden";
        
        // Start Step 9
        startStep9();
        
        statuses = 11;
        startbutton.style.visibility = "hidden";
    }
    // Transition to Step 10
    else if(statuses==11 && f==100){ // f=100 is set in step9.js when Step 9 finishes
        
        // Hide Step 9
        document.querySelector("#stp9").style.visibility = "hidden";
        
        // Start Step 10
        startStep10();
        
        statuses = 12;
        startbutton.style.visibility = "hidden";
    }

    // Transition to Step 11
    else if(statuses==12 && f==110){ // f=110 is set in step10.js when Step 10 finishes
        
        // Hide Step 10
        document.querySelector("#stp10").style.visibility = "hidden";
        
        // Start Step 11
        startStep11();
        
        statuses = 13;
        startbutton.style.visibility = "hidden";
    }

    // Transition to Step 12
    else if(statuses==13 && f==110){ // f=110 is set in step11.js
        
        // Hide Step 11
        document.querySelector("#stp11").style.visibility = "hidden";
        
        // Start Step 12
        startStep12();
        
        statuses = 14;
        startbutton.style.visibility = "hidden";
    }

    // Transition to Step 13
    else if(statuses==14 && f==120){ // f=120 from step12 completion
        
        // Hide Step 12
        document.querySelector("#stp12").style.visibility = "hidden";
        
        // Start Step 13
        startStep13();
        
        statuses = 15;
        startbutton.style.visibility = "hidden";
    }

    // End of Experiment (After Step 13)
    else if(statuses==15 && f==130){ // f=130 from step13 completion
        
        document.querySelector("#stp13").style.visibility = "hidden";
        document.querySelector("#expon").style.opacity = "100%";
        document.querySelector("#expon").style.visibility = "visible";
        document.querySelector("#titletext").style.visibility = "visible";
        document.querySelector("#titletext").innerHTML = "Experiment Completed!<br><span style='font-size: 0.6em; color: lime;'>You have successfully determined the Polenske Value.</span>";
        document.querySelector("#titletext").style.fontSize = "4vw";
        document.querySelector("#titletext").style.opacity = "100%";
        
        startbutton.style.visibility = "visible";
        startbutton.innerText = "RESTART";
        startbutton.onclick = function() { location.reload(); };
        ins.innerText = "Congratulations!";
    }

}


// Development/Testing function to skip directly to Step 2
function skipToStep2() {
    
    // Hide the intro/title screen
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide Step 1
    stp1.style.visibility = "hidden";
    
    // Hide the START button
    startbutton.style.visibility = "hidden";
    
    // Set the flag and status
    f = 20;
    statuses = 3;
    
    // Start Step 2 directly
    startStep2();
    
    // Hide skip button and show back button
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 3
function skipToStep3() {
    
    // Hide intro/title
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide previous steps
    stp1.style.visibility = "hidden";
    document.querySelector("#stp2").style.visibility = "hidden";
    
    // Hide START button
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 30;
    statuses = 4;
    
    // Start Step 3
    startStep3();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 4
function skipToStep4() {
    
    // Hide intro/title
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide previous steps
    stp1.style.visibility = "hidden";
    document.querySelector("#stp2").style.visibility = "hidden";
    document.querySelector("#stp3").style.visibility = "hidden";
    
    // Hide START button
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 40;
    statuses = 5;
    
    // Start Step 4
    startStep4();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 5
function skipToStep5() {
    
    // Hide intro/title
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide previous steps
    stp1.style.visibility = "hidden";
    document.querySelector("#stp2").style.visibility = "hidden";
    document.querySelector("#stp3").style.visibility = "hidden";
    document.querySelector("#stp4").style.visibility = "hidden";
    
    // Hide START button
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 50;
    statuses = 6;
    
    // Start Step 5
    startStep5();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 6
function skipToStep6() {
    
    // Hide intro/title
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide previous steps
    stp1.style.visibility = "hidden";
    document.querySelector("#stp2").style.visibility = "hidden";
    document.querySelector("#stp3").style.visibility = "hidden";
    document.querySelector("#stp4").style.visibility = "hidden";
    document.querySelector("#stp5").style.visibility = "hidden";
    
    // Hide START button
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 60;
    statuses = 7;
    
    // Start Step 6
    startStep6();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 7
function skipToStep7() {
    
    // Hide intro/title
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide previous steps
    stp1.style.visibility = "hidden";
    document.querySelector("#stp2").style.visibility = "hidden";
    document.querySelector("#stp3").style.visibility = "hidden";
    document.querySelector("#stp4").style.visibility = "hidden";
    document.querySelector("#stp5").style.visibility = "hidden";
    document.querySelector("#stp6").style.visibility = "hidden";
    
    // Hide START button
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 70;
    statuses = 8;
    
    // Start Step 7
    startStep7();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 8
function skipToStep8() {
    
    // Hide intro/title
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide previous steps
    stp1.style.visibility = "hidden";
    document.querySelector("#stp2").style.visibility = "hidden";
    document.querySelector("#stp3").style.visibility = "hidden";
    document.querySelector("#stp4").style.visibility = "hidden";
    document.querySelector("#stp5").style.visibility = "hidden";
    document.querySelector("#stp6").style.visibility = "hidden";
    document.querySelector("#stp7").style.visibility = "hidden";
    
    // Hide START button
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 80;
    statuses = 9;
    
    // Start Step 8
    startStep8();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#skipToStep8").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 9
function skipToStep9() {
    
    // Hide intro/title
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide previous steps
    stp1.style.visibility = "hidden";
    document.querySelector("#stp2").style.visibility = "hidden";
    document.querySelector("#stp3").style.visibility = "hidden";
    document.querySelector("#stp4").style.visibility = "hidden";
    document.querySelector("#stp5").style.visibility = "hidden";
    document.querySelector("#stp6").style.visibility = "hidden";
    document.querySelector("#stp7").style.visibility = "hidden";
    document.querySelector("#stp8").style.visibility = "hidden";
    
    // Hide START button
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 90;
    statuses = 10;
    
    // Start Step 9
    startStep9();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#skipToStep8").style.display = "none";
    document.querySelector("#skipToStep9").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 10
function skipToStep10() {
    
    // Hide intro/title
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide previous steps
    stp1.style.visibility = "hidden";
    document.querySelector("#stp2").style.visibility = "hidden";
    document.querySelector("#stp3").style.visibility = "hidden";
    document.querySelector("#stp4").style.visibility = "hidden";
    document.querySelector("#stp5").style.visibility = "hidden";
    document.querySelector("#stp6").style.visibility = "hidden";
    document.querySelector("#stp7").style.visibility = "hidden";
    document.querySelector("#stp8").style.visibility = "hidden";
    document.querySelector("#stp9").style.visibility = "hidden";
    
    // Hide START button
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 100;
    statuses = 11;
    
    // Start Step 10
    startStep10();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#skipToStep8").style.display = "none";
    document.querySelector("#skipToStep9").style.display = "none";
    document.querySelector("#skipToStep10").style.display = "none";
    document.querySelector("#skipToStep11").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 11
function skipToStep11() {
    
    // Hide intro/title
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide previous steps
    stp1.style.visibility = "hidden";
    document.querySelector("#stp2").style.visibility = "hidden";
    document.querySelector("#stp3").style.visibility = "hidden";
    document.querySelector("#stp4").style.visibility = "hidden";
    document.querySelector("#stp5").style.visibility = "hidden";
    document.querySelector("#stp6").style.visibility = "hidden";
    document.querySelector("#stp7").style.visibility = "hidden";
    document.querySelector("#stp8").style.visibility = "hidden";
    document.querySelector("#stp9").style.visibility = "hidden";
    document.querySelector("#stp10").style.visibility = "hidden";
    
    // Hide START button
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 110;
    statuses = 12;
    
    // Start Step 11
    startStep11();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#skipToStep8").style.display = "none";
    document.querySelector("#skipToStep9").style.display = "none";
    document.querySelector("#skipToStep10").style.display = "none";
    document.querySelector("#skipToStep11").style.display = "none";
    document.querySelector("#skipToStep12").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 12
function skipToStep12() {
    
    // Hide intro/title
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide previous steps
    stp1.style.visibility = "hidden";
    document.querySelector("#stp2").style.visibility = "hidden";
    document.querySelector("#stp3").style.visibility = "hidden";
    document.querySelector("#stp4").style.visibility = "hidden";
    document.querySelector("#stp5").style.visibility = "hidden";
    document.querySelector("#stp6").style.visibility = "hidden";
    document.querySelector("#stp7").style.visibility = "hidden";
    document.querySelector("#stp8").style.visibility = "hidden";
    document.querySelector("#stp9").style.visibility = "hidden";
    document.querySelector("#stp10").style.visibility = "hidden";
    document.querySelector("#stp11").style.visibility = "hidden";
    
    // Hide START button
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 110;
    statuses = 13; // Status to start Step 12
    
    // Start Step 12
    startStep12();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#skipToStep8").style.display = "none";
    document.querySelector("#skipToStep9").style.display = "none";
    document.querySelector("#skipToStep10").style.display = "none";
    document.querySelector("#skipToStep11").style.display = "none";
    document.querySelector("#skipToStep12").style.display = "none";
    document.querySelector("#skipToStep13").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}

// Development/Testing function to skip directly to Step 13
function skipToStep13() {
    
    // Hide intro
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    
    // Hide all previous steps
    stp1.style.visibility = "hidden";
    for(let i=2; i<=12; i++) {
        let s = document.querySelector("#stp"+i);
        if(s) s.style.visibility = "hidden";
    }
    
    // Hide START
    startbutton.style.visibility = "hidden";
    
    // Set flag and status
    f = 120;
    statuses = 14; 
    
    // Start Step 13
    startStep13();
    
    // Update buttons
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#skipToStep8").style.display = "none";
    document.querySelector("#skipToStep9").style.display = "none";
    document.querySelector("#skipToStep10").style.display = "none";
    document.querySelector("#skipToStep11").style.display = "none";
    document.querySelector("#skipToStep12").style.display = "none";
    document.querySelector("#skipToStep13").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
}


// Development/Testing function to go back to Step 1
function backToStep1() {
    
    // Reload the page to reset everything
    location.reload();
}

