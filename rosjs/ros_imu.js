var zedimu;

function initIMUSubscriber(){
    // Init topic object
    zedimu = new ROSLIB.Topic({
        ros: ros,
        name: '/zed2/zed_node/imu/data',
        messageType: 'sensor_msgs/Imu'
    });
}

function imu_subscribtion(){
    zedimu.subscribe(function(message) {
        // gpsfix.unsubscribe();
        imu_ui = document.getElementById("imu_info");
        imu_ui.innerHTML = "IMU INFO: " + message.linear_acceleration.x.toFixed(5) + ", " + message.linear_acceleration.y.toFixed(5) + ", " + message.linear_acceleration.z.toFixed(5);
    });
}