// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// 設定情報
const firebaseConfig = {
  apiKey: "AIzaSyCvg4vv_bv2g0046Uk3WwRBXO6uEk-OAlk",
  authDomain: "daily-report-9af01.firebaseapp.com",
  projectId: "daily-report-9af01",
  storageBucket: "daily-report-9af01.appspot.com",
  messagingSenderId: "210147833617",
  appId: "1:210147833617:web:aeb99c8b6d8c0d142afeb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Cloud Firestore の初期化
const db = getFirestore(app);

// Cloud Firestoreから取得したデータを表示する
const fetchHistoryData = async () => {
  let tags = "";

  // reportsコレクションのデータを所得
  const querySnapshot = await getDocs(collection(db, "reports"));

  // データをテーブル表の形式に合わせてHTMLに挿入
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`
  });
  document.getElementById("js-history").innerHTML = tags;
};

// Cloud Firestore から取得したデータを表示する
if(document.getElementById("js-history")) {
  fetchHistoryData();
}

// Cloud Firestoreにデータを送信する
const submitData = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  try{
    const docRef = await addDoc(collection(db, "reports"), {
      date: new Date(),
      name: formData.get("name"),
      work: formData.get("work"),
      comment: formData.get("comment")
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e );
  }
}

if(document.getElementById("js-form")) {
  document.getElementById("js-form").addEventListener("submit",(e) => submitData(e));
};