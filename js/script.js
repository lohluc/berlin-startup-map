var map;
var markersArray = [];

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD3_lzj-elbrbdrtjH3oMe58iHKMVg0G_Q&callback=initMap' +
      '&signed_in=false&callback=initialize';
  document.body.appendChild(script);
}
window.onload = loadScript;

// ZoomIn and ZoomOut Buttons
function ZoomControl(controlDiv, map) {
// Creating divs & styles for custom zoom control
  controlDiv.style.padding = '5px';

// Set CSS for the control wrapper
  var controlWrapper = document.createElement('div');
  controlWrapper.style.opacity = '0.9';
  controlWrapper.style.border = 'none';
  controlWrapper.style.cursor = 'pointer';
  controlDiv.appendChild(controlWrapper);
  
// Set CSS for the ZoomIn
  var zoomInButton = document.createElement('div');
  zoomInButton.style.width = '32px'; 
  zoomInButton.style.height = '32px';
  zoomInButton.style.backgroundColor = 'black';
  zoomInButton.style.position = 'fixed';
  zoomInButton.style.bottom = '82px';
  zoomInButton.style.right = '0';
  zoomInButton.style.borderTopLeftRadius = '8px';
  zoomInButton.style.backgroundImage = 'url(img/plus.svg)';
  controlWrapper.appendChild(zoomInButton);
    
// Set CSS for the ZoomOut
  var zoomOutButton = document.createElement('div');
  zoomOutButton.style.width = '32px'; 
  zoomOutButton.style.height = '32px';
  zoomOutButton.style.backgroundColor = 'black';
  zoomOutButton.style.position = 'fixed';
  zoomOutButton.style.bottom = '50px';
  zoomOutButton.style.right = '0';
  zoomOutButton.style.borderBottomLeftRadius = '8px';
  zoomOutButton.style.borderTop = '1px solid white';
  zoomOutButton.style.backgroundImage = 'url(img/minus.svg)';
  controlWrapper.appendChild(zoomOutButton);

//  Setup the click event listener - ZoomIn
  google.maps.event.addDomListener(zoomInButton, 'click', function() {
    map.setZoom(map.getZoom() + 1);
  });
    
// Setup the click event listener - ZoomOut
  google.maps.event.addDomListener(zoomOutButton, 'click', function() {
    map.setZoom(map.getZoom() - 1);
  });  
}

// Initialize the map and the content
function initialize() {  
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(52.520007, 13.404954),
        mapTypeControl: false,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    };
    if($(window).width() <= 1080) {
        mapOptions.zoom = 12;
    }
    if ($(window).width() < 850 || $(window).height() < 595) {
        hideNav();
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);  

    // Create the DIV to hold the control and call the ZoomControl constructor
    var zoomControlDiv = document.createElement('div');
    var zoomControl = new ZoomControl(zoomControlDiv, map);
    zoomControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);

    setMarkers(markers);

    setAllMap();

// Reset map zoom button and resize the window
    // if window resize conditionals are met
    function resetMap() {
        var windowWidth = $(window).width();
        if(windowWidth <= 1080) {
            map.setZoom(12);
            map.setCenter(mapOptions.center);
        } else if(windowWidth > 1080) {
            map.setZoom(13);
            map.setCenter(mapOptions.center);   
        }
    }
    $("#zoom").click(function() {
        resetMap();
    });
   $(window).resize(function() {
        resetMap();
    }); 
}

// Determines if markers should be visible
// This function is passed in the knockout viewModel function
function setAllMap() {
  for (var i = 0; i < markers.length; i++) {
    if(markers[i].boolTest === true) {
    markers[i].holdMarker.setMap(map);
    } else {
    markers[i].holdMarker.setMap(null);
    }
  }
}

