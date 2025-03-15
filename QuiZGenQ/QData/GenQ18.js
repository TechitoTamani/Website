import { AnsNotIn, getRandomInt, getRandomIntMN, ArrayEqual, ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ18() {

    let Ans = [];
    let TF = [false, false, false, false]

    const namelist = ["ชิ", "วิน", "สายฟ้า", "โฟ", "ต้นตาล", "ภีม"]
    const question_text = "วัตถุก้อนหนึ่งถูกปล่อยให้ตกลงมาในแนวดิ่งอีกก้อนตกลงมาด้วยความเร็วต้น u m/s จงหาว่าอีกนานเท่าไรวัตถุทั้งสองจึงจะอยู่ห่างกัน h เมตร (กำหนดค่าแรงโน้มถ่วง เท่ากับ 10 เมตร/วินาทีกำลังสอง)".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length) - 1)]

    let u = (getRandomIntMN(1, 100))
    let h = (getRandomIntMN(1, 100))

    let result = parseFloat(((18 ** 2) * 10 / (2 * (u ** 2))).toFixed(2));
    while (isNaN(result) || !isFinite(result) || result <= 1) {
        u = (getRandomIntMN(1, 100))
        h = (getRandomIntMN(1, 100))
        result = parseFloat(((18 ** 2) * 10 / (2 * (u ** 2))).toFixed(2));
    }

    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name") {
            question_text[i] = Name
        }
        else if (question_text[i] == "u") {
            question_text[i] = u
        }
        else if (question_text[i] == "h") {
            question_text[i] = h
        }
    }

    // Anscode

    let choice = [result]

    // RandomAnsCode

    let choiceAmount = 4

    while (choice.length < choiceAmount) {
        let WrongChoice = parseFloat((choice[(getRandomIntMN(0, (choice.length) - 1))] + (1 * ((-1) ** (getRandomIntMN(0, 1))))).toFixed(2));

        while (WrongChoice <= 1) {
            WrongChoice = parseFloat((choice[(getRandomIntMN(0, (choice.length) - 1))] + (1 * ((-1) ** (getRandomIntMN(0, 1))))).toFixed(2));
        }

        if (AnsNotIn(choice, WrongChoice)) {
            choice = [...choice, WrongChoice]
        }
    }

    // PrintCode

    let questionPrint = question_text.join(" ")

    choice.sort()

    for (let j = 0; j < choice.length; j++) {

        let textAns = ([j + 1, choice[j]].join(") "))

        if (choice[j] == result) {
            Ans = [...Ans, { text: textAns, correct: true }]
        }
        else {
            Ans = [...Ans, { text: textAns, correct: false }]
        }
    }

    let box = {
        question: questionPrint,
        answers: Ans
    };
    // console.log(box) // check

    return box;
}