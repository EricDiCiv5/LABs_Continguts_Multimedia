/* Variable to load the canvas of the calculator */

var calc = new Phaser.Game(575, 550, Phaser.AUTO, 'My-Calculator', { preload: preload, create: create });

/* Function to preload the scenario of the calculator */

function preload() {
	
    calc.load.spritesheet('boton-0', 'icon_buttons/icon_seven.png');
    calc.load.spritesheet('boton-1', 'icon_buttons/icon_four.png');
    calc.load.spritesheet('boton-2', 'icon_buttons/icon_one.png');
    calc.load.spritesheet('boton-3', 'icon_buttons/icon_zero.png');
    calc.load.spritesheet('boton-4', 'icon_buttons/icon_eight.png');
    calc.load.spritesheet('boton-5', 'icon_buttons/icon_five.png');
    calc.load.spritesheet('boton-6', 'icon_buttons/icon_two.png');
    calc.load.spritesheet('boton-7', 'icon_buttons/icon_clear.png');
    calc.load.spritesheet('boton-8', 'icon_buttons/icon_nine.png');
    calc.load.spritesheet('boton-9', 'icon_buttons/icon_six.png');
    calc.load.spritesheet('boton-10', 'icon_buttons/icon_three.png');
    calc.load.spritesheet('boton-11', 'icon_buttons/icon_equal.png');
    calc.load.spritesheet('boton-12', 'icon_buttons/icon_division.png');
    calc.load.spritesheet('boton-13', 'icon_buttons/icon_multiply.png');
    calc.load.spritesheet('boton-14', 'icon_buttons/icon_add.png');
	calc.load.spritesheet('boton-15', 'icon_buttons/icon_substract.png');
    
}


/* Variables of the background and the button pressed */
var background,button;

/* Text variables to the first number second number to introduce by keyboard and the result */
var FirstNumber_text = "", SecondNumber_text = "", Result_text = 0;

/*Text variables to the operand that takes place first , the key associated with the number position of each button and the text of all buttons*/
var operand = 0,key = "", texto;

function create() {

    calc.stage.background_Color = '#f08080'; // Background colour of my calculator
	
	var design = { font: "28px Verdana", fill:"#ff0044", align: "center" }; // Design features of each button of my calculator.
	texto = calc.add.text(100,400,"",design); //Adding the text in a 100X400 pixels format with our design.

	
    /* Adding of the 16 buttons, its distribution around the canvas and its format */
	var n = 0; //integer variable that is going to fill what button is it.
    for(var i=0; i < 4; i++) {
		
        for(var j=0; j < 4; j++) {
			
            var llave = "boton-"+n; //Binding string 'boton' to its corresponding number or each iteration
		    button = calc.add.button(i*125+20, j*125, llave, ActionOnClick, {keyname:n}, 0, 0, 0); //Adding all the features of the button in our calculator
	        button.events.onInputDown.add(InputDown); //activating the function if the button was pressed
            button.events.onInputUp.add(InputUp); //activating the function if the button was released
			n++; //increasing the number value in one unit.
        }
    }
}

/* Set of functions associated with my 5 different operations */

function ActionOnClick () {
	
	var key = this.keyname;
	

    switch(key) {
    case 0: if(operand == 0) FirstNumber_text += String(7); else SecondNumber_text += String(7);
    break; 
    case 1: if(operand == 0) FirstNumber_text += String(4); else SecondNumber_text += String(4);
    break;
    case 2: if(operand == 0) FirstNumber_text += String(1); else SecondNumber_text += String(1);
    break;
    case 3: if(operand == 0) FirstNumber_text += String(0); else SecondNumber_text += String(0);
    break;
    case 4: if(operand == 0) FirstNumber_text += String(8); else SecondNumber_text += String(8);
    break;
    case 5: if(operand == 0) FirstNumber_text += String(5); else SecondNumber_text += String(5);
    break;
    case 6: if(operand == 0) FirstNumber_text += String(2); else SecondNumber_text += String(2);
    break;
    case 7: 	{
	    Result_text = 0;

	    texto.text = "Result: " + String(Result_text);

	    operand = 0;
	    FirstNumber_text = "";
        SecondNumber_text = "";
	}
    break;
    case 8: if(operand == 0) FirstNumber_text += String(9); else SecondNumber_text += String(9);
    break;
    case 9: if(operand == 0) FirstNumber_text += String(6); else SecondNumber_text += String(6);
    break;
    case 10: if(operand == 0) FirstNumber_text += String(3); else SecondNumber_text += String(3);
    break;
    case 11: switch(operand) {
			case 12: Result_text = Number(FirstNumber_text) / Number(SecondNumber_text);
			break;
			case 13: Result_text = Number(FirstNumber_text) * Number(SecondNumber_text);
			break;
			case 14: Result_text = Number(FirstNumber_text) + Number(SecondNumber_text);
			break;
			case 15: Result_text = Number(FirstNumber_text) - Number(SecondNumber_text);
			break;
			default: Result_text = Number(FirstNumber_text);
			break;
		}
    break;
    case 12: operand = key;
    break;
    case 13: operand = key;
    break;
    case 14: operand = key;
    break;
    case 15: operand = key;
    break;
    default: console.log('Error in the buttons assignation of this calculator!!');
    break;
    }
		
}

/* Function to generate process if the key was pressed */
function InputDown() {
	
    calc.add.tween(button.scale).to({x: 0.8, y: 0.8}, 200, Phaser.Easing.Cubic.Out, true);

}

/* Function to generate process if the key was released */
function InputUp() {
	
    calc.add.tween(button.scale).to({x: 1, y: 1}, 200, Phaser.Easing.Cubic.Out, true);

}
