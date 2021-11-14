let currentcalculation='0'
let temporaryres=''

const calculatorScreen = document.querySelector(".calculator-screen")
const calcres=document.querySelector(".calculator-screen-res")
const numbers = document.querySelectorAll(".number")
numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value)
        updateScreen(currentcalculation)
        calculate()
    })
})
const updateScreen = (number) => {
    calculatorScreen.value = number 
}
const updateRes = (res)=>{
    calcres.value=res
}
const inputNumber = (number) => {
    if (currentcalculation === '0') {
        if(number==="00"){
            currentcalculation='0'
        }
        else{
            currentcalculation = number
        }
    } else {
        currentcalculation += number
    }       
}

const operators = document.querySelectorAll(".operator")
 
operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        if(event.target.value==="-" && currentcalculation==='0'){
            currentcalculation=event.target.value
        }
        else{
            currentcalculation+=event.target.value
        }
        if(event.target.value==="%"){
            calculate()
        }
        updateScreen(currentcalculation)
    })
})
const check = (str)=>{

}

const calculate = () => {
    let result = ''
    let tempcalc=''
    let temp=currentcalculation
    let arrangka=['1','2','3','4','5','6','7','8','9','0']
    if(currentcalculation.includes('%')){
        for(let i=0;i<currentcalculation.length;i++){
            if(currentcalculation[i]==='%' && arrangka.includes(currentcalculation[i+1])){
                temp=currentcalculation.substring(0,i+1)+' *'+currentcalculation.substring(i+1,currentcalculation.length)
            }
        }
        tempcalc=temp.replace(/%/g,"/100")
        try {
            if(tempcalc.includes("**")){
                updateRes("Ungkapan Salah")
            }
            else{
                result=eval(tempcalc)
                updateRes(result)
            }
        } catch (error) {
            if(error instanceof SyntaxError){
                updateRes("Ungkapan Salah")
            }
        }
    }else{
        try {
            if(currentcalculation.includes("**")){
                updateRes("Ungkapan Salah")
            }
            else{
                result=eval(currentcalculation)
                updateRes(result)
            }
        } catch (error) {
            if(error instanceof SyntaxError){
                updateRes("Ungkapan Salah")
            }
        }
    }
}

const equalSign = document.querySelector(".equal-sign")

equalSign.addEventListener("click", () => {
    if(calcres.value==='' && calculatorScreen.value==='0'){
        updateScreen('0')
    }
    else if(calcres.value==='' && calculatorScreen.value!=='0'){
        updateScreen(calculatorScreen.value)
    }
    else{
    updateScreen(calcres.value)
    currentcalculation=calcres.value
    calcres.value=''
    }
})



const clearAll = () => {
    currentcalculation='0'
    temporaryres=''
    updateScreen(currentcalculation)
    updateRes('')
}
const clearBtn = document.querySelector(".all-clear")
clearBtn.addEventListener("click", () => {
    clearAll()
})

const decimal  = document.querySelector(".decimal")
decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value)
})
inputDecimal = (dot) => {
    if(currentcalculation.includes('.')) {
        return
    }
    currentcalculation += dot
    updateScreen(currentcalculation)
}


const backspace = document.querySelector(".back-space");
backspace.addEventListener("click",()=>{
    currentcalculation=currentcalculation.toString().slice(0, -1)
    updateScreen(currentcalculation)
    calculate()
})
