var gpsfix;

function initGPSSubscriber(){
    // Init topic object
    gpsfix = new ROSLIB.Topic({
        ros: ros,
        name: '/' + robot_name + '/fix',
        messageType: 'sensor_msgs/NavSatFix'
    });
}

function gps_subscribtion(){
    gpsfix.subscribe(function(message) {
        // gpsfix.unsubscribe();
        gps_ui = document.getElementById("gps_info");
        if(!(message.latitude == null)&&!(message.longitude == null)){
            gps_ui.innerHTML = "GPS INFO: " + message.latitude.toFixed(5) + ", " + message.longitude.toFixed(5) + ", " + message.altitude.toFixed(5);
            updateRobotMaker(message.latitude,message.longitude);
        }else{
            gps_ui.innerHTML = "GPS Signal Lost !!!!!";
        }
        // console.log('Received message on ' + gpsfix.name + ': ' + message.latitude + "," + message.longitude + "," + message.altitude);        
    });
}