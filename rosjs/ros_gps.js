var gpsfix;
var navSatFixMsg;
var destination_gps_pub;

function initGPSSubscriber(){
    // Init topic object
    gpsfix = new ROSLIB.Topic({
        ros: ros,
        name: '/' + robot_name + '/fix',
        messageType: 'sensor_msgs/NavSatFix'
    });
}

function initDestinationPublisher() {
    // Init message with zero values.
    navSatFixMsg = new ROSLIB.Message({
        header: {
            seq: 0,
            stamp: 0,
            frame_id: "/gps",
        },
        status: {
            status: 0,
            service: 1,
        },
        latitude: 0.0,
        longitude: 0.0,
        altitude: 0,
        position_covariance: [0,0,0,0,0,0,0,0,0],
        position_covariance_type: 0,
    });
    // Init topic object
    destination_gps_pub = new ROSLIB.Topic({
        ros: ros,
        name: '/' + robot_name + '/destination_gps',
        messageType: 'sensor_msgs/NavSatFix'
    });
    // Register publisher within ROS system
    destination_gps_pub.advertise();
}

function gps_subscribtion(){
    gpsfix.subscribe(function(message) {
        // gpsfix.unsubscribe();
        gps_ui = document.getElementById("gps_info");
        if(!(message.latitude == null)&&!(message.longitude == null)){
            gps_ui.innerHTML = message.latitude.toFixed(revDigit) + ", " + message.longitude.toFixed(revDigit) + ", " + message.altitude.toFixed(revDigit);
            updateRobotMaker(message.latitude,message.longitude);
        }else{
            gps_ui.innerHTML = "GPS Signal Lost !!!!!";
        }
        // console.log('Received message on ' + gpsfix.name + ': ' + message.latitude + "," + message.longitude + "," + message.altitude);        
    });
}

function pubDestination(lat_val, lng_val){
    if (lat_val !== undefined && lat_val !== undefined) {
        navSatFixMsg.latitude = lat_val;
        navSatFixMsg.longitude = lng_val;
    } else {
        navSatFixMsg.latitude = 0;
        navSatFixMsg.longitude = 0;
    }
    destination_gps_pub.publish(navSatFixMsg);
}