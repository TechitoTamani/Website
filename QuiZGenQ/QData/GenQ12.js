import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ12(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "สะพานสูงจากน้ำ h เมตร บอลลูนลูกหนึ่งกำลังเคลื่อนที่ลงสู่พื้น และขณะที่บอลลูนอยู่สูงจากสะพาน x เมตร คนที่อยู่บนบอลลูน และคนที่ยืนอยู่ที่สะพานได้ปล่อยก้อนหินออกไปคนละก้อนในเวลาเดียวกัน ปรากฎว่าก้อนหินทั้งสองก้อนตกถึงผิวน้ำพร้อมกัน ถามว่าก้อนหินที่ตกจากบอลลลูนผ่านระดับสะพานจะมีความเร็วกี่เมตรต่อวินาที".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let x = (getRandomIntMN(1, 100))
    let h = (getRandomIntMN(1, 100))

    while (!Number.isInteger(((((5/h)*x*x)+(20*x))**(1/2)))) {
        x = (getRandomIntMN(1, 100));
        h = (getRandomIntMN(1, 100));
    }


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "x"){
            question_text[i] = x
        }
        else if (question_text[i] == "h"){
            question_text[i] = h
        }
    }

    // Anscode

    let result = ((((5/h)*x*x)+(20*x))**(1/2))
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