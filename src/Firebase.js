import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

/* First LM chat */
// const firebaseConfig = {
//   apiKey: "AIzaSyBtBepPiYT5-9MWQnMvTtOmhWUmHAjy8WA",
//   authDomain: "lm-chat-c9700.firebaseapp.com",
//   projectId: "lm-chat-c9700",
//   storageBucket: "lm-chat-c9700.appspot.com",
//   messagingSenderId: "379728497674",
//   appId: "1:379728497674:web:5976304116047aad4e23f3",
//   measurementId: "G-V8G4F24GL1",
// };

/* newChat */
// const firebaseConfig = {
//   apiKey: "AIzaSyAv6ABy-l3qhH441nZ7gzJVGOf-_efq3hc",
//   authDomain: "newchat-7f86c.firebaseapp.com",
//   projectId: "newchat-7f86c",
//   storageBucket: "newchat-7f86c.appspot.com",
//   messagingSenderId: "448178168442",
//   appId: "1:448178168442:web:a31db2d507321d9cfc91c3",
//   measurementId: "G-SRM5FKEFJ3"
// };

/* newChat2 */
const firebaseConfig = {
  apiKey: "AIzaSyBbd-2DwoQByEeXt1uPs0G-42C_ItbAp08",
  authDomain: "lmchat-3d9db.firebaseapp.com",
  projectId: "lmchat-3d9db",
  storageBucket: "lmchat-3d9db.appspot.com",
  messagingSenderId: "1041773347385",
  appId: "1:1041773347385:web:be9ae54bb37009e7a403e8",
  measurementId: "G-KRG5STBVXJ"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const authentication = getAuth(app)
export default db



