const cameraFeed = document.getElementById("cameraFeed");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const iframeElement = document.getElementById("iframeElement");

let mediaRecorder;
let recordedChunks = [];
let stream;

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraFeed.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const videoUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = videoUrl;
      a.download = "recorded-video.webm";
      a.textContent = "Download Recorded Video";
      document.body.appendChild(a);
    };
    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
  } catch (error) {
    console.error("Error accessing webcam:", error);
  }
}

function stopCamera() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    stream.getTracks().forEach((track) => track.stop());
    cameraFeed.srcObject = null;
    startButton.disabled = false;
    stopButton.disabled = true;
  }
}

startButton.addEventListener("click", startCamera);
stopButton.addEventListener("click", stopCamera);
