/**
 * Step 14 — Observations & Calculations
 *
 * T1 = NaOH for Flask S (RM)  — Step 10
 * T2 = NaOH for Flask B (RM)  — Step 11
 * T3 = NaOH for Flask S (PV)  — Step 12
 * T4 = NaOH for Flask B (PV)  — Step 13
 *
 * The experiment uses fixed simulated titration values.
 * These are stored in sessionStorage by the main experiment,
 * or fall back to the standard reference values below.
 */

const DEFAULTS = { t1: 21.0, t2: 19.9, t3: 7.5, t4: 6.4 };

// Standard reference ranges for pure ghee
const STANDARDS = {
    rm: { min: 17, max: 35, label: "17 – 35 mL" },
    pv: { min: 0.5, max: 1.5, label: "0.5 – 1.5 mL" }
};

let expValues = {};
let rmCorrect = false;
let pvCorrect = false;

// ── Load values from sessionStorage (set by main experiment) or use defaults ──
function loadExpValues() {
    const keys = ['t1', 't2', 't3', 't4'];
    keys.forEach(k => {
        const stored = sessionStorage.getItem('ghee_' + k);
        expValues[k] = stored !== null ? parseFloat(stored) : DEFAULTS[k];
    });

    // Display in observation table
    keys.forEach(k => {
        const el = document.getElementById('disp-' + k);
        if (el) {
            el.textContent = expValues[k].toFixed(1) + ' mL';
            el.classList.add('loaded');
        }
    });
}

// ── Helpers ──
function getCorrectRM() { return parseFloat((expValues.t1 - expValues.t2).toFixed(2)); }
function getCorrectPV() { return parseFloat((expValues.t3 - expValues.t4).toFixed(2)); }

function showFeedback(id, type, html) {
    const el = document.getElementById(id);
    el.className = 'feedback ' + type;
    el.innerHTML = html;
}

function checkBothDone() {
    if (rmCorrect && pvCorrect) showConclusion();
}

// ── RM: Check ──
function checkRM() {
    const val = parseFloat(document.getElementById('rm-input').value);
    if (isNaN(val)) { alert('Please enter a numeric RM value.'); return; }
    const correct = getCorrectRM();
    if (Math.abs(val - correct) <= 0.05) {
        rmCorrect = true;
        showFeedback('rm-feedback', 'correct',
            `<div class="fb-title">Correct</div>
             <p>Your RM Value = <strong>${val.toFixed(2)} mL</strong> is correct.</p>`
        );
        checkBothDone();
    } else {
        showFeedback('rm-feedback', 'wrong',
            `<div class="fb-title">Incorrect</div>
             <p>Your answer: <strong>${val.toFixed(2)} mL</strong></p>
             <p>Hint: Use the formula <em>RM = T₁ − T₂</em>. Click <strong>Formula</strong> for the full solution.</p>`
        );
    }
}

// ── RM: Formula ──
function showRMFormula() {
    const { t1, t2 } = expValues;
    const ans = getCorrectRM();
    showFeedback('rm-feedback', 'formula',
        `<div class="fb-title">Formula & Calculation</div>
         <p><strong>RM Value = T₁ − T₂</strong></p>
         <p>Where:</p>
         <ul style="margin:6px 0 6px 18px;">
           <li>T₁ = Volume of 0.1N NaOH for Flask S (RM) = <strong>${t1.toFixed(1)} mL</strong></li>
           <li>T₂ = Volume of 0.1N NaOH for Flask B (RM) = <strong>${t2.toFixed(1)} mL</strong></li>
         </ul>
         <p>Calculation:</p>
         <p><span class="calc-line">RM = ${t1.toFixed(1)} − ${t2.toFixed(1)} = <strong>${ans.toFixed(2)} mL</strong></span></p>`
    );
}

// ── RM: Result ──
function showRMResult() {
    const { t1, t2 } = expValues;
    const ans = getCorrectRM();
    const inRange = ans >= STANDARDS.rm.min && ans <= STANDARDS.rm.max;
    rmCorrect = true;
    showFeedback('rm-feedback', 'result',
        `<div class="fb-title">Complete Solution</div>
         <p><strong>RM Value = T₁ − T₂ = ${t1.toFixed(1)} − ${t2.toFixed(1)} = ${ans.toFixed(2)} mL</strong></p>
         <hr style="margin:10px 0;border:0;border-top:1px solid #ddd;">
         <p><strong>Conclusion:</strong> The RM value of <strong>${ans.toFixed(2)} mL</strong> is 
         ${inRange
            ? `<span style="color:#15803d;font-weight:700;">within</span> the standard range (${STANDARDS.rm.label}) for pure ghee, indicating <strong>no adulteration</strong> with non-volatile fats.`
            : `<span style="color:#b91c1c;font-weight:700;">outside</span> the standard range (${STANDARDS.rm.label}) for pure ghee, which may indicate <strong>adulteration</strong>.`
         }</p>`
    );
    checkBothDone();
}

