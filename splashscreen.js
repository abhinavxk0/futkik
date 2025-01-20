document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');

    // Display splash screen for 3 seconds
    setTimeout(() => {
        splash.classList.add('hidden'); // Add the 'hidden' class for smooth fade-out

        setTimeout(() => {
            // Redirect to another HTML document
            window.location.href = "index.html"; // Adjust path as needed
        }, 1000); // Matches fade-out duration
    }, 1500); // Display splash for 3 seconds
});