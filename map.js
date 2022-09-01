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

function displayGoal(lat, lng){
    var goal_ui = document.getElementById("goal_info");
    goal_ui.innerHTML = lat.toFixed(5) + ", " + lng.toFixed(5);
}

function initMap() {
    myLatlng = { lat: 37.337, lng: -121.882 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatlng,
        zoom: 15,
        disableDefaultUI: true,
    });

    initRobotMaker(myLatlng.lat, myLatlng.lng);

    // Listen for clicks and add the location of the click to firebase.
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
      content: "Click the map to get Lat/Lng!",
      position: myLatlng,
    });

    infoWindow.open(map);
    displayGoal(NaN, NaN);

    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
          position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
          "Dest: "+JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
        displayGoal(mapsMouseEvent.latLng.lat(),mapsMouseEvent.latLng.lng());
    });
}


window.initMap = initMap;