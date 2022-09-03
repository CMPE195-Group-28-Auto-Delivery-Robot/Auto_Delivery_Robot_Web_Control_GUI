const robotIcon = "./asset/robotMarkPic.png";
const revDigit = 3;

var map;
var robotMaker;
var destMaker;

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
        if(!map.getBounds().contains(loc)){
            CenterOnMarker();
        }
    }
}

function SetGoalPoint(lat_click, lng_click){
    var goal_ui = document.getElementById("goal_info");
    if(!isNaN(lat_click)&&!isNaN(lng_click)){
        goal_ui.innerHTML = lat_click.toFixed(revDigit) + ", " + lng_click.toFixed(revDigit);
        var loc = {lat: lat_click, lng: lng_click};
        if(destMaker == undefined){
            destMaker = new google.maps.Marker({
                position: loc,
                map: map,
            });
            initDestinationPublisher();
        }else{
            destMaker.setPosition(loc);
        }
    }else{
        goal_ui.innerHTML = "Not Set";
    }
}

function CenterOnMarker(){
    var robot_location = robotMaker.getPosition();
    if(destMaker == undefined){
        map.setCenter(robot_location);
    }else{
        var dst_location = destMaker.getPosition();
        var mapbounds = new google.maps.LatLngBounds();

        mapbounds.extend(robot_location);
        mapbounds.extend(dst_location);
        
        map.fitBounds(mapbounds);
    }
}

function SendDestination(){
    if(destMaker == undefined){
        alert("Destination Undefined.");
    }else{
        var dst_location = destMaker.getPosition();
        pubDestination(dst_location.lat(), dst_location.lng());
    }
    CenterOnMarker();
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