class Calculator{
    constructor(topline , bottomline)
    {
        this.topline = topline;
        this.bottomline = bottomline;
        this.clear();
    }

    clear() {
        this.currentNumber = '';
        this.prevNumber = '';
        this.operation = undefined;
    }

    appendNumber(number)
    {
       
        if (number === '.' && this.currentNumber.includes('.')) return;
        this.currentNumber = this.currentNumber.toString() + number.toString() ;
       
    }

    deleteNumber()
    {
        this.currentNumber = this.currentNumber.toString().slice(0, -1)
    }

    operationSign(op)
    {
        if (this.currentNumber === '') return; 
        if (this.prevNumber !== '')
        {
            this.calculate();    
        }
        this.operation = op;
        this.prevNumber = this.currentNumber;
        this.currentNumber = '';

        
    }

    calculate()
    {
        const current = parseFloat(this.currentNumber)
        const prev = parseFloat(this.prevNumber)
        let ans;
     
        switch (this.operation)
        {
            case '+':
                
                ans = current + prev;
                break;
            
            case '-':
                
                ans = prev - current;
                break;
            case '*':
                
                ans = current * prev;
                break;
            case '/':
                
                ans = prev / current;
                break;
            
            default:
                this.currentNumber = "SOME ERROR :("
        }
      
        this.currentNumber = ans
        this.prevNumber = '';
        this.operation = undefined
        
    }

    display() 
    {

        this.bottomline.innerText = this.currentNumber
        if (this.operation != null)
        {
             this.topline.innerText = `${this.prevNumber} ${this.operation} `
        }
        else
        {
             this.topline.innerText = ''
        }
            
    }


    ifEqualsButtonIsPressed()
    {
        if (this.prevNumber != '' && this.currentNumber != '')
        {
            this.calculate();
            this.topline.innerText = this.currentNumber;
            this.bottomline.innerText = '';
         
        }    
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const acButton = document.querySelector('[data-ac]')
const delButton = document.querySelector('[data-del]')
const equalButton = document.querySelector('[data-equals]')
const topLineTextElement = document.querySelector('[data-topline]')
const bottomLineTextElement = document.querySelector('[data-bottomline]')



const calculator = new Calculator(topLineTextElement, bottomLineTextElement)

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.display()
    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.operationSign(button.innerText);
         calculator.display();
    })
})

acButton.addEventListener('click', () => {
    calculator.clear();
    calculator.display();
})

delButton.addEventListener('click', () => {
    calculator.deleteNumber();
    calculator.display();
})

equalButton.addEventListener('click', () => {
    calculator.ifEqualsButtonIsPressed()
})  