// ── PV: Check ──
function checkPV() {
    const val = parseFloat(document.getElementById('pv-input').value);
    if (isNaN(val)) { alert('Please enter a numeric PV value.'); return; }
    const correct = getCorrectPV();
    if (Math.abs(val - correct) <= 0.05) {
        pvCorrect = true;
        showFeedback('pv-feedback', 'correct',
            `<div class="fb-title">Correct</div>
             <p>Your PV Value = <strong>${val.toFixed(2)} mL</strong> is correct.</p>`
        );
        checkBothDone();
    } else {
        showFeedback('pv-feedback', 'wrong',
            `<div class="fb-title">Incorrect</div>
             <p>Your answer: <strong>${val.toFixed(2)} mL</strong></p>
             <p>Hint: Use the formula <em>PV = T₃ − T₄</em>. Click <strong>Formula</strong> for the full solution.</p>`
        );
    }
}

// ── PV: Formula ──
function showPVFormula() {
    const { t3, t4 } = expValues;
    const ans = getCorrectPV();
    showFeedback('pv-feedback', 'formula',
        `<div class="fb-title">Formula & Calculation</div>
         <p><strong>PV Value = T₃ − T₄</strong></p>
         <p>Where:</p>
         <ul style="margin:6px 0 6px 18px;">
           <li>T₃ = Volume of 0.1N NaOH for Flask S (PV) = <strong>${t3.toFixed(1)} mL</strong></li>
           <li>T₄ = Volume of 0.1N NaOH for Flask B (PV) = <strong>${t4.toFixed(1)} mL</strong></li>
         </ul>
         <p>Calculation:</p>
         <p><span class="calc-line">PV = ${t3.toFixed(1)} − ${t4.toFixed(1)} = <strong>${ans.toFixed(2)} mL</strong></span></p>`
    );
}

// ── PV: Result ──
function showPVResult() {
    const { t3, t4 } = expValues;
    const ans = getCorrectPV();
    const inRange = ans >= STANDARDS.pv.min && ans <= STANDARDS.pv.max;
    pvCorrect = true;
    showFeedback('pv-feedback', 'result',
        `<div class="fb-title">Complete Solution</div>
         <p><strong>PV Value = T₃ − T₄ = ${t3.toFixed(1)} − ${t4.toFixed(1)} = ${ans.toFixed(2)} mL</strong></p>
         <hr style="margin:10px 0;border:0;border-top:1px solid #ddd;">
         <p><strong>Conclusion:</strong> The PV value of <strong>${ans.toFixed(2)} mL</strong> is 
         ${inRange
            ? `<span style="color:#15803d;font-weight:700;">within</span> the standard range (${STANDARDS.pv.label}) for pure ghee, indicating <strong>no coconut or palm kernel oil adulteration</strong>.`
            : `<span style="color:#b91c1c;font-weight:700;">outside</span> the standard range (${STANDARDS.pv.label}) for pure ghee, which may indicate <strong>adulteration with lauric acid-rich fats</strong>.`
         }</p>`
    );
    checkBothDone();
}

// ── Final Conclusion ──
function showConclusion() {
    const rm = getCorrectRM();
    const pv = getCorrectPV();
    const rmOk = rm >= STANDARDS.rm.min && rm <= STANDARDS.rm.max;
    const pvOk = pv >= STANDARDS.pv.min && pv <= STANDARDS.pv.max;
    const bothOk = rmOk && pvOk;

    const section = document.getElementById('conclusion-section');
    const body = document.getElementById('conclusion-body');

    body.innerHTML = `
        <div class="conc-block">
            <h3>Reicher–Meissl Value</h3>
            <div class="value-badge">${rm.toFixed(2)} mL</div>
            <p>Standard range: <strong>${STANDARDS.rm.label}</strong></p>
            <p style="margin-top:6px;">${rmOk
                ? 'Within standard range — indicates presence of water-soluble volatile fatty acids typical of pure ghee.'
                : 'Outside standard range — may indicate adulteration.'
            }</p>
        </div>
        <div class="conc-block">
            <h3>Polenske Value</h3>
            <div class="value-badge">${pv.toFixed(2)} mL</div>
            <p>Standard range: <strong>${STANDARDS.pv.label}</strong></p>
            <p style="margin-top:6px;">${pvOk
                ? 'Within standard range — indicates absence of coconut or palm kernel oil adulteration.'
                : 'Outside standard range — may indicate adulteration with lauric acid-rich fats.'
            }</p>
        </div>
        <div class="conc-block standard">
            <h3>Overall Conclusion</h3>
            <p>${bothOk
                ? 'Both the RM value (<strong>' + rm.toFixed(2) + ' mL</strong>) and PV value (<strong>' + pv.toFixed(2) + ' mL</strong>) fall within the standard ranges for pure Butter Oil (Ghee). The sample is <strong>pure and unadulterated</strong>. The experiment has been successfully completed.'
                : 'One or more values fall outside the standard ranges. The sample may be <strong>adulterated</strong>. Further analysis is recommended.'
            }</p>
        </div>`;

    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Init ──
document.addEventListener('DOMContentLoaded', loadExpValues);
