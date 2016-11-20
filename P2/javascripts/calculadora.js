function suma(){
	var nom=document.getElementById("num1").value;
	var nom=document.getElementById("num2").value;
	document.getElementById("res").value=parseFloat(document.getElementById('num1').value)+parseFloat(document.getElementById('num2').value);
}

function resta(){
	var n1=document.getElementById("num1").value;
	var n1=document.getElementById("num2").value;
	document.getElementById("res").value=parseFloat(document.getElementById('num1').value)-parseFloat(document.getElementById('num2').value);
}

function multiplicacion(){
	var nom=document.getElementById("num1").value;
	var nom=document.getElementById("num2").value;
	document.getElementById("res").value=parseFloat(document.getElementById('num1').value)*parseFloat(document.getElementById('num2').value);
}

function division(){
	var nom=document.getElementById("num1").value;
	var nom=document.getElementById("num2").value;
	document.getElementById("res").value=parseFloat(document.getElementById('num1').value)/parseFloat(document.getElementById('num2').value);
}

function borrado(){
	var nom=document.getElementById("num1").value;
	var nom=document.getElementById("num2").value;
	document.getElementById("num1").value=" ";
	document.getElementById("num2").value=" ";
	document.getElementById("res").value=" ";
	
}