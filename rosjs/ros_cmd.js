var twist;
var cmdVel;
var publishImmidiately = true;
var manager;
var teleop;

function moveAction(linear, angular) {
    if (linear !== undefined && angular !== undefined) {
        twist.linear.x = linear;
        twist.angular.z = angular;
    } else {
        twist.linear.x = 0;
        twist.angular.z = 0;
    }
    cmdVel.publish(twist);
}

function createJoystick( joystic_id ) {

    joystickContainer = new JoyStick(joystic_id, {}, function(stickData) {
        robotSpeedRange = document.getElementById("robot-speed");
        var lin = (stickData.y / 110) * 3 * (robotSpeedRange.value / 100);
        var ang = (stickData.x / 110) * 3 * -1 ;
        // console.log(stickData.x+", "+ ang );
        if (publishImmidiately) {
            publishImmidiately = false;
            moveAction(lin, ang);
            setTimeout(function () {
                publishImmidiately = true;
            }, 50);
        }
    });

    // var options = {
    //     zone: joystickContainer,
    //     position: { left: 50 + '%', top: joystck_size/2 + 'px' },
    //     mode: 'static',
    //     size: joystck_size,
    //     color: '#0066ff',
    //     restJoystick: true
    // };
    // manager = nipplejs.create(options);
    // // event listener for joystick move
    // manager.on('move', function (evt, nipple) {
    //     // nipplejs returns direction is screen coordiantes
    //     // we need to rotate it, that dragging towards screen top will move robot forward
    //     var direction = nipple.angle.degree - 90;
    //     if (direction > 180) {
    //         direction = -(450 - nipple.angle.degree);
    //     }
    //     // convert angles to radians and scale linear and angular speed
    //     // adjust if youwant robot to drvie faster or slower
    //     robotSpeedRange = document.getElementById("robot-speed");
    //     var lin = Math.cos(direction / 57.29) * nipple.distance * 0.05 * (robotSpeedRange.value / 100);
    //     var ang = Math.sin(direction / 57.29) * nipple.distance * 0.05;
    //     // nipplejs is triggering events when joystic moves each pixel
    //     // we need delay between consecutive messege publications to 
    //     // prevent system from being flooded by messages
    //     // events triggered earlier than 50ms after last publication will be dropped 
    //     if (publishImmidiately) {
    //         publishImmidiately = false;
    //         moveAction(lin, ang);
    //         setTimeout(function () {
    //             publishImmidiately = true;
    //         }, 50);
    //     }
    // });
    // // event litener for joystick release, always send stop message
    // manager.on('end', function () {
    //     moveAction(0, 0);
    // });
}

function initVelocityPublisher() {
    // Init message with zero values.
    twist = new ROSLIB.Message({
        linear: {
            x: 0,
            y: 0,
            z: 0
        },
        angular: {
            x: 0,
            y: 0,
            z: 0
        }
    });
    // Init topic object
    cmdVel = new ROSLIB.Topic({
        ros: ros,
        name: '/' + robot_name + '/cmd_vel',
        messageType: 'geometry_msgs/Twist'
    });
    // Register publisher within ROS system
    cmdVel.advertise();
}

function initTeleopKeyboard() {
    // Use w, s, a, d keys to drive your robot

    // Check if keyboard controller was aready created
    if (teleop == null) {
        // Initialize the teleop.
        teleop = new KEYBOARDTELEOP.Teleop({
            ros: ros,
            topic: '/' + robot_name + '/cmd_vel'
        });
    }

    // Add event listener for slider moves
    robotSpeedRange = document.getElementById("robot-speed");
    robotSpeedRange.oninput = function () {
        teleop.scale = robotSpeedRange.value / 100
    }
}