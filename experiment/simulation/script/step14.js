/**
 * Step 14: Observations & Calculations Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    const calculateBtn = document.getElementById('calculateBtn');
    const resultSection = document.getElementById('resultSection');
    const resultFeedback = document.getElementById('resultFeedback');
    const finalConclusion = document.getElementById('finalConclusion');
    const playAudioBtn = document.getElementById('playAudioBtn');

    // Expected Values
    const EXPECTED_RM = 1.10;
    const EXPECTED_PV = 1.10;
    
    // Audio State
    let isSpeaking = false;

    // --- Calculation Logic ---
    calculateBtn.addEventListener('click', () => {
        // Get Inputs
        const t1 = parseFloat(document.getElementById('t1').value);
        const t2 = parseFloat(document.getElementById('t2').value);
        const t3 = parseFloat(document.getElementById('t3').value);
        const t4 = parseFloat(document.getElementById('t4').value);

        if (isNaN(t1) || isNaN(t2) || isNaN(t3) || isNaN(t4)) {
            alert("Please enter valid numbers for all fields.");
            return;
        }

        // Calculate
        const rmValue = t1 - t2;
        const pvValue = t3 - t4;

        // Round for display and comparison (2 decimal places)
        const rmDisplay = rmValue.toFixed(2);
        const pvDisplay = pvValue.toFixed(2);

        // Verification (Allowance for small floating point errors, though we use decimals)
        // Here we require exact match to 1.10 as per prompt inputs 21.0-19.9
        const isCorrect = (Math.abs(rmValue - EXPECTED_RM) < 0.05) && (Math.abs(pvValue - EXPECTED_PV) < 0.05);

        // UI Update
        resultSection.classList.remove('hidden');
        resultSection.style.display = 'block'; // Ensure display if it was none

        // Clear previous classes
        resultFeedback.className = 'feedback-box';
        finalConclusion.className = 'conclusion-box hidden';

        if (isCorrect) {
            // Correct Answer UI
            resultFeedback.classList.add('correct');
            resultFeedback.innerHTML = `
                <h3>🎉 Correct Answer!</h3>
                <p><strong>RM Value = ${rmDisplay}</strong> &nbsp;|&nbsp; <strong>PV Value = ${pvDisplay}</strong></p>
                <p>Your calculations match the experimental data beautifully.</p>
            `;

            // Show Conclusion
            setTimeout(() => {
                finalConclusion.classList.remove('hidden');
                finalConclusion.classList.add('conclusion-correct');
                finalConclusion.innerHTML = `
                    <h3>🌟 Final Conclusion</h3>
                    <p>Congratulations! You have successfully calculated the RM and PV values.</p>
                    <p>This concludes the determination of volatile fatty acids in Ghee.</p>
                `;
            }, 600); // Slight delay for flow

        } else {
            // Wrong Answer UI
            resultFeedback.classList.add('wrong');
            resultFeedback.innerHTML = `
                <h3>❌ Wrong Answer</h3>
                <div class="detailed-feedback">
                    <p><strong>Your Result:</strong> RM = ${rmDisplay}, PV = ${pvDisplay}</p>
                    <p><strong>Correct Result:</strong> RM = ${EXPECTED_RM.toFixed(2)}, PV = ${EXPECTED_PV.toFixed(2)}</p>
                    <hr>
                    <p><strong>Formulas:</strong></p>
                    <p class="calc-step">RM = T1 - T2 = ${t1} - ${t2} = ${(t1-t2).toFixed(2)}</p>
                    <p class="calc-step">PV = T3 - T4 = ${t3} - ${t4} = ${(t3-t4).toFixed(2)}</p>
                </div>
            `;

            // Show Conclusion (Wrong variant)
            setTimeout(() => {
                finalConclusion.classList.remove('hidden');
                finalConclusion.classList.add('wrong'); // Reuse wrong style for consistency
                finalConclusion.innerHTML = `
                    <h3>⚠️ Calculation Error</h3>
                    <p>Your calculation did not match the expected values.</p>
                    <p>Please review the formulas and observation values above and try again.</p>
                `;
            }, 600);
        }
    });


    // --- Audio Logic ---
    playAudioBtn.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
            if (isSpeaking) {
                window.speechSynthesis.cancel();
                isSpeaking = false;
                playAudioBtn.innerText = "🔊 Play Explanation";
            } else {
                const text = "In this step, we calculate the Reicher–Meissl and Polenske values using the volumes of 0.1 Normal Sodium Hydroxide used during titration. RM is obtained by subtracting the blank reading from the sample reading for the water-insoluble volatile acids. PV is similarly calculated for steam-volatile fatty acids. Your final values appear below.";
                const utterance = new SpeechSynthesisUtterance(text);
                
                // Voice selection preferences (same as audio-system.js)
                const voices = window.speechSynthesis.getVoices();
                const preferredVoice = voices.find(voice => 
                    voice.name.includes('Google English (India)') || 
                    voice.name.includes('Microsoft Heera') ||
                    voice.name.includes('Female')
                );
                if (preferredVoice) utterance.voice = preferredVoice;

                utterance.rate = 0.9;
                utterance.onend = () => {
                    isSpeaking = false;
                    playAudioBtn.innerText = "🔊 Play Explanation";
                };

                window.speechSynthesis.speak(utterance);
                isSpeaking = true;
                playAudioBtn.innerText = "⏹ Stop Audio";
            }
        } else {
            alert("Sorry, your browser does not support text-to-speech.");
        }
    });

});
