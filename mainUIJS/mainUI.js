
var ros;

window.onload = function () {
    // // Init handle for rosbridge_websocket
    ros = new ROSLIB.Ros({
        url: "ws://" + robot_IP + ":10090"
    });
    AddROSStatusIndicator();
    initVelocityPublisher();
    // get handle for video placeholder
    createCAM("rgb_cam","/" + robot_name + "/zed_node/rgb_raw/image_raw_color");
    createCAM('confidence_cam',"/" + robot_name + "/zed_node/confidence/confidence_map");
    createJoystick("joystick");
}