// All necessary information of each marker location
var markers = [
    {   
    title: "CODE University",
    lat: 52.498407, 
    lng: 13.383549,
    streetAddress: "Tempelhofer Ufer 17",
    cityAddress: "10963 Berlin",
    countryAddress: "Germany",
    url: "https://code.berlin/en/",
    facebook: "https://www.facebook.com/CodeUniversity",
    twitter: "https://twitter.com/CodeUniversity",
    instagram: "https://www.instagram.com/CodeUniversity/",
    id: "nav0",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "Delivery Hero",
    lat: 52.524699, 
    lng: 13.392925,
    streetAddress: "Oranienburger Str. 70",
    cityAddress: "10117 Berlin",
    countryAddress: "Germany",
    url: "https://www.deliveryhero.com",
    facebook: "https://www.facebook.com/deliveryhero",
    twitter: "https://twitter.com/deliveryherocom",
    instagram: "https://www.instagram.com/deliveryhero/",
    id: "nav1",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "EyeEm",
    lat: 52.496851, 
    lng: 13.418323,
    streetAddress: "Kohlfurter Strasse 41/43",
    cityAddress: "10999 Berlin",
    countryAddress: "Germany",
    url: "https://www.eyeem.com",
    facebook: "https://www.facebook.com/EyeEm",
    twitter: "https://twitter.com/eyeemmarket",
    instagram: "https://www.instagram.com/eyeemphoto/",
    id: "nav2",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "HelloFresh",
    lat: 52.528770, 
    lng: 13.416020,
    streetAddress: "Saarbrücker Str. 37A",
    cityAddress: "10405 Berlin",
    countryAddress: "Germany",
    url: "https://www.hellofresh.de/tasty/",
    facebook: "https://www.facebook.com/HelloFresh.de",
    twitter: "https://twitter.com/HelloFreshDE",
    instagram: "https://www.instagram.com/hellofreshde/",
    id: "nav3",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "Kitchen Stories",
    lat: 52.501924, 
    lng: 13.429501,
    streetAddress: "Muskauer Str 43",
    cityAddress: "10997 Berlin",
    countryAddress: "Germany",
    url: "https://kitchenstories.io/en",
    facebook: "https://www.facebook.com/KitchenStoriesOfficial",
    twitter: "https://twitter.com/1KitchenStories",
    instagram: "https://www.instagram.com/kitchenstories_official/",
    id: "nav4",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "N26",
    lat: 52.516069, 
    lng: 13.412992,
    streetAddress: "Klosterstraße 62",
    cityAddress: "10179 Berlin",
    countryAddress: "Germany",
    url: "https://n26.com/?lang=de",
    facebook: "https://www.facebook.com/N26/",
    twitter: "https://twitter.com/n26/",
    instagram: "https://www.instagram.com/n26/",
    id: "nav5",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "Outfittery",
    lat: 52.503296, 
    lng: 13.418136,
    streetAddress: "Leuschnerdamm 31",
    cityAddress: "10999 Berlin",
    countryAddress: "Germany",
    url: "https://www.outfittery.de",
    facebook: "https://www.facebook.com/Outfittery",
    twitter: "https://twitter.com/Outfittery",
    instagram: "https://www.instagram.com/outfittery/",
    id: "nav6",
    visible: ko.observable(true),
    boolTest: true
    },
    {   
    title: "SoundCloud",
    lat: 52.536840, 
    lng: 13.394930,
    streetAddress: "Rheinsberger Str. 76/77",
    cityAddress: "10115 Berlin",
    countryAddress: "Germany",
    url: "https://soundcloud.com",
    facebook: "https://www.facebook.com/SoundCloud/",
    twitter: "https://twitter.com/soundcloud",
    instagram: "https://www.instagram.com/soundcloud/",
    id: "nav7",
    visible: ko.observable(true),
    boolTest: true
    }
];

// Google Street View Image for each inidividual marker
// Passed the street address, city address and country to get the image for each location
var streetViewImage;
var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=180x90&location=';

function determineImage() {
       streetViewImage = streetViewUrl + markers[i].streetAddress + ',' + markers[i].cityAddress + ',' + markers[i].countryAddress;
};                   

