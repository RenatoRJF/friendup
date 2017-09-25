window.onload = function() {

    let keyboard, resultCalc, input, Calc; 
    
    Calc      = new Calculator();
    inputCalc = document.getElementById("input-calc");
    keyboard  = document.querySelector(".keyboard");
    buttons   = keyboard.children;

    for(let i=0; i<buttons.length; i++) {
        let button = buttons[i];

        button.addEventListener("click", function() {
            let type       = this.dataset.type;
            let value      = this.dataset.value;
            
            switch(type) {
                case "action":
                    Calc.setAction(inputCalc, value);
                    break;
                default:
                    Calc.setValue(inputCalc, value);
            }
        });
    }
}