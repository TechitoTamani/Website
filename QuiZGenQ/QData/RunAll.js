import { getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";
import { GenRandomQ0 } from "/QuiZGenQ/QData/GenQ0.js";
import { GenRandomQ1 } from "/QuiZGenQ/QData/GenQ1.js";
import { GenRandomQ2 } from "/QuiZGenQ/QData/GenQ2.js";
import { GenRandomQ3 } from "/QuiZGenQ/QData/GenQ3.js";
import { GenRandomQ4 } from "/QuiZGenQ/QData/GenQ4.js";
import { GenRandomQ6 } from "/QuiZGenQ/QData/GenQ6.js";
import { GenRandomQ8 } from "/QuiZGenQ/QData/GenQ8.js";
import { GenRandomQ16 } from "/QuiZGenQ/QData/GenQ16.js";
import { GenRandomQ18 } from "/QuiZGenQ/QData/GenQ18.js";
import { GenRandomQ22 } from "/QuiZGenQ/QData/GenQ22.js";

// export function RunAll(NumberOfQuestion){

//     let questions = []

//     for (let k = 0 ; k < NumberOfQuestion ; k++){
        
//         let NQ = getRandomIntMN(1,2);

//         if(NQ == 1){
//             questions = [...questions,GenRandomQ1()];
//         }else if(NQ == 2){
//             questions = [...questions,GenRandomQ2()];
//         }
//     }

//     return(questions);
// }

export function RunAll(NumberOfQuestion) {
    let questions = [];
    // let availableNumbers = [0,1,2,3,6,16,22];  // The available numbers to choose from
    let availableNumbers = [8]; // test function

    for (let k = 0; k < NumberOfQuestion; k++) {
        // Check if there are any unused numbers
        if (availableNumbers.length === 0) {
            // Reset available numbers
            // availableNumbers = [0,1,2,3,6,16,22];
            availableNumbers = [8,4,18]; // test function
        }

        // Pick a random number from available numbers
        let randomIndex = Math.floor(Math.random() * availableNumbers.length);
        let NQ = availableNumbers.splice(randomIndex, 1)[0];  // Remove the picked number from available numbers

        if (NQ == 0) {
            questions = [...questions, GenRandomQ0()];
        } 
        else if (NQ == 1) {
            questions = [...questions, GenRandomQ1()];
        } 
        else if (NQ == 2) {
            questions = [...questions, GenRandomQ2()];
        } 
        else if (NQ == 3) {
            questions = [...questions, GenRandomQ3()];
        } 
        else if (NQ == 4) {
            questions = [...questions, GenRandomQ4()];
        } 
        else if (NQ == 6) {
                questions = [...questions, GenRandomQ6()];
            } 
        else if (NQ == 8) {
            questions = [...questions, GenRandomQ8()];
        } 
        else if (NQ == 16) {
            questions = [...questions, GenRandomQ16()];
        } 
        else if (NQ == 18) {
            questions = [...questions, GenRandomQ18()];
        }
        else if (NQ == 22) {
            questions = [...questions, GenRandomQ22()];
        } 

    }

    return questions;
}
