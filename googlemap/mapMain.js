const robotIcon = "./asset/robotMarkPic.png";

var map;
var robotMaker;

function initRobotMaker(lat_val, lng_val) {
    const loc = { lat: lat_val, lng: lng_val};
    if(!isNaN(lat_val)&&!isNaN(lng_val)){
        robotMaker = new google.maps.Marker({
            position: loc,
            icon: robotIcon,
            map: map,
        });
    }
}

function updateRobotMaker(lat_val, lng_val) {
    const loc = { lat: lat_val, lng: lng_val};
    if(!isNaN(lat_val)&&!isNaN(lng_val)){
        robotMaker.setPosition(loc);
        map.setCenter(loc);
    }
}

function displayGoal(lat, lng){
    var goal_ui = document.getElementById("goal_info");
    goal_ui.innerHTML = "GOAL GPS: " + lat.toFixed(5) + ", " + lng.toFixed(5);
}

function initMap() {
    myLatlng = { lat: 37.337, lng: -121.882 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatlng,
        zoom: 15,
        disableDefaultUI: true,
    });

    initRobotMaker(myLatlng.lat, myLatlng.lng);

    displayGoal(NaN, NaN);

    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        displayGoal(mapsMouseEvent.latLng.lat(),mapsMouseEvent.latLng.lng());
    });
}