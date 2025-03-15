import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";


let variables = [];
let randomValues = {};
let equation  = "(s1/5)**(1/2)";
let limitRandom = {s1:100}
const question_text = "name นอนอยู่บนพื้น มองเห็นแอปเปิ้ลอยู่เหนือหัวตัวเอง s1 เมตร เริ่มหล่นลงมาจากต้น name ต้องหลบภายในเวลากี่วินาทีเพิ่อให้ลูกแอปเปิ้ลไม่หล่นลงมากระทบเขา".split(" ")

let result;

function generateRandomValues() {
    // Extract variables (letters) from the equation
    const variableNames = equation.match(/[a-zA-Z_]\w*/g) || [];
    variables = Array.from(new Set(variableNames)); // Unique variable names
    randomValues = {}; // Reset previous random values

    const variableInputsContainer = document.getElementById('variableInputs');
    variableInputsContainer.innerHTML = ''; // Clear previous inputs

    // Generate random values for each variable
    variables.forEach((variable) => {
        const randomValue = Math.floor(Math.random() * limitRandom[variable]) + 1;  // Random value between 1 and 10
        randomValues[variable] = randomValue;
        console.log(variable)

        const div = document.createElement('div');
        div.innerHTML = `<label for="${variable}">${variable} = </label><span id="${variable}">${randomValue}</span>`;
        variableInputsContainer.appendChild(div);
    });
}

function calculateAnswer() {

    // Continuously try until the result is an integer
    do {
        let evalEquation = equation;

        // Replace variables with their random values
        for (const [key, value] of Object.entries(randomValues)) {
            evalEquation = evalEquation.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
        }

        try {
            // Evaluate the modified equation
            result = eval(evalEquation);

            // Check if the result is an integer
            if (Number.isInteger(result)) {
                break;  // If result is an integer, exit the loop
            } else {
                // If the result is not an integer, generate new random values
                generateRandomValues();
            }
        } catch (error) {
            document.getElementById('output').innerText = "There was an error evaluating the equation.";
            return;
        }
    } while (!Number.isInteger(result));  // Loop until an integer result is found

    document.getElementById('output').innerHTML = `
        <strong>Equation:</strong> ${equation}<br>
        <strong>Values:</strong> ${variables.map(variable => `${variable}=${randomValues[variable]}`).join(', ')}<br>
        <strong>Result:</strong> ${result}
    `;
    variables.forEach((variable) => {
        console.log(randomValues[variable])
        console.log(variable)
    });
}

export function GenRandom(){


    let Ans = [];
    let textAns ;

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม","แซค"]

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    variables.forEach((variable) => {
        for (let i = 0; i < question_text.length; i++) {
            if (question_text[i] == "name"){
                question_text[i] = ""
                question_text[i+1] = Name+question_text[i+1]
            }
            else if (question_text[i] == variable){
                question_text[i] = randomValues[variable]
            }
        }
    });

    // RandomAnsCode

    let choice = [result]

    let choiceAmount = 4

    while (choice.length < choiceAmount) {
        let WrongChoice = choice[(getRandomIntMN(0,(choice.length)-1))]+(1*((-1)**(getRandomIntMN(0,1))))
        
        while (WrongChoice <= 0) {
            WrongChoice = choice[(getRandomIntMN(0,(choice.length)-1))]+(1*((-1)**(getRandomIntMN(0,1))))
        }

        if (AnsNotIn(choice,WrongChoice)) {
            choice = [...choice,WrongChoice]
        }
    }

    // PrintCode

    let questionPrint = question_text.join(" ")

    choice.sort()
    
    for (let j = 0; j < choice.length; j++) {

        textAns = ([1,choice[j]].join(") "))

        if (choice[j] == result){
            Ans = [...Ans,{ text: textAns, correct: true}]
        }
        else {
            Ans = [...Ans,{ text: textAns, correct: false}]
        }
    }

    let box = {
        question: questionPrint,
        answers: Ans
    };

    console.log(box)

    return box ;
}

generateRandomValues();
calculateAnswer();
GenRandom();