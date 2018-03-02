class SmartCalculator {
  constructor(initialValue) {
    // your implementation
    this.equation = [initialValue];
    this.result = initialValue;
  }

  add(number) {
    // your implementation
    this.equation.push('+', number);
    this.calculate();
    return this
  }
  
  subtract(number) {
    // your implementation
    this.equation.push('-', number);
    this.calculate();
    return this
  }

  multiply(number) {
    // your implementation
    this.equation.push('*', number);
    this.calculate();
    return this
  }

  devide(number) {
    // your implementation
    this.equation.push('/', number);
    this.calculate();
    return this
  }

  pow(number) {
    // your implementation
    this.equation.push('^', number);
    this.calculate();
    return this
  }
  

  calculate(){

    function postNotation(equation){
      const operators = {'+': 2, '-' : 3, '*' : 4, '/' : 4, '^': 5};
  
      let output = [];
      let operatorsStack = [];
      let buf;
      let stack = [];
      for(let i = 0; i < equation.length; i++){
        if (equation[i] in operators){
        	if(operatorsStack.length > 0){
            buf = operatorsStack.pop();
            if (operators[equation[i]] <= operators[buf]){
              output.push(buf);
              while (operatorsStack.length > 0){
                output.push(operatorsStack.pop());
              }
            } else
            	operatorsStack.push(buf);
          }

          operatorsStack.push(equation[i]);
        }
        else
        	output.push(equation[i]);
      }
      while (operatorsStack.length > 0)
        output.push(operatorsStack.pop());
      while (stack.length > 0){
      	output.push(stack.pop())
      }
      
      return output
    }
  
    function Counting(postNotation){
      const operators = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y,
        '^': (x, y) => Math.pow(x, y)
      };
      let result = 0;
      let stack = [];
      let x, y;
      for (let i = 0; i < postNotation.length; i++){
        if (postNotation[i] in operators){
          y = stack.pop();
          x = stack.pop();          
          stack.push(operators[postNotation[i]](x, y));
        }
        else{
          stack.push(postNotation[i]);
        }
      }
      return stack.pop()
    }



    let postNot = postNotation(this.equation);
    
    this.result = Counting(postNot);
  }

  valueOf() { 
    return this.result; 
  }

}

module.exports = SmartCalculator;
