// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import{getFirestore, getDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
import { RunAll } from "../../../QuiZGenQ/QData/RunAll.js";
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

document.getElementById("startButton").addEventListener("click", async (event) => {
    event.preventDefault();

    // Get input values
    const inputMinutes = parseInt(document.getElementById("timeInput").value);
    const NumberOfQuestion = parseInt(document.getElementById("NumberOfQuestion").value);

    // Validate inputs
    if (isNaN(NumberOfQuestion) || NumberOfQuestion <= 0) {
        alert("Please enter a valid number of questions.");
        return;
    }
    if (NumberOfQuestion > 100) {
        alert("The maximum number of questions that can be generated is 100.");
        return;
    }
    if (isNaN(inputMinutes) || inputMinutes <= 0) {
        alert("Please enter a valid time greater than 0.");
        return;
    }
    else {
        // Generate questions
    const questions = RunAll(NumberOfQuestion);
    console.log(questions);

    try {
        // Reference to the user's Firestore document
        const userId = localStorage.getItem("loggedInUserId");
        const userDocRef = doc(db, "users", userId);
        const docSnap = await getDoc(userDocRef);
        const userData = docSnap.data();
        const thailandDate = new Date().toLocaleDateString('en-TH', { timeZone: 'Asia/Bangkok' });

        // Update Firestore document
        await updateDoc(userDocRef, {
            linear_1Current_Data: { Question: questions, Answer: [] ,score: 0,Topic: "LinearMotion",Date: thailandDate },
        });

        // Save data in localStorage
        localStorage.setItem("countdownMinutes", inputMinutes);
        localStorage.setItem("NumQ", NumberOfQuestion);

        // Redirect to test page
        window.location.href = "../Test/test.html";
    } catch (error) {
        console.error("Error updating user info: ", error);
        alert("Failed to update number of questions. Please try again.");
    }
    }
});