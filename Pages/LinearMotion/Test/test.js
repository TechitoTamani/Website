// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import{getFirestore, getDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

//timer

// Get the countdown duration from localStorage
const inputMinutes = parseInt(localStorage.getItem("countdownMinutes"));
        
// Calculate the target time
const targetTime = new Date().getTime() + inputMinutes * 60 * 1000;

// Start the countdown
const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetTime - now;

    if (timeLeft > 0) {
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        if(hours < 10){
            hours = [0,hours].join("")
        }
        if(minutes < 10){
            minutes = [0,minutes].join("")
        }
        if(seconds < 10){
            seconds = [0,seconds].join("")
        }
        document.getElementById("countdown").innerHTML =
            `${hours}:${minutes}:${seconds}`;
    } else {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "Time's up!";
    }
}, 1000);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNYmk4_98bZAF1dC6l2qLzNaN1jxQZSz8",
  authDomain: "login-form-41214.firebaseapp.com",
  projectId: "login-form-41214",
  storageBucket: "login-form-41214.firebasestorage.app",
  messagingSenderId: "41268181973",
  appId: "1:41268181973:web:acc852fa5e9bacd8665b5c",
  measurementId: "G-Y6D3M3TJGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let questions =[]

// Initialize Firebase
const auth=getAuth();
const db=getFirestore();

const ChoiceList = document.querySelectorAll(".choice");
const SectionList = document.querySelectorAll(".num");

let limit = parseInt(localStorage.getItem('NumQ'));

let section = 0; // Current question index
let score = 0; // User's score

let your_answer = Array(limit).fill(0);

// Function to update the question and answers based on the current section
function updateQuestionAndAnswers(userData) {
    const questionData = userData.linear_1Current_Data.Question[section];

    // Update the question and answer elements
    document.getElementById('Question').innerText = `${section + 1}) ${questionData.question}`;
    document.getElementById('Ans1').innerText = questionData.answers[0].text;
    document.getElementById('Ans2').innerText = questionData.answers[1].text;
    document.getElementById('Ans3').innerText = questionData.answers[2].text;
    document.getElementById('Ans4').innerText = questionData.answers[3].text;
    makeItDarker()
    TopQuestion()

    console.log("section:",section)
}



// Firebase Authentication listener
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);

        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // Load the first question
                    updateQuestionAndAnswers(userData);
                } else {
                    console.error("No document found matching the user ID.");
                }
            })
            .catch((error) => {
                console.error("Error fetching document:", error);
            });
    } else {
        console.error("User ID not found in localStorage.");
    }
});

///AnswerClick///

function makeItDarker(){
    ChoiceList.forEach((button, index) => {
        if (!isNaN(your_answer[section]) && your_answer[section] === index + 1){
            button.style.backgroundColor = "#25739b";
        } else{
            button.style.backgroundColor = ""
        }
    })
}

ChoiceList.forEach((button, index) => {
    button.addEventListener('click',()=>{
        your_answer[section] = index+1;
        console.log(your_answer)
        makeItDarker()
    })
})

///Top Button///

document.getElementById('nextQbutton').addEventListener('click',()=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);

            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        let limit = userData.linear_1Current_Data.Question.length
                        if (section >= limit){
                            section = limit;
                        } 
                        else{
                            section++;
                            updateQuestionAndAnswers(userData);
                        }
                    }
                })  
                .catch((error) => {
                    console.error("Error fetching document:", error);
                });
        }  
        else {
            console.error("User ID not found in localStorage.");
        }
});

document.getElementById('backQbutton').addEventListener('click',()=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);

            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        if (section <= 0){
                            section = 0;
                        } 
                        else{
                            section--;
                            updateQuestionAndAnswers(userData);
                        }
                    }
                })  
                .catch((error) => {
                    console.error("Error fetching document:", error);
                });
        }  
        else {
            console.error("User ID not found in localStorage.");
        }
});

function handleButton(buttonNumber) {

    if (buttonNumber === 1) {
        if (section == 1) {
            section = section - 1;
        } else if (section >= 2 && section < limit - 2) {
            section = section - 2;
        } else if (section == limit - 2) {
            section = section - 3;
        } else if (section == limit - 1) {
            section = section - 4;
        }
    } else if (buttonNumber === 2) {
        if (section == 0) {
            section = section + 1;
        } else if (section >= 2 && section < limit - 2) {
            section = section - 1;
        } else if (section == limit - 2) {
            section = section - 2;
        } else if (section == limit - 1) {
            section = section - 3;
        }
    } else if (buttonNumber === 3) {
        if (section == 0) {
            section = section + 2;
        } else if (section == 1) {
            section = section + 1;
        } else if (section == limit - 2) {
            section = section - 1;
        } else if (section == limit - 1) {
            section = section - 2;
        }
    } else if (buttonNumber === 4) {
        if (section == 0) {
            section = section + 3;
        } else if (section == 1) {
            section = section + 2;
        } else if (section >= 2 && section < limit - 2) {
            section = section + 1;
        } else if (section == limit - 1) {
            section = section - 1;
        }
    } else if (buttonNumber === 5) {
        if (section == 0) {
            section = section + 4;
        } else if (section == 1) {
            section = section + 3;
        } else if (section >= 2 && section < limit - 2) {
            section = section + 2;
        } else if (section == limit - 2) {
            section = section + 1;
        }
    }
    console.log("section:", section);
}

