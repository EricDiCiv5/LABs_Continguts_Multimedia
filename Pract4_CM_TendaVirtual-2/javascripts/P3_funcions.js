var sumatori = 0;
var nid=1;

function borrar(nid,pre){
	var borrar=document.getElementById(nid);
	borrar.parentNode.removeChild(borrar);
	var borrar1=document.getElementById('b'+nid);
	borrar1.parentNode.removeChild(borrar1);
	document.getElementById("suma").innerHTML="Total "+sumatori.toFixed(2)+" €";
	sumatori-=pre;
	document.getElementById("suma").innerHTML="Total "+sumatori.toFixed(2)+" €";
}

function comprar(descrip, preu){
   var espacio=document.getElementById("total");
   var parrafo=document.createElement("p");
   idp=nid;
   parrafo.setAttribute("id",nid);
   anclaN=document.createElement("a");
   anclaN.setAttribute("href","#");
   anclaN.setAttribute("title","X");
   anclaN.setAttribute("onClick","borrar("+nid+","+preu+");");
   
   var ids = document.getElementById(idp);
   
   
   var contenido=document.createTextNode(descrip+" "+preu+" €");
   parrafo.appendChild(contenido);
   espacio.appendChild(parrafo);
   
   var boton=document.createElement("input");
   boton.setAttribute("type", "button");
   boton.setAttribute("value","x");
   boton.setAttribute("id","b"+nid);
   boton.setAttribute("onclick","borrar("+nid+","+preu+");");
   espacio.appendChild(boton);
   //ids.appendChild(anclaN);
   sumatori+=parseFloat(preu);
   document.getElementById("suma").innerHTML="Total "+sumatori.toFixed(2)+" €";
   
   nid++;
}