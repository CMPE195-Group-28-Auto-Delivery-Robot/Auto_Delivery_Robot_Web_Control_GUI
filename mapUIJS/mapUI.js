
var ros;


function AddButtonOnMap(){
    // Create the control.
    const centerControlDiv = document.createElement('div');
    
    const centerControl = createButtonOnMap(map, "Center On Robot", "Center the map on robot", CenterOnMarker);
    const sendControl = createButtonOnMap(map, "Send Destination", "Send the destination through ROS", SendDestination);
    
    // Append the control to the DIV.
    centerControlDiv.appendChild(centerControl);
    centerControlDiv.appendChild(sendControl);
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
}

window.initMap = initMap;

window.onload = function () {
    // // Init handle for rosbridge_websocket

    ros = new ROSLIB.Ros({
        url: "ws://" + robot_IP + ":10090"
    });

    AddButtonOnMap();

    gps_ui = document.getElementById("gps_info");
    gps_ui.innerHTML = "GPS not initalized";

    initGPSSubscriber();
    // initIMUSubscriber();

    gps_subscribtion();
    // imu_subscribtion();
}