// Sets the markers on the map within the initialize function
// and sets the infoWindows to each individual marker
function setMarkers(location) {
    for(i=0; i<location.length; i++) {
        location[i].holdMarker = new google.maps.Marker({
          position: new google.maps.LatLng(location[i].lat, location[i].lng),
          map: map,
          icon: {
            url: 'img/marker.png',
            size: new google.maps.Size(30, 35),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(12.5, 40)
            },
          shape: {
            coords: [1,30,-30,-30,1],
            type: 'poly'
          }  
        });

        // Function to place google street view images within info windows
        determineImage();

        // Content of the info windows
        location[i].contentString = '<img class="location-image" src="' + streetViewImage + 
                                    '" alt="Street View Image of ' + location[i].title + '"><br><p class="location-title">' + 
                                    location[i].title + '</p><p class="location-address">' + 
                                    location[i].streetAddress + '<br>' + 
                                    location[i].cityAddress + '</p><p class="web-link-site"><a href="' + location[i].url + 
                                    '" target="_blank">' + 'WEBSITE' + '</a></p>' + 
                                    '<p class="web-link-direct"><a target="_blank" href="https://www.google.com/maps/dir/Current+Location/' + 
                                    location[i].title + ',' + location[i].streetAddress + ',' + location[i].cityAddress + ',' + 
                                    location[i].countryAddress + '">DIRECTION</a></p>' + '<a target="_blank" href="' + location[i].twitter + 
                                    '"><img class="twitter" src="img/twitter-white.svg"></a>' + '<a target="_blank" href="' + location[i].facebook +
                                    '"><img class="facebook" src="img/facebook-white.svg"></a>' + '<a target="_blank" href="' + location[i].instagram +
                                    '"><img class="instagram" src="img/instagram-white.svg"></a>';

		// Content of the mouseover info windows                                
        location[i].hoverContentString = '<p class="location-title">' + 
                                    location[i].title + '</p><p class="location-address">' + 
                                    location[i].streetAddress + '<br>' + 
                                    location[i].cityAddress + '</p><p class="web-link-site"><a href="' + location[i].url + 
                                    '" target="_blank">' + 'WEBSITE' + '</a></p>' + 
                                    '<p class="web-link-direct"><a target="_blank" href="https://www.google.com/maps/dir/Current+Location/' + 
                                    location[i].title + ',' + location[i].streetAddress + ',' + location[i].cityAddress + ',' + 
                                    location[i].countryAddress + '">DIRECTION</a></p>' + '<a target="_blank" href="' + location[i].twitter + 
                                    '"><img class="twitter" src="img/twitter-white.svg"></a>' + '<a target="_blank" href="' + location[i].facebook +
                                    '"><img class="facebook" src="img/facebook-white.svg"></a>' + '<a target="_blank" href="' + location[i].instagram +
                                    '"><img class="instagram" src="img/instagram-white.svg"></a>';


        var infowindow = new google.maps.InfoWindow({
            content: markers[i].contentString
        });

        // Click marker to view infoWindow
        // Zoom in and center location on click
        new google.maps.event.addListener(location[i].holdMarker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,this);
            var windowWidth = $(window).width();
            if(windowWidth <= 1080) {
                map.setZoom(14);
            } else if(windowWidth > 1080) {
                map.setZoom(17);  
            }
            map.setCenter(marker.getPosition());
          };
        })(location[i].holdMarker, i));

        // Mouse over to view infoWindow 
      	new google.maps.event.addListener(location[i].holdMarker, 'mouseover', (function(marker, i) {
          return function() {
            infowindow.setContent(location[i].hoverContentString);
            infowindow.open(map,this);
          };
        })(location[i].holdMarker, i));

        // Click nav element to view infoWindow
        // Zoom in and center location on click
        var searchNav = $('#nav' + i);
        searchNav.click((function(marker, i) {
          return function() {
            infowindow.setContent(location[i].contentString);
            infowindow.open(map,marker);
            map.setZoom(17);
            map.setCenter(marker.getPosition());
          }; 
        })(location[i].holdMarker, i));
    }
}

