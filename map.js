function setMap() {
    var lat_val = parseFloat(document.getElementById("lat_text").value);
    var lng_val = parseFloat(document.getElementById("lng_text").value);
    const loc = { lat: lat_val, lng: lng_val};
    console.log(loc);
    if(!isNaN(lat_val)&&!isNaN(lng_val)){
        const map = new google.maps.Map(document.getElementById("map"), {
            center: loc,
            zoom: 15,
        });
        const marker = new google.maps.Marker({
            position: loc,
            map: map,
        });
    } else{
        alert("Please Enter Number!");
    }
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.337, lng: -121.882 },
        zoom: 15,
    });
}


window.initMap = initMap;