// Set up event listeners for the buttons
['button1', 'button2', 'button3', 'button4', 'button5'].forEach((buttonId, index) => {
    document.getElementById(buttonId).addEventListener('click', () => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');

        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);

            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();

                        // Call handleButton with the button number (1 through 5)
                        handleButton(index + 1); // index + 1 because buttonId corresponds to button numbers 1 to 5
                        updateQuestionAndAnswers(userData);
                    } else {
                        console.error("No document found matching the user ID.");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching document:", error);
                });
        } else {
            console.error("User ID not found in localStorage.");
        }
    });
});

function TopQuestion(){
    let limit = localStorage.getItem('NumQ')
    const Button1 =document.getElementById('button1');
    const Button2 =document.getElementById('button2');
    const Button3 =document.getElementById('button3');
    const Button4 =document.getElementById('button4');
    const Button5 =document.getElementById('button5');
    const endbutton = document.getElementById('Endbutton');
    const Top = document.getElementById('Toppart')
    if (section==0){
        document.getElementById('button1').innerText = `${section + 1}`;
        document.getElementById('button2').innerText = `${section + 2}`;
        document.getElementById('button3').innerText = `${section + 3}`;
        document.getElementById('button4').innerText = `${section + 4}`;
        document.getElementById('button5').innerText = `${section + 5}`;
        Button1.style.backgroundColor='#77bde0'
        Button1.style.color='#ffffff'
        Button2.style.backgroundColor='#f4f4f4'
        Button2.style.color='#000000'
        Button3.style.backgroundColor='#f4f4f4'
        Button3.style.color='#000000'
        Button4.style.backgroundColor='#f4f4f4'
        Button4.style.color='#000000'
        Button5.style.backgroundColor='#f4f4f4'
        Button5.style.color='#000000'
        endbutton.style.display="none";
    }
    if (section==1){
        document.getElementById('button1').innerText = `${section}`;
        document.getElementById('button2').innerText = `${section + 1}`;
        document.getElementById('button3').innerText = `${section + 2}`;
        document.getElementById('button4').innerText = `${section + 3}`;
        document.getElementById('button5').innerText = `${section + 4}`;
        Button1.style.backgroundColor='#f4f4f4'
        Button1.style.color='#000000'
        Button2.style.backgroundColor='#77bde0'
        Button2.style.color='#ffffff'
        Button3.style.backgroundColor='#f4f4f4'
        Button3.style.color='#000000'
        Button4.style.backgroundColor='#f4f4f4'
        Button4.style.color='#000000'
        Button5.style.backgroundColor='#f4f4f4'
        Button5.style.color='#000000'
        endbutton.style.display="none";
    }
    if (section >= 2 && section < limit - 2){
        document.getElementById('button1').innerText = `${section - 1}`;
        document.getElementById('button2').innerText = `${section}`;
        document.getElementById('button3').innerText = `${section + 1}`;
        document.getElementById('button4').innerText = `${section + 2}`;
        document.getElementById('button5').innerText = `${section + 3}`;
        Button1.style.backgroundColor='#f4f4f4'
        Button1.style.color='#000000'
        Button2.style.backgroundColor='#f4f4f4'
        Button2.style.color='#000000'
        Button3.style.backgroundColor='#77bde0'
        Button3.style.color='#ffffff'
        Button4.style.backgroundColor='#f4f4f4'
        Button4.style.color='#000000'
        Button5.style.backgroundColor='#f4f4f4'
        Button5.style.color='#000000'
        endbutton.style.display="none";
    }
    if (section == limit - 2){
        document.getElementById('button1').innerText = `${section - 2}`;
        document.getElementById('button2').innerText = `${section - 1}`;
        document.getElementById('button3').innerText = `${section}`;
        document.getElementById('button4').innerText = `${section + 1}`;
        document.getElementById('button5').innerText = `${section + 2}`;
        Button1.style.backgroundColor='#f4f4f4'
        Button1.style.color='#000000'
        Button2.style.backgroundColor='#f4f4f4'
        Button2.style.color='#000000'
        Button3.style.backgroundColor='#f4f4f4'
        Button3.style.color='#000000'
        Button4.style.backgroundColor='#77bde0'
        Button4.style.color='#ffffff'
        Button5.style.backgroundColor='#f4f4f4'
        Button5.style.color='#000000'
        endbutton.style.display="none";
    }
    if (section == limit - 1){
        document.getElementById('button1').innerText = `${section - 3}`;
        document.getElementById('button2').innerText = `${section - 2}`;
        document.getElementById('button3').innerText = `${section - 1}`;
        document.getElementById('button4').innerText = `${section}`;
        document.getElementById('button5').innerText = `${section + 1}`;
        Button1.style.backgroundColor='#f4f4f4'
        Button1.style.color='#000000'
        Button2.style.backgroundColor='#f4f4f4'
        Button2.style.color='#000000'
        Button3.style.backgroundColor='#f4f4f4'
        Button3.style.color='#000000'
        Button4.style.backgroundColor='#f4f4f4'
        Button4.style.color='#000000'
        Button5.style.backgroundColor='#77bde0'
        Button5.style.color='#ffffff'
        endbutton.style.display="block";
        Top.style.marginLeft="27%"
    }

}

