
$( document ).ready(function(){
	var pos = 0;
	function render(){
	var canvas = document.getElementById("mycanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "#336699";
	ctx.fillRect(10+pos,10,100,100);
	pos = pos + 1;
	console.log(pos);
	};
	setInterval(render,100);
});


//Punt 2 Práctica 6

function startTimer(durada, desplegament) {
    var inici = Date.now(),
        difer,
        minuts,
        segons;
    function timer() {
        // obté el numero de segons que han transcorregut desde que 
        // startTimer() fou trucada.
        difer = durada - (((Date.now() - inici) / 1000) | 0);

        // fa el mateix treball que 'parseInt' [trunca el float].
        minuts = (difer / 60) | 0;
        segons = (difer % 60) | 0;

        minuts = minuts < 10 ? "0" + minuts : minuts;
        segons = segons < 10 ? "0" + segons : segons;

        desplegament.textContent = minuts + ":" + segons; 

        if (difer <= 0) {
            // afegim un segon de manera que el compte enrere comença en la durada completa.
            // exemple 01:00, no 00:59.
            inici = Date.now() + 1000;
        }
    };
    // No volem esperar un segon sencer abans que el comptador començi.
    timer();
    setInterval(timer, 1000);
}

window.onload = function () {
    var oneMinute = 60 * 1,
        desplegament = document.querySelector('#time');
    startTimer(oneMinute, desplegament);
};


// Punt 3 Práctica 6
		function campo_ping_pong() {
		var canv=document.getElementById("mycanvas2");
		var ctx=canv.getContext("2d");
		ctx.beginPath();
		ctx.lineWidth="3";
		ctx.strokeStyle="white";
		ctx.moveto(300,400);
		ctx.lineto(300,0);
		ctx.rect(7,7,600,400);
		ctx.stroke();
		ctx.fillStyle = "#4169E1";
		ctx.fillRect(7,7,600,400);
		}

		function escudos() {
		var canv=document.getElementById("mycanvas3");
		var ctx=canv.getContext("2d");
		var escudo1=document.getElementById("COG");
		var escudo2=document.getElementById("Locust");
		ctx.drawImage(escudo1,150,50,50,50);
		ctx.drawimage(escudo2,450,50,50,50);
		}

		function nombres_equipos(){
		var canv=document.getElementById("mycanvas4");
		var ctx=canv.getContext("2d");
		ctx.font= 20px Arial;
		ctx.textAlign="left";
		ctx.fillText("COG Team",150,110);
		ctx.textAlign="right";
		ctx.fillText("Locust Team",450,110);
		}

		window.onload = function Punto3(){
       	 	campo_ping_pong();
        	escudos();
        	nombres_equipos();
    		};


/*
// Punt 4 Práctica 6

var Marcador = function(num_izq,num_der) {

this.num_izq = num_izq;
this.num_der = num_der;

}

Marcador.prototype.cambiaMarcador = function(num_izq,num_der) {
if(num_izq>0 || num_izq==num_izq+1){
     this.num_izq = num_izq+1;
}
else if(num_der>0 || num_der==num_der+1){
     this.num_der = num_der+1;
}
else{
}

};
*/



