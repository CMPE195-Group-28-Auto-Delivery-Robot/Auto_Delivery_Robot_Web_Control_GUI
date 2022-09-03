var joystck_size = 120;
var streamingQuality = 30;

function createJoystick( joystic_id ) {
    // Check if joystick was aready created
    if (manager == null) {
        joystickContainer = document.getElementById(joystic_id);
        // joystck configuration, if you want to adjust joystick, refer to:
        // https://yoannmoinet.github.io/nipplejs/
        var options = {
            zone: joystickContainer,
            position: { left: 50 + '%', top: joystck_size/2 + 'px' },
            mode: 'static',
            size: joystck_size,
            color: '#0066ff',
            restJoystick: true
        };
        manager = nipplejs.create(options);
        // event listener for joystick move
        manager.on('move', function (evt, nipple) {
            // nipplejs returns direction is screen coordiantes
            // we need to rotate it, that dragging towards screen top will move robot forward
            var direction = nipple.angle.degree - 90;
            if (direction > 180) {
                direction = -(450 - nipple.angle.degree);
            }
            // convert angles to radians and scale linear and angular speed
            // adjust if youwant robot to drvie faster or slower
            robotSpeedRange = document.getElementById("robot-speed");
            var lin = Math.cos(direction / 57.29) * nipple.distance * 0.05 * (robotSpeedRange.value / 100);
            var ang = Math.sin(direction / 57.29) * nipple.distance * 0.05;
            // nipplejs is triggering events when joystic moves each pixel
            // we need delay between consecutive messege publications to 
            // prevent system from being flooded by messages
            // events triggered earlier than 50ms after last publication will be dropped 
            if (publishImmidiately) {
                publishImmidiately = false;
                moveAction(lin, ang);
                setTimeout(function () {
                    publishImmidiately = true;
                }, 50);
            }
        });
        // event litener for joystick release, always send stop message
        manager.on('end', function () {
            moveAction(0, 0);
        });
    }
}

function createCAM_with_stick(cam_id, stick_id, path){
    cam = document.getElementById(cam_id);
    cam.src = "http://" + robot_IP + ":8081/stream?topic="+path+"&type=mjpeg&quality="+streamingQuality;
    cam.onload = function () {
        // joystick and keyboard controls will be available only when video is correctly loaded
        createJoystick(stick_id);
    };
}

function createCAM( cam_id, path ){
    cam = document.getElementById(cam_id);
    cam.src = "http://" + robot_IP + ":8081/stream?topic="+path+"&type=mjpeg&quality="+streamingQuality;
}