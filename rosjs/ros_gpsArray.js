var destList_array;
var destList_gps_pub;

function initDestListPublisher() {
    // Init message with zero values.
    destList_array = new ROSLIB.Message({
        dest_list: [{lat: 0.0, lng:0.0}],
    });
    // Init topic object
    destList_gps_pub = new ROSLIB.Topic({
        ros: ros,
        name: '/' + robot_name + '/destList_array',
        messageType: 'robot_msgs/dest_list_msg'
    });
    // Register publisher within ROS system
    destList_gps_pub.advertise();
}

function pubDestList(){
    destList_array.dest_list = stepArray;
    destList_gps_pub.publish(destList_array);
}