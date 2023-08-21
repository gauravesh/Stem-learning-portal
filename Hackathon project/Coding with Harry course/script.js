const startButton = document.getElementById('startButton');
const cameraFeed = document.getElementById('cameraFeed');
const iframeElement = document.getElementById('iframeElement');

// Check for user media support
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    startButton.addEventListener('click', () => {
        iframeElement.style.display = 'block';
        // Request access to the user's camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                cameraFeed.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });
    });
} else {
    console.error('getUserMedia is not supported');
}
