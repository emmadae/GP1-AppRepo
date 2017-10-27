
// SCRIPT FOR WEBSITE CSS ANIMATION --------------------------------------------
// Document Ready



    // // BEER AND BEANS FUNCTION - Fill'er up
    // $ ("#fill-me-up").click(function(){
    //     // Poor Drink Function
    //     $('.pour').delay(2000).animate({
    //         height: '360px'
    //         }, 1500).delay(1600).slideUp(500);
    //     // Beans Animation
    //     $('.beans').fadeIn(4000);

    //     // Liquid Fills Up
    //     $('#liquid').delay(3400).animate({
    //         height: '225px'
    //         }, 2500);

    //     // Beer foam rises
    //     $('.beer-foam').delay(3400).animate({
    //         bottom: '250px'
    //         }, 2500);
    // });


    // on click funtion for navigation bar to appear on click
    $('#nav-icon3').click(function(){
        $(".list-items").slideToggle(800);
    });


    $(window).load(function() {
      $("#content-index").show();
      $("#search-connect-btn").fadeIn(2000);
    });

    $("#like").click(function () {
      $("#likes").show(200);
    });

    $("#dislike").click(function () {
      $("#dislikes").show(200);
    });




    // overlay navigation menu
    $("#hamburger-nav").click(function() {
      $("#overlay").show();
    });

    $("#exit-btn").click(function() {
      $("#overlay").hide();
    });
















//-----------------------------------------------------------------------------
// WORKING SCRIPT--------------------------------------------------------------

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDRQXaMgkueFCWKSOynK2w_2e81_J7xUUM",
    authDomain: "gp1-app.firebaseapp.com",
    databaseURL: "https://gp1-app.firebaseio.com",
    projectId: "gp1-app",
    storageBucket: "gp1-app.appspot.com",
    messagingSenderId: "922497710932"
  };
  firebase.initializeApp(config);
	//variables
	var database = firebase.database();

/*google places----------------------------------------------------------------*/
  //current location austin Tx
  var locationGP = "location=30.286,-97.731";
  //search radius
  var radiusGP = "radius=1000";
  //specify search results
  var typeGP = "type=bar";
  //google places key
  var keyGP = "key=AIzaSyA8_XF-LUfDpeY-Lt1RapGFKkgKGvYCbmI";
  //http+search parameters
  var httpGP = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"+locationGP+"&"+radiusGP+"&"+typeGP+"&"+keyGP;
// var likes =0;
  //   var keyGM = "key=AIzaSyAdGVuh0tV7TL63m1dBWw0krADF2MPj0FA";
  // var baseURLGM = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  //   keyGM + "&q=";

//Users Search Parameters
var search;
var zipcode;
var mAway = 1609;
var destinationSelect = 'bar';
var drawDistance = 14;
//updates map using Users Search Parameters
$(document).ready(function(){
  $("#search-btn").on("click", function(event){
    event.preventDefault();
    $("#searchButtons").html('<h1 id="searchResultsTitle"> Search Results: </h1>');
    //sets distance converting miles to meters
    miAway = parseInt($("#miles-away>option:selected").text());
    mAway = miAway*1609;
    if(miAway === 1){
      drawDistance = 14;
    }else if(miAway === 5){
      drawDistance = 12;
    }else if(miAway === 10){
      drawDistance = 11;
    }else if(miAway === 15){
      drawDistance = 10;
    }else if(miAway === 20){
      drawDistance = 10;
    }else if(miAway === 25){
      drawDistance = 10;
    }else if(miAway === 30){
      drawDistance = 10;
    }
    //sets categories based on user specificity
    if($("#destination-select>option:selected").text()==="Coffee"){
        destinationSelect = "cafe";
    }else if($("#destination-select>option:selected").text()==="Brews"){
      destinationSelect = "bar";
    //looking for both not functioning properly
    }else{
      destinationSelect = "'cafe', 'bar'";
    }

    //not implemented
    search = $("#search").val();
    zipcode = $("#zipcode").val();

    //loads map with new user specs
    initMap();
  });
});



//variables print information in the modal
      var map;
      var infowindow;
      var locationId= [];
      var locationName= [];
      var locationRating=[];
      var locationVicinity=[];

      function initMap() {
        var austin = {lat: 30.286, lng: -97.731};

        map = new google.maps.Map(document.getElementById('map'), {
          center: austin,
          zoom: drawDistance
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: austin,
          rankBy: google.maps.places.RankBy.DISTANCE,
          // radius: mAway,
          type: [destinationSelect]
        }, callback);
      }
// [destiantionSelect]


var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

var basicIcon = 'https://chart.googleapis.com/chart?chst=d_simple_text_icon_below&chld=rating|100|32302e|beer|24|FFCC33|32302e';

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        if(place.rating == "undefined"){

        }

        var basicIconc = 'https://chart.googleapis.com/chart?chst=d_simple_text_icon_below&chld='+place.rating+'|14|32302e|cafe|24|ebe4c2|32302e';
        var marker = new google.maps.Marker({
          map: map,
          placeId: place.place_id,
          position: place.geometry.location,
          animation: google.maps.Animation.DROP,
          // label: String(place.rating),
          // icon:iconBase+'coffee_maps.png'
          icon:basicIconc

        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name + "<br>" + "Rating: " + place.rating + "/5" + "<br>" + "Open now: " + place.opening_hours.open_now);
          infowindow.open(map, this);
          var austin = {lat: 30.286, lng: -97.731};
          var panorama = new google.maps.StreetViewPanorama(

            document.getElementById('pic'), {
              position: austin,
              pov: {
                heading: 34,
                pitch: 10
              }
            });
        map.setStreetView(panorama);
        });
      }


