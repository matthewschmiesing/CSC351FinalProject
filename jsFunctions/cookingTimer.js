window.addEventListener("DOMContentLoaded", function () {
    let countDownDate;
    let timer;
    let isPaused = false;
    let remainingTime = 0;

    const alarm = document.getElementById("alarmSound");

    document.getElementById("startButton").addEventListener("click", function() {
        const hours = parseInt(document.getElementById("hoursInput").value) || 0;
        const minutes = parseInt(document.getElementById("minutesInput").value) || 0;

        if (hours === 0 && minutes === 0) {
            alert("Please enter a valid time duration.");
            return;
        }

        const totalTime = (hours * 60 + minutes) * 60 * 1000; // Convert to milliseconds
        countDownDate = new Date().getTime() + totalTime;

        startCountdown();
        document.getElementById("pauseButton").disabled = false;
    });

    document.getElementById("pauseButton").addEventListener("click", function() {
        if (isPaused) {
            countDownDate = new Date().getTime() + remainingTime;
            startCountdown();
            this.textContent = "Pause";
        } else {
            clearInterval(timer);
            remainingTime = countDownDate - new Date().getTime();
            this.textContent = "Resume";
        }
        isPaused = !isPaused;
    });

    document.getElementById("resetButton").addEventListener("click", function() {
        clearInterval(timer);
        document.getElementById("timer").textContent = "00h 00m 00s";
        document.getElementById("pauseButton").textContent = "Pause";
        document.getElementById("pauseButton").disabled = true;
        isPaused = false;
        alarm.pause();
        alarm.currentTime = 0; // Reset alarm if it was playing
    });

    function startCountdown() {
        clearInterval(timer);
        timer = setInterval(function() {
            let now = new Date().getTime();
            let distance = countDownDate - now;

            if (distance <= 0) {
                clearInterval(timer);
                document.getElementById("timer").textContent = "DONE";
                alarm.play();
                return;
            }

            let hours = Math.floor(distance / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("timer").textContent =
                `${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }
});

