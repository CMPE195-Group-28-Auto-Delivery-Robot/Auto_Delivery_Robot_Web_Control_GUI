var twist;
var cmdVel;
var publishImmidiately = true;
var manager;
var teleop;
var gamepad;
var gamepadConnected = false;
var velInited = false;

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
        var lin = (stickData.y / 110) * 10 * (robotSpeedRange.value / 100);
        var ang = (stickData.x / 110) * 3 * -1 ;
        if (publishImmidiately) {
            publishImmidiately = false;
            moveAction(lin, ang);
            setTimeout(function () {
                publishImmidiately = true;
            }, 50);
        }
    });
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
    velInited = true;
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

function gamepadPoll() {
    gamepad = navigator.getGamepads()[0];
    gamepad_x = Math.floor(gamepad.axes[0]*100);
    gamepad_y = Math.floor(gamepad.axes[1]*-1*100);
    gamepad_w = (gamepad.axes[6]*-1+1)/2*100;
    var lin = (gamepad_y / 100) * 3 * (gamepad_w / 100);
    var ang = (gamepad_x / 100) * 3 * -1 ;
    if(gamepad.buttons[0].value == 1){
        lin = 0;
    }
    if(velInited){
        moveAction(lin, ang);
        // console.log(lin,ang);
    }
}
  
function gamepadDis() {
    return gamepadConnected;
}

window.addEventListener("gamepadconnected", (event) => {
    console.log("A gamepad connected:");
    console.log(event.gamepad);
    gamepads = navigator.getGamepads();
    // console.log(gamepads);
    gamepadConnected = 1;
    const pollForNewUser = poll({
        fn: gamepadPoll,
        disable: gamepadDis,
        interval: 100,
    })
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("A gamepad disconnected:");
    // console.log(event.gamepad);
    gamepadConnected = 0;
});