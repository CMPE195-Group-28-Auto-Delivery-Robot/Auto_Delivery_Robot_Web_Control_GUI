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
    }
}

function SetGoalPoint(lat, lng){
    var goal_ui = document.getElementById("goal_info");
    if(!isNaN(lat)&&!isNaN(lng)){
        goal_ui.innerHTML = lat.toFixed(5) + ", " + lng.toFixed(5);
    }else{
        goal_ui.innerHTML = "Not Set";
    }
}

function CenterOnMarker(){
    map.setCenter(robotMaker.getPosition());
}

function initMap() {
    myLatlng = { lat: 37.337, lng: -121.882 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatlng,
        zoom: 15,
        disableDefaultUI: true,
    });

    initRobotMaker(myLatlng.lat, myLatlng.lng);

    SetGoalPoint(NaN, NaN);

    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        SetGoalPoint(mapsMouseEvent.latLng.lat(),mapsMouseEvent.latLng.lng());
    });
}