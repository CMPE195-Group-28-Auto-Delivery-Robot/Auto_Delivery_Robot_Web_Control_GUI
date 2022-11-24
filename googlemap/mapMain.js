const robotIcon = "./asset/robotMarkPic.png";
const revDigit = 3;

var map;
var robotMaker;
var destMaker;
var lat;
var lng;
var directionsService;
var directionsRenderer;
var directionSteps;

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
        calcRoute(robotMaker.getPosition(), dst_location);
        pubDestination(dst_location.lat(), dst_location.lng());
    }
    CenterOnMarker();
}

function createButtonOnMap(gmap, text, title, callback_func) {
    const controlButton = document.createElement("button");
  
    // Set CSS for the control.
    controlButton.style.backgroundColor = "#fff";
    controlButton.style.border = "2px solid #fff";
    controlButton.style.borderRadius = "3px";
    controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlButton.style.color = "rgb(25,25,25)";
    controlButton.style.cursor = "pointer";
    controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
    controlButton.style.fontSize = "16px";
    controlButton.style.lineHeight = "38px";
    controlButton.style.margin = "8px 0 22px";
    controlButton.style.padding = "0 5px";
    controlButton.style.textAlign = "center";
  
    controlButton.textContent = text;
    controlButton.title = title; // "Click to recenter the map";
    controlButton.type = "button";
  
    // Setup the click event listeners: simply set the map to Chicago.
    controlButton.addEventListener("click", () => {
        callback_func();
    });
  
    return controlButton;
}

function calcRoute(self_loc, dest_loc) {
    var selectedMode = "WALKING";
    var request = {
        origin: self_loc,
        destination: dest_loc,
        provideRouteAlternatives: false,
        // Note that JavaScript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
    };
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(response);
      }
    });
    directionSteps = directionsService.routes;
  }

function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    myLatlng = { lat: 37.337, lng: -121.882 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatlng,
        zoom: 15,
        disableDefaultUI: true,
        mapTypeControl: true,
        rotateControl: true,
        fullscreenControl: true,
    });

    directionsRenderer.setMap(map);

    initRobotMaker(myLatlng.lat, myLatlng.lng);

    SetGoalPoint(NaN, NaN);

    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        SetGoalPoint(mapsMouseEvent.latLng.lat(),mapsMouseEvent.latLng.lng());
    });
}