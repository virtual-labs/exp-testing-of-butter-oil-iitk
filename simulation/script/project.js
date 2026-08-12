
let startlab = document.querySelector("#startinglab")
let startlab2 = document.querySelector("#workinglab")
let startbutton = document.querySelector("#start")
let ins = document.querySelector("#text")
let stp1 = document.querySelector("#stp1")

let statuses = 0
let f = 0

// ── helpers ──────────────────────────────────────────────────────────────────
function _hideIntro() {
    document.querySelector("#expon").style.opacity = "0%";
    document.querySelector("#expon").style.visibility = "hidden";
    document.querySelector("#titletext").style.visibility = "hidden";
    startbutton.style.visibility = "hidden";
}

// Show the Next button immediately, always labelled "Next →"
function showNextButton() {
    startbutton.innerText = "Next →";
    startbutton.style.visibility = "visible";
    startbutton.onclick = goToNextStep;
}

// Force-navigate to the next step regardless of whether the step is complete
function goToNextStep() {
    const fMap = {
        2.5: 0.5,   // Step 0  → Step 1
        3:   20,    // Step 1  → Step 2
        4:   30,    // Step 2  → Step 3
        5:   40,    // Step 3  → Step 4
        6:   50,    // Step 4  → Step 5
        7:   60,    // Step 5  → Step 6
        8:   70,    // Step 6  → Step 7
        9:   80,    // Step 7  → Step 8
        10:  90,    // Step 8  → Step 9
        11:  100,   // Step 9  → Step 10
        12:  110,   // Step 10 → Step 11
        13:  110,   // Step 11 → Step 12
        14:  120,   // Step 12 → Step 13
        15:  130    // Step 13 → End
    };
    if (fMap[statuses] !== undefined) {
        f = fMap[statuses];
        _runTransition();
    }
}


