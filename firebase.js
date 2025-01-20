import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsRjpIeHgwVsu_mheRVHP3hNUU3Y1vI1g",
  authDomain: "cds22formulaa-b624d.firebaseapp.com",
  projectId: "cds22formulaa-b624d",
  storageBucket: "cds22formulaa-b624d.firebasestorage.app",
  messagingSenderId: "706465760786",
  appId: "1:706465760786:web:a39a0519eec2c65cddbacb",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
document.getElementById("contectForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  console.log(name, email, message);

  saveMessage(name, email, message);

  document.getElementById("contectForm").reset();
}

function saveMessage(name, email, message) {
  const messageRef = ref(database, "messages");
  const newMessageRef = push(messageRef);

  set(newMessageRef, {
    name: name,
    email: email,
    message: message,
  })
    .then(() => {
      alert("Message submitted");
    })
    .catch((error) => {
      console.error("Error: ", error);
      alert("Try again.");
    });
}