initMap();
var result;
function btnGen(result){
  $("#searchButtons").append("<button id="+result.id+" class='searchBtn'>"+result.name+"</button>");
  $("#"+result.id).hide().fadeIn(300);
}

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++){
            result = results[i];
            setTimeout(()=>{createMarker(results[i])},i*100);
            // createMarker(results[i]);
              setTimeout(()=>{btnGen(results[i])}, i*250);
            // $("#searchButtons").append("<button id="+results[i].id+" class='searchBtn'>"+results[i].name+"</button>");
            locationId.push(results[i].id);
            locationName.push(results[i].name);
            locationRating.push(results[i].rating);
            locationVicinity.push(results[i].vicinity);
            // console.log(locationName);
          }}}

          // arr[10]

var id;

$(document).on("click", ".searchBtn", function(){
    console.log("working");
    id = $(this).attr("id");
    var arrayNum = locationId.indexOf(id);
    $("#mLocName").text(locationName[arrayNum]);
    $("#mLocRating").text("Rating: " + locationRating[arrayNum]);

    $("#mLocVicinity").text(locationVicinity[arrayNum]);

    database.ref("/locations").on("value", function(snapshot){
      if(snapshot.child(id).exists()){
        console.log("coolio");
      }else{
        console.log("nope");
        console.log(id);
        database.ref("/locations").update({
          //ignore syntax error on line below. working as intended
          [id]:{
            liked:0,
            disliked:0
          }
        });

      }
      console.log(snapshot.child(id).child("liked").val());
      var popular = snapshot.child(id).child("liked").val();
      var unpopular = snapshot.child(id).child("disliked").val();
      $("#userRates").text("Likes: "+popular+" | Dislikes: "+ unpopular);
      $("#ourRate").html('<button id="mLike">LIKE <i class="fa fa-thumbs-o-up" aria-hidden="true"></i></button><button id="mDislike">DISLIKE <i class="fa fa-thumbs-o-down" aria-hidden="true"></i> </button>');
    });
    modal.style.display = "block";
    });






  //adds functionality to map which finds the users location
  infoWindow = new google.maps.InfoWindow(document.getElementById("map"));
  //creates the marker locator on the google map. Probably not necessary
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("looking");
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


//generates divs to hold information regarding best search results
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// SCRIPT FOR WEBSITE CSS ANIMATION --------------------------------------------
// Document Ready
$(document).ready(function() {

    // on click funtion for navigation bar to appear on click
    $('#nav-icon3').click(function(){
        $(".list-items").slideToggle(800);
    });


    $(window).load(function() {
        $("#content-index").show();
        $("#search-connect-btn").fadeIn(2500);
    });


});
//modal "like" click functionality
    $(document).on("click", "#mLike", function() {
      console.log("clicked");
      var good= firebase.database().ref("locations/"+id);
      var likes;
        good.once("value", function(snapshot){
          likes = snapshot.val().liked;
          likes++;
          var thePath = "locations/"+id+"/liked";
          database.ref().update({[thePath]:likes});
          $("#mLike").fadeOut();
          $("#mDislike").fadeOut();
        });

      database.ref("locations/"+id+"/liked").once("value",function(snapshot){

        console.log("you liked");
        console.log(snapshot.val());
        $("#mLikes").text("Likes: "+ (parseInt(snapshot.val())+1));
      });
    });



//modal functionality for dislikes
    $(document).on("click", "#mDislike", function () {

      console.log($(this));
      var bad= firebase.database().ref("locations/"+id);
      var dislikes;
        bad.once("value", function(snapshot){
          dislikes = snapshot.val().disliked;
          dislikes++;
          var thePath = "locations/"+id+"/disliked";
          database.ref().update({[thePath]:dislikes});
          $("#mDislike").fadeOut();
          $("#mLike").fadeOut();
        });
        database.ref("locations/"+id+"/disliked").once("value",function(snapshot){
          console.log("you disliked");
          console.log(snapshot.val());
          $("#mDislikes").text("Dislikes: "+ (parseInt(snapshot.val())+1));
        });
    });

//this is currently not triggering properly
DirectionsService.route();


    // overlay navigation menu
    $("#hamburger-nav").click(function() {
      $(".overlay-content").style.width = "100%";
    });

    $("#exit-btn").click(function() {
      $(".overlay-content").style.width = "0%";
    });


/*google maps directions-------------------------------------------------------*/
DirectionsRequest = {
  origin: "Austin, TX",
  destination: "Chicago, IL",
  travelMode: "DRIVING",
};

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var haight = new google.maps.LatLng(37.7699298, -122.4469157);
var oceanBeach = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
$("#test").click(DirectionsService.route(DirectionsRequest));
function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 14,
    center: haight
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  var selectedMode = "DRIVING";
  var request = {
      origin: haight,
      destination: oceanBeach,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode]
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
}
DirectionsService.route(DirectionsRequest);
// calcRoute();
