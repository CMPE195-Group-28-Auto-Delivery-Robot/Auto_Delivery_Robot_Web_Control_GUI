
var ros;

window.onload = function () {

    // // Init handle for rosbridge_websocket
    ros = new ROSLIB.Ros({
        url: "ws://" + robot_IP + ":10090"
    });

    initVelocityPublisher();
    // get handle for video placeholder
    createCAM_with_stick("rgb_cam","joystick","/zed2/zed_node/rgb_raw/image_raw_color");
    createCAM('depth_cam',"/zed2/zed_node/confidence/confidence_map");
}
