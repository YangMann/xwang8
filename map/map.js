var infowindow = new google.maps.InfoWindow();
var last;
function label(name, lat, lon, photo, students, map) {
    var myLatlng = new google.maps.LatLng(lat, lon);
    var head = "photo/";
    var contentString = "<div class=\"container-fluid\"><div class=\"university row-fluid\"><h3 class=\"span8\">" + name + "</h3>";
    contentString += "<div class=\"span3\"><img src=\"" + head + photo + ".png\"</img></div>";
    $(students).find("student").each(function (i) {
        var sname = $(this).children("name").text();
        var photo = $(this).children("photo").text();
        var intro = $(this).children("intro").text();
        contentString += "<div class=\"span5 well\"><h5>" + sname + "</h5>";
        contentString += "<img src=\"" + head + photo + ".jpg\"</img>";
        contentString += "<p>" + intro + "</p></div>";
    });
    contentString += "</div></div>";
    var image = 'man1.png';
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image,
        title: name
    });
    google.maps.event.addListener(marker, 'click', function () {
        if (!marker.getPosition().equals(last)) {
            infowindow.close();
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
            last = marker.getPosition();
        }
        else {
            infowindow.close();
            last = null;
        }
    });
}

function read(map_caus, map_eu, map_cn) {
    $.ajax({
        url: 'map.xml',
        type: 'GET',
        dataType: 'xml',
        timeout: 1000,
        error: function (xml) {
            read(map_caus, map_eu, map_cn);
        },
        success: function (xml) {
            $(xml).find("university").each(function (i) {
                var name = $(this).children("name").text();
                var lat = $(this).children("position").children("latitude").text();
                var lon = $(this).children("position").children("longitude").text();
                var photo = $(this).children("photo").text();
                var students = $(this).children("students");
                label(name, lat, lon, photo, students, map_caus);
            });
            $(xml).find("university1").each(function (i) {
                var name = $(this).children("name").text();
                var lat = $(this).children("position").children("latitude").text();
                var lon = $(this).children("position").children("longitude").text();
                var photo = $(this).children("photo").text();
                var students = $(this).children("students");
                label(name, lat, lon, photo, students, map_eu);
            });
            $(xml).find("university2").each(function (i) {
                var name = $(this).children("name").text();
                var lat = $(this).children("position").children("latitude").text();
                var lon = $(this).children("position").children("longitude").text();
                var photo = $(this).children("photo").text();
                var students = $(this).children("students");
                label(name, lat, lon, photo, students, map_cn);
            });
        }
    });
}

function initialize() {
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(39.79, -101.47),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map_caus = new google.maps.Map(document.getElementById("map_canvas_caus"), mapOptions);
    google.maps.event.addListener(map_caus, 'click', function (event) {
        infowindow.close();
        last = null;
    });

    var mapOptions1 = {
        zoom: 4,
        center: new google.maps.LatLng(50.0, 15.1),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map_eu = new google.maps.Map(document.getElementById("map_canvas_eu"), mapOptions1);
    google.maps.event.addListener(map_eu, 'click', function (event) {
        infowindow.close();
        last = null;
    });

    var mapOptions2 = {
        zoom: 4,
        center: new google.maps.LatLng(31.4, 126.4),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map_cn = new google.maps.Map(document.getElementById("map_canvas_cn"), mapOptions2);
    google.maps.event.addListener(map_cn, 'click', function (event) {
        infowindow.close();
        last = null;
    });

    read(map_caus, map_eu, map_cn);


}

    
