class Calculator {
    
    constructor() {
        this.sumValues = 0;
        this.subtractValues = 0;
        this.multiplyValues = 0;
        this.divideValues = 0;
        this.expressionResult = "";
    }

    /* Sum values passed by paramiter 
    * ex: sum(1, 2, 3);
    * author: Renato Ferreira
    */
    sum(...param) {
        param.forEach((val) => {
            this.sumValues += val;
        });

        return this.sumValues;
    }

    /* Subtract values passed by paramiter 
    * ex: subtract(1, 2, 3);
    * author: Renato Ferreira
    */
    subtract(...param) {
        param.forEach((val, i) => {
            if(i === 0) {
                return this.subtractValues = val;
            }
            this.subtractValues -= val;
        });

        return this.subtractValues;
    }

    /* Multiplies values passed by paramiter 
    * ex: multiplies(1, 2, 3);
    * author: Renato Ferreira
    */
    multiply(...param) {
        param.forEach((val, i) => {
            if(i === 0) {
                return this.multiplyValues = val;
            }
            this.multiplyValues *= val;
        });

        return this.multiplyValues;
    }

    /* Divide values passed by paramiter 
    * ex: divide(1, 2, 3);
    * author: Renato Ferreira
    */
    divide(...param) {
        param.forEach((val, i) => {
            if(i === 0) {
                return this.divideValues = val;
            }
            this.divideValues /= val;
        });

        return this.divideValues;
    }

    /* Return the percentage of values passed by paramiter 
    * ex: percent(100, 20);
    * author: Renato Ferreira
    */
    percent(value, perc) {
        return (perc/100) * value;
    }

    /* Puts a simnbol in the end of input's value 
    * ex: percent(input, "+");
    * author: Renato Ferreira
    */
    setValue(input, value) {
        
        // Checks if the last simbol written was a dot and no permit to write it again
        let lastSimbol = "";
        for (var key in input.value) {
            if(this._isSimbol(input.value[key])){
                lastSimbol = input.value[key];
            }
        }
        
        if(lastSimbol === "." && value === ".") { return; }

        if(this._isSimbol(input.value) && this._isSimbol(value)) {
            if(lastSimbol !== "." && value === ".") {
                input.value += "0" + value;
                return;
            }

            this.clearInput(input); 
            input.value += value;           
            return;
        }

        // Sets a zero for specifcs simbols if the field is empyt
        if(input.value.length === 0) {
            if(value === "x" || value === "+" || value === "%" || value === "/" || value === ".") {
                input.value += "0" + value;
                return;
            }
        }

        input.value += value;
    }

    /* Checks if the input's latest character is a simbol 
    * ex: percent(input.value);
    * author: Renato Ferreira
    */
    _isSimbol(value) {
        return (
            value[value.length-1] === "+" ||
            value[value.length-1] === "-" ||
            value[value.length-1] === "x" ||
            value[value.length-1] === "/" ||
            value[value.length-1] === "%" ||
            value[value.length-1] === "."
        );
    }

    /* Checks if the input's latest character is a simbol 
    * To clear all input's value set the second paramiter to true
    * ex: clearInput(input, true) ;
    * author: Renato Ferreira
    */
    clearInput(input, all = "") {
        if(all === "all") {
            input.value = "";
            return;
        }

        let newValue = "";
        for (var key in input.value) {
            if((parseInt(key, 10)+1) !== input.value.length){
                 newValue += input.value[key];
            }
        }

        input.value = newValue;
    }

    /* Defines the action to be executed 
    * ex: setAction(input, "sum");
    * author: Renato Ferreira
    */
    setAction(input, action) {
        switch(action) {
            case "sum":
                this.setValue(input, "+");
                break;
            case "subt":
                this.setValue(input, "-");
                break;
            case "mult":
                this.setValue(input, "x");
                break;
            case "divide":
                this.setValue(input, "/");
                break;
            case "perc":
                this.setValue(input, "%");
                break;
            case "equal":
                this._calcResult(input);
                break;
            case "ce":
                this.clearInput(input);
                break;
            default: 
                this.clearInput(input, "all");
        }
    }

    /* Calculates the result of the operation 
    * ex: _calcResult(input);
    * author: Renato Ferreira
    */    
    _calcResult(input) {
        this._doCalc(input, input.value);
    }

    /* Calculates an operation by precedence 
    * ex: _doCalc("1+6/2");
    * author: Renato Ferreira
    */ 
    _doCalc(input, expression) {
        this.expressionResult = expression;
        
        if(expression.indexOf("x") !== -1) {
            this.expressionResult = this._doOperation(expression ,"x");

        } else if(expression.indexOf("/") !== -1) {
            this.expressionResult = this._doOperation(expression ,"/");
              
        } else if(expression.indexOf("+") !== -1 && expression.indexOf("-") !== -1) {

            if(expression.indexOf("+") < expression.indexOf("-")) {
                this.expressionResult = this._doOperation(expression ,"+");
                
            } else {
                this.expressionResult = this._doOperation(expression ,"-");
            }

        } else if(expression.indexOf("+") !== -1) {
            this.expressionResult = this._doOperation(expression ,"+");

        } else if(expression.indexOf("-") !== -1) {
            this.expressionResult = this._doOperation(expression ,"-");
        
        } else if(expression.indexOf("%") !== -1) {
            this.expressionResult = this._doOperation(expression ,"%");
        
        } else {
            input.value = this.expressionResult;
            return;
        }

        this._doCalc(input, this.expressionResult);
    }

    /* Returns the number that is before of the simbol 
    * ex: _getNumberBefore(expression, index);
    * author: Renato Ferreira
    */ 
    _getNumberBefore(expression, index) {
        let numbB = "";
        // Get number before simbol
        for(var i = index-1; i >= 0; i--) {
            if(!this._isSimbol(expression[i])  || expression[i] === ".") {
                numbB += expression[i];
            } else {
                return parseFloat(numbB.split("").reverse().join(""));
            }
        }

        return parseFloat(numbB.split("").reverse().join(""));
    }

    /* Returns the number that is after of the simbol 
    * ex: _getNumberAfter(expression, index);
    * author: Renato Ferreira
    */ 
    _getNumberAfter(expression, index) {
        let numbA = "";
        // Get number before simbol
        for(var i = index+1; i < expression.length; i++) {
            if(!this._isSimbol(expression[i]) || expression[i] === ".") {
                numbA += expression[i];
            } else {
                return parseFloat(numbA);
            }
        }

        return parseFloat(numbA);
    }

    /* Returns a new string after the operation 
    * ex: _doOperation(expression, index);
    * author: Renato Ferreira
    */ 
    _doOperation(expression, simbol) {
        let numBefore, numAfter, result, index;

        index     = expression.indexOf(simbol); 
        numBefore = this._getNumberBefore(expression, index);
        numAfter  = this._getNumberAfter(expression, index);
    
        switch (simbol) {
            case "+":
                result = this.sum(numBefore, numAfter);
                break;
            case "-":
                result = this.subtract(numBefore, numAfter);
                break;
            case "x":
                result = this.multiply(numBefore, numAfter);
                break;
            case "/":
                result = this.divide(numBefore, numAfter);
                break;
            case "%":
                result = this.percent(numBefore, numAfter);
                break;
        }
        
        return expression.replace((numBefore + simbol + numAfter).toString(), result.toString());
    }
}