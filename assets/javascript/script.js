
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

$(document).on("click", "#reset",function(){
  database.ref().set({
      liked:0,
      disliked:0
  });
});


$(document).on("click", "#like", function(){
  var good= firebase.database().ref("liked");
  var likes;
    good.once("value", function(snapshot){
      likes = snapshot.val();
      likes++;
      database.ref().update({liked:likes});
    });

  database.ref("liked").once("value",function(snapshot){
    $("#likes").text("Likes: "+ (parseInt(snapshot.val())+1));
  });
});
// //
// //
// //
$(document).on("click", "#dislike",function(){
  var bad= firebase.database().ref("disliked");
  var dislikes;
    bad.once("value", function(snapshot){
      dislikes = snapshot.val();
      dislikes++;
      database.ref().update({disliked:dislikes});
    });

  database.ref("disliked").on("value",function(snapshot){
    $("#dislikes").text("Dislikes: "+ (parseInt(snapshot.val())+1));
  });
});


//Users Search Parameters
var search;
var zipcode;
var mAway = 1609;
var destiantionSelect = 'cafe';
//updates map using Users Search Parameters
$(document).ready(function(){
  $("#search-btn").on("click", function(event){
    event.preventDefault();
    //sets distance converting miles to meters
    miAway = parseInt($("#miles-away>option:selected").text());
    mAway = miAway*1609;

    //sets categories based on user specificity
    if($("#destination-select>option:selected").text()==="Coffee"){
        destinationSelect = "cafe";
    }else if($("#destination-select>option:selected").text()==="Brews"){
      destinationSelect = "bar";
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

      var map;
      var infowindow;

      function initMap() {
        var austin = {lat: 30.286, lng: -97.731};

        map = new google.maps.Map(document.getElementById('map'), {
          center: austin,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: austin,
          radius: mAway,
          type: [destiantionSelect]
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }


initMap();




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








//------------------------------------------------------------------------------




// SCRIPT FOR WEBSITE CSS ANIMATION --------------------------------------------
// Document Ready
$(document).ready(function() {


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
        $("#search-connect-btn").fadeIn(2500);
    });

    $("#like").click(function () {
      $("#likes").show(200);
    });

    $("#dislike").click(function () {
      $("#dislikes").show(200);
    });

});
