/**
 * Created by boyander on 11/10/16.
 */

var express = require('express');
var Item = require('./Item.js').Item;
var app = express();

// Configure jade to be our rendering engine
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// Enable boostrap from npm as a served static directory
app.use("/libs",express.static('node_modules/bootstrap/dist'));

// Our CSS and JS files
app.use("/public",express.static('public'));


//First i'll try to fill pics table variable with my photos of previous lab sessions to check if the system works.

/*

var pics = [
	new Item("Ibanez JEM7V WH","imatges/JEM7V_WH.jpg","2555"),
	new Item("Ibanez JSA20-VB","imatges/IBANEZ-JSA20-VB.png","1405"),
	new Item("Fender Geddy Lee JBass MN-3TS","imatges/Geddy_Lee_JBass_MN_3TS.jpg","1082"),
	new Item("Takamine Acoustic Bass GB30CE-NAT","imatges/GB30CE-NAT_TAKAMINE.jpg","477"),
	new Item("Fender 65 Twin-Reverb Guitar Amplifier","imatges/65_TWIN-REVERB.jpg","1808"),
	new Item("Ampeg BA-210 V2 Bass Amplifier","imatges/Ampeg_BA_210-V2.jpg","70.99"),
	new Item("Korg KROME-88 WORKSTATION Synthesizer","imatges/Korg-KROME-88_WORKSTATION.jpg","1649"),
	new Item("Pearl VBL925F-C230 Drumkit","imatges/Pearl-VBL925F-C230.jpg","911"),
	new Item("Hohner Harmonic 7538-48_TOOTS_MELLOW_TONE","imatges/7538-48_TOOTS_MELLOW_TONE__HOHNER.jpg","173"),
	new Item("E945 Sennheiser Microphone","imatges/E945_Sennheiser.jpg","198")
	];

*/

//Then i'll use the searchByTerm() function of 500px API module in order to obtain random pictures restricted to the term that i've introduced.

// Use 500px API to get random pictures for our products
var API500px = require('500px');
var api500px = new API500px("YecP85RjzG08DN0MqvgFa0N780dNaDmJX6iTPbYp");
var pics = [];
api500px.photos.searchByTerm('Guitarres',  {'sort': 'created_at', 'rpp': '10','image_size':200},  function(error, results) {
    //Do something
   pics = results.photos.map(function(a){
         //Compose object to be used in show items template
      return new Item(a.image_url);
    });
});



// Render frontpage
app.get('/', function (req, res) {
    res.render('productes',{
        pics: pics
    });
});


// Server start
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


