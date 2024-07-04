// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { fetchHistoryData } from "./my-modules/fetch-history-data";
import { submitData } from "./my-modules/submit-data";

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

// Cloud Firestore から取得したデータを表示する
if(document.getElementById("js-history")) {
  fetchHistoryData(getDocs, collection, db);
}

// Cloud Firestoreにデータを送信する
if(document.getElementById("js-form")) {
  document.getElementById("js-form").addEventListener("submit",(e) => 
    submitData(e, addDoc, collection, db));
};