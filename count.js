function startCountdown(minutes) {
    // Convert minutes to milliseconds
    let timeLeft = minutes * 60 * 1000;
    const interval = 1000; // Update every second

    const countdown = setInterval(() => {
        // Calculate minutes and seconds
        const minutesLeft = Math.floor(timeLeft / (60 * 1000));
        const secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);

        // Format time for display
        const formattedTime = `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
        
        // Clear previous line and show countdown
        console.clear();
        console.log(`Time remaining: ${formattedTime}`);

        // Decrease time left
        timeLeft -= interval;

        // Check if countdown is finished
        if (timeLeft < 0) {
            clearInterval(countdown);
            console.log('Countdown finished!');
        }
    }, interval);
}

// Start a 5-minute countdown
startCountdown(5);