// Query through the different locations from nav bar with knockout.js
    // only display markers and nav elements that match query result
var viewModel = {
    query: ko.observable(''),
};

viewModel.markers = ko.dependentObservable(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(markers, function(marker) {
    if (marker.title.toLowerCase().indexOf(search) >= 0) {
            marker.boolTest = true;
            return marker.visible(true);
        } else {
            marker.boolTest = false;
            setAllMap();
            return marker.visible(false);
        }
    });
}, viewModel);
ko.applyBindings(viewModel);

// Show & hide markers in sync with nav
$("#search-input").keyup(function() {
	setAllMap();
});

$('#search-input').on('input', function(e) {
	setAllMap();
});


// Hide and show navigation and twitter timeline on click
var visible = true;
var visibleTwitter = true;

function noNav() {
    $("#search-nav").animate({
        height: 0,
    }, 500);
        setTimeout(function() {
            $("#search-nav").hide();
        }, 500);    
            $("#menu").attr("src", "img/burger.svg").css("height", 35).css("width", 35);
            $("#menu-container").css("top", 8);
            $(".logo").css("left", 50).css("width", 310).css("background", "none");
        visible = false;
}

function yesNav() {
    $("#search-nav").show();
        var scrollerHeight = $("#scroller").height() + 55;
        if($(window).height() < 600) {
            $("#search-nav").animate({
                height: scrollerHeight - 100,
            }, 400, function() {
                $(this).css('height','auto').css("max-height", 439);
            });  
        } else {
            $("#search-nav").animate({
                height: scrollerHeight,
            }, 400, function() {
                $(this).css('height','auto').css("max-height", 549);
            });
        }
        $("#menu").attr("src", "img/exit.svg").css("height", 25).css("width", 25);
        $("#menu-container").css("top", 73);
        $(".logo").css("left", 0).css("width", 290).css("background", "whitesmoke");
    visible = true;
}

function noTwitter() {
    $("#twitter-widget-0").animate({
      width: 0,
     }, 500);
    $(".tweets-logo").attr("src", "img/twitter-white.svg").css("padding", 5);
    $("#twitter-button").css("height", 45).css("width", 45).css("right", 0);
    visibleTwitter = false;
}

function yesTwitter() {
    $("#twitter-widget-0").show();
        $(".tweets-logo").attr("src", "img/back.svg").css("padding", 7);
        $("#twitter-widget-0").animate({
        width: 250,
        }, 500);
        $("#twitter-button").animate({
            right: 250,
        },2000);
        $("#twitter-button").css("height", 30).css("width", 30);
    visibleTwitter = true;
}

function hideNav() {
    if(visible === true) {
        noNav();
    } else {
        yesNav();  
    }
}

function hideTwitter() {
    if(visibleTwitter === true) {
        noTwitter();        
    } else {
        yesTwitter();  
    }
}

$("#menu").click(hideNav);
$("#twitter-button").click(hideTwitter);


// Hide and show Nav and Twitter Timeline on different screen sizes
$(window).resize(function() {
    var windowWidth = $(window).width();
    if ($(window).width() < 850 && visible === true) {
            noNav();
            noTwitter();
            $("#twitter-button").css('display','none');
    	} else if($(window).height() < 595 && visible === true) {
            noNav();
            noTwitter();
            $("#twitter-button").css('display','none');
        }
    if ($(window).width() >= 850 && visible === false) {
            if($(window).height() > 595) {
                yesNav();
                yesTwitter();
                $("#twitter-button").css('display','flex');
            }
        } else if($(window).height() >= 595 && visible === false) {
            if($(window).width() > 850) {
                yesNav();
                yesTwitter();
                $("#twitter-button").css('display','flex');
            }     
        }    
});