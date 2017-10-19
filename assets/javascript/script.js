


// Document Ready
$(document).ready(function() {
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

  //   var keyGM = "key=AIzaSyAdGVuh0tV7TL63m1dBWw0krADF2MPj0FA";
  // var baseURLGM = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  //   keyGM + "&q=";
console.log(httpGP);







$("#test").click(runGPQuery());



function runGPQuery(httpGP) {
//GM ajax call
console.log("running");
  $.ajax({
    url: httpGP,
    method: "GET"
  }).done(function(dataGM){
    console.log("finished");
    //test queryURL
    console.log("------------------------------------");
    console.log("URL: " + httpGP);
    console.log("------------------------------------");
    //test dataGM
    console.log("info: "+dataGM);
    console.log("------------------------------------");

  });
}









});
// Initialize Firebase
//firebase information
