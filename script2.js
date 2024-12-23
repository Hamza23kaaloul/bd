let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default mini-infobar from appearing
    e.preventDefault();

    // Save the event for later
    deferredPrompt = e;

    // Show the install button
    const installBtn = document.getElementById('installBtn');
    installBtn.style.display = 'block';

    // Add a click event to trigger the installation
    installBtn.addEventListener('click', async () => {
        installBtn.style.display = 'none'; // Hide the button
        deferredPrompt.prompt(); // Show the install prompt

        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null; // Reset the prompt
    });
});
