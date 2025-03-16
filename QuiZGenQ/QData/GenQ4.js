import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ4(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "รถยนต์คันหนึ่งวิ่งด้วยความเรื่องคงที่ u เมตรต่อวินาที ขณะที่อยู่ห่างสิ่งกีดขวางเป็นระยะทาง x เมตร คนขับตัดสินใจห้ามล้อรถโดยเสียเวลา t วินาที ก่อนที่ห้ามล้อจะทำงาน เมื่อห้ามล้อทำงานแล้ว รถจะต้องลดความเร็วในอัตราเท่าใด จึงทำให้รถหยุดพอดีเมื่อสิ่งขีดขวางนั้น".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let u = (getRandomIntMN(1, 100))
    let x = (getRandomIntMN(1, 100))
    let t = (getRandomIntMN(1, 100))

    while (!Number.isInteger(u/(2*x*(u*t-1)))) {
        u = (getRandomIntMN(1, 100))
        x = (getRandomIntMN(1, 100))
        t = (getRandomIntMN(1, 100))
    }


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "u"){
            question_text[i] = u
        }
        else if (question_text[i] == "x"){
            question_text[i] = x
        }
        else if (question_text[i] == "t"){
            question_text[i] = t
        }
    }

    // Anscode

    let result = u/(2*x*(u*t-1))
    let choice = [result]

    // RandomAnsCode

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

        let textAns = ([j+1,choice[j]].join(") "))

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
    // console.log(box) // check

    return box ;
}