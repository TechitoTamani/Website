import { getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ0(){

    let Ans;
    let Ans1;
    let Ans2;
    let Ans3;
    let Ans4;

    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "นาย name วิ่งทางตรงเป็นระยะทาง s1 เมตร ใช้เวลา t1 วินาที แล้ววิ่งกลับทางเดิม s2 เมตร ใช้เวลา t2 วินาที จึงหยุด จงหาอัตราเร็วเฉลี่ยและความเร็วเฉลี่ยในหน่วยเมตรต่อวินาทีตามลำดับ".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let s1 = (getRandomIntMN(1, 10))*10
    let t1 = (getRandomIntMN(1, 10))
    let s2 = (getRandomIntMN(1, 10))*10
    let t2 = (getRandomIntMN(1, 10))

    while (((s1+s2)%(t1+t2)) != 0 || ((s1-s2)%(t1+t2)) != 0) {
        s1 = (getRandomIntMN(1, 10))*10
        t1 = (getRandomIntMN(1, 10))
        s2 = (getRandomIntMN(1, 10))*10
        t2 = (getRandomIntMN(1, 10))
    }


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "s1"){
            question_text[i] = s1
        }
        else if (question_text[i] == "s2"){
            question_text[i] = s2
        }
        else if (question_text[i] == "t1"){
            question_text[i] = t1
        }
        else if (question_text[i] == "t2"){
            question_text[i] = t2
        }
    }

    // Anscode

    let Answer1 = ((s1+s2)/(t1+t2))
    let Answer2 = ((s1-s2)/(t1+t2))

    Ans = [Answer1,Answer2]

    // RandomAnsCode

    let choice = [Ans]

    let choiceAmount = 4

    while (choice.length < choiceAmount) {
        let WrongChoice1 = choice[(getRandomIntMN(0,(choice.length)-1))][0]+(1*((-1)**(getRandomIntMN(0,1))))
        
        while (WrongChoice1 < 0) {
            WrongChoice1 = choice[(getRandomIntMN(0,(choice.length)-1))][0]+(1*((-1)**(getRandomIntMN(0,1))))
        }

        let WrongChoice2 = choice[(getRandomIntMN(0,(choice.length)-1))][1]+(1*((-1)**(getRandomIntMN(0,1))))

        let WrongChoice = [WrongChoice1,WrongChoice2]

        if (ArrayNotIn(choice,WrongChoice)) {
            choice = [...choice,WrongChoice]
        }
    }

    // PrintCode

    let questionPrint = question_text.join(" ")

    choice.sort()
    
    for (let j = 0; j < choice.length; j++) {
        if (choice[j] == Ans){
            TF[j] = true;
        }
    }

    Ans1 = ([1,([choice[0][0],choice[0][1]].join(" , "))].join(") "))
    Ans2 = ([2,([choice[1][0],choice[1][1]].join(" , "))].join(") "))
    Ans3 = ([3,([choice[2][0],choice[2][1]].join(" , "))].join(") "))
    Ans4 = ([4,([choice[3][0],choice[3][1]].join(" , "))].join(") "))

    let box = {
        question: questionPrint,
        answers:[
            { text: Ans1, correct: TF[0]},
            { text: Ans2, correct: TF[1]},
            { text: Ans3, correct: TF[2]},
            { text: Ans4, correct: TF[3]}
        ]
    };

    return box ;
}