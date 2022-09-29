
var ros;

window.initMap = initMap;

window.onload = function () {
    ros = new ROSLIB.Ros({
        url: "ws://" + robot_IP + ":10090"
    });

    AddROSStatusIndicator();
    createJoystick("joyDiv");

    gps_ui = document.getElementById("gps_info");
    gps_ui.innerHTML = "GPS not initalized";

    initVelocityPublisher();
    initGPSSubscriber();
    // initIMUSubscriber();

    gps_subscribtion();
    // imu_subscribtion();
}
