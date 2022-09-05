var streamingQuality = 30;

function createCAM( cam_id, path ){
    cam = document.getElementById(cam_id);
    cam.src = "http://" + robot_IP + ":8081/stream?topic="+path+"&type=mjpeg&quality="+streamingQuality;
}