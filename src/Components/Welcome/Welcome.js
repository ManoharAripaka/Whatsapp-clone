import React, { useState } from "react";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import ForumIcon from "@mui/icons-material/Forum";
import "./Welcome.css";
import { useDispatch } from "react-redux";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import db, { authentication } from "../../Firebase";
import { updateDbChange, updateLoggedin, updateUser, updateUserId } from "../../Store/DataStore";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export default function Welcome() {
  const [request, setRequest] = useState(true);
  const dispatch = useDispatch();
  const generateCaptcha = () => { window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", { size: "invisible" }, authentication) };
  const requestOtp = () => {
    const phone = document.getElementsByClassName("phone")[0].value;
    const otpInput = document.querySelector(".otp");
    const number = "+91" + phone;
    if (phone.length === 10) {
      setRequest(true);
      otpInput.style.display = "flex";
      generateCaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, number, appVerifier)
        .then((response) => { window.confirmationResult = response })
        .catch((error) => { console.log(error) })
    }
  };
  const resendOtp = () => {
    const phone = document.getElementsByClassName("phone")[0].value;
    const number = "+91" + phone;
    if (phone.length === 10) {
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, number, appVerifier)
        .then((response) => { window.confirmationResult = response })
        .catch((error) => { console.log(error) });
    }
  };
  // const verifyOtp = () => {
  //   const otp = document.getElementsByClassName("otp")[0].value
  //   if (otp.length === 6) {
  //     const confirmationResult = window.confirmationResult;
  //     confirmationResult
  //       .confirm(otp)
  //       .then((result) => {
  //         console.log(result);
  //         const userName = result.user.phoneNumber;
  //         console.log(userName)
  //         const q = query(collection(db, userName))
  //         getDocs(q).then((query) => {
  //           console.log(query.docs)
  //           // dispatch(updateLoggedin(true))
  //           dispatch(updateUser(userName))
  //         })
  //       })
  //       .catch((error) => {console.log(error)});
  //   }
  // };
  const verifyOtp = () => {
    const userNumber = `+91${document.getElementsByClassName("phone")[0].value}`
    getDocs(collection(db, userNumber)).then((query) => {
      if (query.docs.length !== 0) {
        setDoc(doc(db, userNumber, userNumber), {
          image : query.docs[0]._document.data.value.mapValue.fields.image.stringValue,
          name: query.docs[0]._document.data.value.mapValue.fields.name.stringValue,
          number: query.docs[0]._document.data.value.mapValue.fields.number.stringValue
        });
      } else {
        setDoc(doc(db, userNumber, userNumber), {
          image : 'null',
          name : userNumber,
          number : userNumber
        })
      }
      dispatch(updateUser(userNumber))
      dispatch(updateUserId(userNumber))
      dispatch(updateLoggedin(true))
    });
  };

  return (
    <div className="main">
      <div className="welcome">
        <div className="icon">
          <CloudQueueIcon sx={{ fontSize: "200px" }} className="icon-cloud" />
          <ForumIcon sx={{ fontSize: "180px" }} className="icon-chat" />
          <h1>LM</h1>
        </div>
        <div className="text">
          <h2>Let Me Chat</h2>
        </div>
        <div className="number">
          <h4>+91</h4>
          <input className="phone" type="number" name="phonenumber" placeholder="- - - - - - - - - -" />
        </div>
        <input className="otp" type="number" name="otp" placeholder="Enter OTP" />
      </div>
      {request ? (
        <div>
          <button className="button" onClick={verifyOtp}>Signin</button>
          <p className="resend" onClick={resendOtp}>Resend OTP</p>
        </div>
      ) : (
        <button className="button" onClick={requestOtp}>Request OTP</button>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}
