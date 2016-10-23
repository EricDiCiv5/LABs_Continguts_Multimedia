/**
 * Created by eric diaz on 23/10/16.
 */


// If i would want to use my own images of previous lab sessions, the established functions will be the following ones:
/*
var Item = function Item(nombre, imagen, precio){
	this.name = nombre;  
	this.image = imagen;
	this.price = precio;
};

// Obtenir el preu.
Item.prototype.getPrice = function(){
    return this.price;
}

exports.Item = Item;
*/

var Item = function Item(imagen){
    this.image = imagen;
    this.preu = 0.00;
    this.name="Guitarres";
};

// Get random price in range min, max
Item.prototype.getPrice = function(){
    var min = 100;
    var max = 2500;
    return (Math.random() * (max - min) + min).toFixed(2);
}

exports.Item = Item;

