import firebse from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export const firebaseConfig = {
    apiKey: "AIzaSyD8BpfGWA5l25NG5Z6hzNKJ_yVSXalzznQ",
    authDomain: "otpapp-d2e77.firebaseapp.com",
    projectId: "otpapp-d2e77",
    storageBucket: "otpapp-d2e77.appspot.com",
    messagingSenderId: "163929466077",
    appId: "1:163929466077:web:eb80b5c1464807d4766734",
    measurementId: "G-GX50JBK6E7"
  };

  if(!firebse.apps.length){
    firebse.initializeApp(firebaseConfig);
  }
  