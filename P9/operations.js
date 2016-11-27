/* Variable to load the canvas of the calculator */

var calc = new Phaser.calc(225, 225, Phaser.AUTO, 'My-Calculator', { preload: preload, create: create, update: update });

/* Function to preload the scenario of the calculator */

function preload() {
    calc.load.spritesheet('boton-0', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-1', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-2', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-3', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-4', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-5', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-6', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-7', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-8', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-9', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-10', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-11', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-12', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-13', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    calc.load.spritesheet('boton-14', 'assets/buttons/button_sprite_sheet.png', 25, 25);
    
    calc.load.image('background','assets/misc/starfield.jpg');
    calc.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
}

/* Variables of buttons which are making the operations */
var button_add;
var button_subs;
var button_mult;
var button_div;
var button_erase;

/* Variable of the background */
var background_calc;

/* Text variables to the first number second number to introduce by keyboard and the result */
var FirstNumber_text;
var SecondNumber_text;
var Result_text;

function create() {

    calc.stage.backgroundColor = '#c7c7c7'; // Background color of my calculator

    background_calc = calc.add.tileSprite(0, 0, 200, 100, 'background'); // Dimensions in pixels of my background

    FirstNumber_text = calc.add.bitmapText(225, 100, 'desyrel', 'First number:', 64); // Dimensions in pixels of my first number
    
    SecondNumber_text = calc.add.bitmapText(225, 100, 'desyrel', 'Second number:', 64); // Dimensions in pixels of my second number
    
    Result_text = calc.add.bitmapText(225, 100, 'desyrel', 'Result =', 64); // Dimensions in pixels of my result
    
    /* Adding of the 5 buttons, its distribution around the canvas and its format */
    for(var i=0, i < 4, i++) {
        for(var j=0, j < 4, j++) {
            var key = "boton-"+(i+j);
    button_add = calc.add.button(i*25, j*25, key, ActionOnClick, key, 0, 0, 0);
        }
    }
}

/* Set of functions associated with my 5 different operations */

function ActionOnClick () {
    switch(key) {
    case 0 
    break;
    case 1
    break;
    case 2
    break;
    case 3
    break;
    case 4
    break;
    case 5
    break;
    case 6
    break;
    case 7
    break;
    case 8
    break;
    case 9
    break;
    case 10
    break;
    case 11
    break;
    case 12
    break;
    case 13
    break;
    case 14
    break;
    case 15
    break;
    default console.log("Error in the buttons assignation of this calculator!!\n");
    break;
    }
}

/* Function to show on the canvas the result */

function update() {
    Result_text.text = 'Result=\n' ;

}

