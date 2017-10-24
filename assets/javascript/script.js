
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
var destiantionSelect = 'bar';
var drawDistance = 14;
//updates map using Users Search Parameters
$(document).ready(function(){
  $("#search-btn").on("click", function(event){
    event.preventDefault();
    $("#searchButtons").html("");
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
          radius: mAway,
          type: [destinationSelect]
        }, callback);
      }
// [destiantionSelect]
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


      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++){
            createMarker(results[i]);
            console.log(results[i]);
            if(i<10){
            $("#searchButtons").append("<button id="+results[i].id+" class='searchBtn'>"+results[i].name+"</button>");
            locationId.push(results[i].id);
            locationName.push(results[i].name);
            locationRating.push(results[i].rating);
            locationVicinity.push(results[i].vicinity);
            // console.log(locationName);
          }}}}


          // searchBox.addListener('places_changed', function() {
          //
          //
          //    // var mapLoad = document.getElementById('map');
          //     displayMap();
          //
          //    var places = searchBox.getPlaces();
          //
          //    console.log(places);
          // });


$(document).on("click", ".searchBtn", function(){
    console.log("working");
    var id = $(this).attr("id");
    var arrayNum = locationId.indexOf(id);
    $("#mLocName").text(locationName[arrayNum]);
    $("#mLocRating").text(locationRating[arrayNum]);
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

      $("#ourRate").html('<button id="mLike">LIKE <i class="fa fa-thumbs-o-up" aria-hidden="true"></i></button><p id="mLikes"> <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> </p><button id="mDislike">DISLIKE <i class="fa fa-thumbs-o-down" aria-hidden="true"></i> </button><p id="mDislikes"><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></p>');
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

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

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

    $(document).on("click", "#like", function () {
      $("#likes").show(200);
    });

    $(document).on("click", "#dislike", function () {
      $("#dislikes").show(200);
    });


//modal "like" click functionality
    $(document).on("click", "#mLike", function () {
      $("#mLikes").show(200);
    });

    $(document).on("click", "#mDislike", function () {
      $("#mDislikes").show(200);
    });

    // overlay navigation menu
    $("#hamburger-nav").click(function() {
      $(".overlay-content").style.width = "100%";
    });

    $("#exit-btn").click(function() {
      $(".overlay-content").style.width = "0%";
    });





});
