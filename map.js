var map;

function setMap() {
    var lat_val = parseFloat(document.getElementById("lat_text").value);
    var lng_val = parseFloat(document.getElementById("lng_text").value);
    const loc = { lat: lat_val, lng: lng_val};
    console.log(loc);
    if(!isNaN(lat_val)&&!isNaN(lng_val)){
        const marker = new google.maps.Marker({
            position: loc,
            map: map,
        });
    } else{
        alert("Please Enter Number!");
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
    });

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
          JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
        displayGoal(mapsMouseEvent.latLng.lat(),mapsMouseEvent.latLng.lng());
    });
}


window.initMap = initMap;