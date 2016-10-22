
$( document ).ready(function(){
	var pos = 0;
	function render(){
	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "#336699";
	ctx.fillRect(10+pos,10,100,100);
	pos = (pos + 5)%100;
	console.log(pos);
	};
	setInterval(render,100);
});

var myVar = setInterval(myTimer, 60000);
function myTimer() {
var d = new Date();
// Imprimimos la fecha actual en el elemento <p id="demo"></p>
document.getElementById("mycanvas").innerHTML = d.toLocaleTimeString();
}