///Check///

document.getElementById('Endbutton').addEventListener('click',()=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);

            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        let QA = userData.linear_1Current_Data.Question
                        QA.forEach((sec,index) => {
                            if(your_answer[index] > 0 && sec.answers[your_answer[index]-1].correct){
                                score++;
                                // console.log(score);
                            }
                        })

                        const questionData = userData.linear_1Current_Data;

                        questionData.Answer = your_answer 
                        questionData.score = score

                        updateDoc(docRef, {
                            linear_1Current_Data : questionData,
                        });

                        console.log(score);
                        document.getElementById('Question').style.display='none';
                        document.getElementById('point').innerText = `score = ${score}`;
                        document.getElementById('confirm').style.display='block';
                        document.getElementById('cancle').style.display='block';
                        document.getElementById('Ans1').style.display='none';
                        document.getElementById('Ans2').style.display='none';
                        document.getElementById('Ans3').style.display='none';
                        document.getElementById('Ans4').style.display='none';
                        document.getElementById('doyou').style.display='block';
                    }
                })  
                .catch((error) => {
                    console.error("Error fetching document:", error);
                });
        }  
        else {
            console.error("User ID not found in localStorage.");
        }
});

//////
let alreadyclick = false;
const sectioninput = document.getElementById('select_section');
const sectionpoint = document.getElementById('button_selection');
const Top = document.getElementById('Toppart')
sectionpoint.addEventListener('click',()=>{
    if (alreadyclick == false){
        sectioninput.classList.add('show');
        sectionpoint.style.backgroundColor='#77bde0';
        sectionpoint.style.color='#f4f4f4';
        alreadyclick = true;
    } else {
        sectioninput.classList.remove('show');
        sectionpoint.style.backgroundColor='#f4f4f4';
        sectionpoint.style.color='#000000';
        alreadyclick = false;
    }
});

const inputField = document.getElementById('section_select'); // Get the input field

inputField.addEventListener('keydown', (event) => {
    // Check if the key pressed is Enter (key code 13)
    if (event.key === 'Enter') {
        event.preventDefault(); // Optional: prevent the default behavior (if needed)

        const loggedInUserId = localStorage.getItem('loggedInUserId');
        console.log("Enter pressed");

        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);

            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        let limit = userData.linear_1Current_Data.Question.length;
                        const partselection = inputField.value; // Get value from the input field

                        // Convert input to a number
                        const partselectionNumber = Number(partselection);

                        // Check if the input is a valid number
                        if (isNaN(partselectionNumber) || partselectionNumber <= 0) {
                            alert("Number must be greater than 0");
                        } else if (partselectionNumber >= 1 && partselectionNumber <= limit) {
                            section = partselectionNumber - 1;
                            updateQuestionAndAnswers(userData);
                        } else if (partselectionNumber > limit) {
                            alert("Number must be lesser than Question Number");
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching document:", error);
                });
        } else {
            console.error("User ID not found in localStorage.");
        }
    }
});

//saveQuestion//

document.getElementById('confirm').addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        // Reference to the user's Firestore document
        const userId = localStorage.getItem("loggedInUserId");
        const userDocRef = doc(db, "users", userId);
        const docSnap = await getDoc(userDocRef);
        const userData = docSnap.data();

        // Update Firestore document

        const questionData = userData.linear_1Data;
        console.log(questionData);

        if (questionData == undefined){
            await updateDoc(userDocRef, {
                linear_1Data: [userData.linear_1Current_Data],
            });
        }
        else{
            await updateDoc(userDocRef, {
                linear_1Data: [...questionData,userData.linear_1Current_Data],
            });
        }

        // Redirect to test page
        window.location.href = "../../Home/Home.html";
    } catch (error) {
        console.error("Error updating user info: ", error);
        alert("Failed to update number of questions. Please try again.");
    }
});

document.getElementById('cancle').addEventListener("click", () => {
    window.location.href = "Home.html";
});