const targetDate = new Date("2026-06-03").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  document.getElementById("days").innerText =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("hours").innerText =
    Math.floor((distance / (1000 * 60 * 60)) % 24);

  document.getElementById("minutes").innerText =
    Math.floor((distance / (1000 * 60)) % 60);

  document.getElementById("seconds").innerText =
    Math.floor((distance / 1000) % 60);
}, 1000);


// const items = document.querySelectorAll(".item");

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("show");
//     }
//   });
// }, {
//   threshold: 0.6
// });

// items.forEach(item => {
//   observer.observe(item);
// });

const items = document.querySelectorAll(".item");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
});

items.forEach(item => {
  item.style.animationPlayState = "paused";
  observer.observe(item);
});



// yüklənəndə göstər
window.onload = function () {
  const saved = localStorage.getItem("messages");
  if (saved) {
    document.getElementById("messages").innerHTML = saved;
  }
};

// // əlavə edəndə yadda saxla
// function addMessage() {
//   const name = document.getElementById("name").value;
//   const message = document.getElementById("message").value;

//   if (name === "" || message === "") return;

//   const container = document.getElementById("messages");

//   const newMessage = document.createElement("div");
//   newMessage.classList.add("message-box");
//   newMessage.innerHTML = "<strong>" + name + ":</strong> " + message;

//   container.appendChild(newMessage);

//   localStorage.setItem("messages", container.innerHTML);

//   document.getElementById("name").value = "";
//   document.getElementById("message").value = "";
// }




 // Import the functions you need from the SDKs you need
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries

  // // Your web app's Firebase configuration
  // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: "AIzaSyBlxEfFZGYrjTvaoKOlP50t6c0YXkncJr8",
  //   authDomain: "videolu-4153d.firebaseapp.com",
  //   projectId: "videolu-4153d",
  //   storageBucket: "videolu-4153d.firebasestorage.app",
  //   messagingSenderId: "768544251745",
  //   appId: "1:768544251745:web:e1be5c24e80816aac26f20",
  //   measurementId: "G-QPHV9WD5LF"
  // };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);




// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   deleteDoc,
//   doc,
//   onSnapshot
// } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAj6Po1z9UI4nGtRcKnsL1VGJaEWjdIukw",
//   authDomain: "video-c1f90.firebaseapp.com",
//   projectId: "video-c1f90",
//   storageBucket: "video-c1f90.firebasestorage.app",
//   messagingSenderId: "89260839827",
//   appId: "1:89260839827:web:3ae8e16d2f13cbe9b90e66"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // 📩 MESAJ GÖNDƏRMƏ
// window.sendMessage = async function () {
//   let msg = document.getElementById("msg").value;

//   await addDoc(collection(db, "messages"), {
//     text: msg,
//     time: Date.now()
//   });
// };

// // 🔄 REAL-TIME OXUMA
// onSnapshot(collection(db, "messages"), (snapshot) => {
//   let list = document.getElementById("list");
//   list.innerHTML = "";

//   snapshot.forEach((docItem) => {
//     let li = document.createElement("li");

//     li.innerHTML = `
//       ${docItem.data().text}
//       <button onclick="deleteMessage('${docItem.id}')">Sil</button>
//     `;

//     list.appendChild(li);
//   });
// });

// // 🗑️ SİLMƏ
// window.deleteMessage = async function (id) {
//   await deleteDoc(doc(db, "messages", id));
// };


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "video-92f58.firebaseapp.com",
  projectId: "video-92f58",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const messagesRef = collection(db, "messages");


// 📤 MESAJ GÖNDƏRMƏ
window.sendMessage = async function () {
  const name = document.getElementById("nameInput").value;
  const text = document.getElementById("msgInput").value;

  if (!name || !text) return;

  await addDoc(messagesRef, {
    name: name,
    text: text,
    createdAt: Date.now()
  });

  document.getElementById("msgInput").value = "";
};


// 📥 REAL TIME GÖSTƏRMƏ
const q = query(messagesRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    const div = document.createElement("div");
    div.classList.add("msg");

    div.innerHTML = `
      <strong class= "name">${data.name}</strong><strong class= "text">${data.text}</strong>
      
    `;

    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
});