// ── fade helper: fades out fromId, then starts nextFn and fades in toId ──────
function _fadeTransition(fromId, toId, nextFn, extraFn) {
    let fromEl = document.querySelector(fromId);
    let toEl = document.querySelector(toId);
    fromEl.style.opacity = "0";
    setTimeout(function () {
        fromEl.style.visibility = "hidden";
        toEl.style.visibility = "visible";
        toEl.style.opacity = "0";
        nextFn();
        if (extraFn) extraFn();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

// ── core transition logic (shared by goToNextStep + original start() flow) ───
function _runTransition() {
    // Step 0 → Step 1
    if (statuses == 2.5 && f == 0.5) {
        statuses = 3;
        document.querySelector("#stp0").style.visibility = "hidden";
        f = 1;
        ins.innerText = "Turn on weighing scale to weigh ghee sample.";
        showNextButton();
        setTimeout(function () {
            if (typeof initializeStep1Audio === 'function') {
                if (speechSynthesis.getVoices().length === 0) {
                    speechSynthesis.addEventListener('voiceschanged', function () { initializeStep1Audio(); });
                } else {
                    initializeStep1Audio();
                }
            }
        }, 500);
    }
    // Step 1 → Step 2
    else if (statuses == 3 && f == 20) {
        statuses = 4;
        stp1.style.opacity = "0";
        setTimeout(function () {
            stp1.style.visibility = "hidden";
            let stp2 = document.querySelector("#stp2");
            stp2.style.visibility = "visible";
            stp2.style.opacity = "0";
            startStep2();
            setTimeout(function () { stp2.style.opacity = "1"; }, 50);
        }, 300);
    }
    // Step 2 → Step 3
    else if (statuses == 4 && f == 30) {
        statuses = 5;
        _fadeTransition("#stp2", "#stp3", startStep3, showNextButton);
    }
    // Step 3 → Step 4
    else if (statuses == 5 && f == 40) {
        statuses = 6;
        _fadeTransition("#stp3", "#stp4", startStep4, showNextButton);
    }
    // Step 4 → Step 5
    else if (statuses == 6 && f == 50) {
        statuses = 7;
        _fadeTransition("#stp4", "#stp5", startStep5, showNextButton);
    }
    // Step 5 → Step 6
    else if (statuses == 7 && f == 60) {
        statuses = 8;
        _fadeTransition("#stp5", "#stp6", startStep6, showNextButton);
    }
    // Step 6 → Step 7
    else if (statuses == 8 && f == 70) {
        statuses = 9;
        _fadeTransition("#stp6", "#stp7", startStep7, showNextButton);
    }
    // Step 7 → Step 8
    else if (statuses == 9 && f == 80) {
        statuses = 10;
        _fadeTransition("#stp7", "#stp8", startStep8, showNextButton);
    }
    // Step 8 → Step 9
    else if (statuses == 10 && f == 90) {
        statuses = 11;
        _fadeTransition("#stp8", "#stp9", startStep9, showNextButton);
    }
    // Step 9 → Step 10
    else if (statuses == 11 && f == 100) {
        statuses = 12;
        _fadeTransition("#stp9", "#stp10", startStep10, showNextButton);
    }
    // Step 10 → Step 11
    else if (statuses == 12 && f == 110) {
        statuses = 13;
        _fadeTransition("#stp10", "#stp11", startStep11, showNextButton);
    }
    // Step 11 → Step 12
    else if (statuses == 13 && f == 110) {
        statuses = 14;
        _fadeTransition("#stp11", "#stp12", startStep12, showNextButton);
    }
    // Step 12 → Step 13
    else if (statuses == 14 && f == 120) {
        statuses = 15;
        _fadeTransition("#stp12", "#stp13", startStep13, showNextButton);
    }
    // End of Experiment → Step 14
    else if (statuses == 15 && f == 130) {
        let stp13 = document.querySelector("#stp13");
        stp13.style.opacity = "0";
        setTimeout(function () { stp13.style.visibility = "hidden"; }, 300);
        // Navigate to Step 14 conclusion page
        setTimeout(function () { window.location.href = 'step14.html'; }, 400);
    }
}

// ── original start() — handles intro screens only, then delegates ─────────────
function start() {
    if (statuses == 0) {
        statuses = 1;
        startbutton.style.visibility = "hidden";
        document.querySelector("#expon").style.opacity = "100%";
        setTimeout(function () {
            document.querySelector("#titletext").innerHTML = "Welcome to the Experiment<br><span style='font-size: 0.8em; color: #FFD700;'>Quality Testing of Butter Oil (Ghee)</span>";
            document.querySelector("#titletext").style.fontSize = "6vw";
            document.querySelector("#titletext").style.opacity = "100%";
        }, 500);
        setTimeout(function () {
            startbutton.innerText = "NEXT";
            startbutton.style.visibility = "visible";
            startbutton.onclick = start;
            ins.innerText = "Click on NEXT button";
            statuses = 2;
        }, 5000);
    }
    else if (statuses == 2) {
        statuses = 2.5;
        startbutton.style.visibility = "hidden";
        document.querySelector("#expon").style.opacity = "0%";
        document.querySelector("#titletext").style.fontSize = "0.01vw";
        document.querySelector("#titletext").style.opacity = "0%";
        setTimeout(function () {
            document.querySelector("#expon").style.visibility = "hidden";
            document.querySelector("#titletext").style.visibility = "hidden";
            startStep0();
            // Show Next button immediately from Step 0
            showNextButton();
        }, 2000);
    }
    else {
        // Any other click on start delegates to goToNextStep
        goToNextStep();
    }
}

// ── Store titration readings for Step 14 ────────────────────────────────────
// Called at end of each titration step with the simulated reading
function storeTitrationValue(key, value) {
    sessionStorage.setItem('ghee_' + key, value);
}

// ── skip functions ────────────────────────────────────────────────────────────
function skipToStep2() {
    _hideIntro();
    stp1.style.opacity = "0";
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        f = 20; statuses = 4;
        let stp2 = document.querySelector("#stp2");
        stp2.style.visibility = "visible";
        stp2.style.opacity = "0";
        startStep2();
        startbutton.onclick = start;
        setTimeout(function () { stp2.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep3() {
    _hideIntro();
    stp1.style.opacity = "0";
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        document.querySelector("#stp2").style.visibility = "hidden";
        f = 30; statuses = 5;
        let toEl = document.querySelector("#stp3");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep3(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep4() {
    _hideIntro();
    stp1.style.opacity = "0";
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        ["#stp2","#stp3"].forEach(function(id){ document.querySelector(id).style.visibility = "hidden"; });
        f = 40; statuses = 6;
        let toEl = document.querySelector("#stp4");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep4(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep5() {
    _hideIntro();
    stp1.style.opacity = "0";
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        ["#stp2","#stp3","#stp4"].forEach(function(id){ document.querySelector(id).style.visibility = "hidden"; });
        f = 50; statuses = 7;
        let toEl = document.querySelector("#stp5");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep5(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep6() {
    _hideIntro();
    stp1.style.opacity = "0";
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        ["#stp2","#stp3","#stp4","#stp5"].forEach(function(id){ document.querySelector(id).style.visibility = "hidden"; });
        f = 60; statuses = 8;
        let toEl = document.querySelector("#stp6");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep6(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep7() {
    _hideIntro();
    stp1.style.opacity = "0";
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        ["#stp2","#stp3","#stp4","#stp5","#stp6"].forEach(function(id){ document.querySelector(id).style.visibility = "hidden"; });
        f = 70; statuses = 9;
        let toEl = document.querySelector("#stp7");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep7(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep8() {
    _hideIntro();
    stp1.style.opacity = "0";
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#skipToStep8").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        ["#stp2","#stp3","#stp4","#stp5","#stp6","#stp7"].forEach(function(id){ document.querySelector(id).style.visibility = "hidden"; });
        f = 80; statuses = 10;
        let toEl = document.querySelector("#stp8");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep8(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep9() {
    _hideIntro();
    stp1.style.opacity = "0";
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#skipToStep8").style.display = "none";
    document.querySelector("#skipToStep9").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        ["#stp2","#stp3","#stp4","#stp5","#stp6","#stp7","#stp8"].forEach(function(id){ document.querySelector(id).style.visibility = "hidden"; });
        f = 90; statuses = 11;
        let toEl = document.querySelector("#stp9");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep9(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep10() {
    _hideIntro();
    stp1.style.opacity = "0";
    document.querySelector("#skipToStep2").style.display = "none";
    document.querySelector("#skipToStep3").style.display = "none";
    document.querySelector("#skipToStep4").style.display = "none";
    document.querySelector("#skipToStep5").style.display = "none";
    document.querySelector("#skipToStep6").style.display = "none";
    document.querySelector("#skipToStep7").style.display = "none";
    document.querySelector("#skipToStep8").style.display = "none";
    document.querySelector("#skipToStep9").style.display = "none";
    document.querySelector("#skipToStep10").style.display = "none";
    document.querySelector("#backToStep1").style.display = "block";
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        ["#stp2","#stp3","#stp4","#stp5","#stp6","#stp7","#stp8","#stp9"].forEach(function(id){ document.querySelector(id).style.visibility = "hidden"; });
        f = 100; statuses = 12;
        let toEl = document.querySelector("#stp10");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep10(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep11() {
    _hideIntro();
    stp1.style.opacity = "0";
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
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        ["#stp2","#stp3","#stp4","#stp5","#stp6","#stp7","#stp8","#stp9","#stp10"].forEach(function(id){ document.querySelector(id).style.visibility = "hidden"; });
        f = 110; statuses = 13;
        let toEl = document.querySelector("#stp11");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep11(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep12() {
    _hideIntro();
    stp1.style.opacity = "0";
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
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        ["#stp2","#stp3","#stp4","#stp5","#stp6","#stp7","#stp8","#stp9","#stp10","#stp11"].forEach(function(id){ document.querySelector(id).style.visibility = "hidden"; });
        f = 110; statuses = 14;
        let toEl = document.querySelector("#stp12");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep12(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function skipToStep13() {
    _hideIntro();
    stp1.style.opacity = "0";
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
    setTimeout(function () {
        stp1.style.visibility = "hidden";
        for (let i = 2; i <= 12; i++) { let s = document.querySelector("#stp" + i); if (s) { s.style.visibility = "hidden"; s.style.opacity = "0"; } }
        f = 120; statuses = 15;
        let toEl = document.querySelector("#stp13");
        toEl.style.visibility = "visible"; toEl.style.opacity = "0";
        startStep13(); showNextButton();
        setTimeout(function () { toEl.style.opacity = "1"; }, 50);
    }, 300);
}

function backToStep1() {
    location.reload();
}
