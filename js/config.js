var firebaseConfig = {
    apiKey: "AIzaSyARmTaggGBWnkJvS2Stc-H4wsJeejpcR_8",
    authDomain: "dev18-chat-15a8a.firebaseapp.com",
    databaseURL: "https://dev18-chat-15a8a.firebaseio.com",
    projectId: "dev18-chat-15a8a",
    storageBucket: "dev18-chat-15a8a.appspot.com",
    messagingSenderId: "79031230023",
    appId: "1:79031230023:web:55ef84d4199bad079f1b62"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



let domain = document.domain;
let port   = (domain === 'localhost')?  5000:80;

