import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "./Name.css";
import { useDispatch, useSelector } from "react-redux";
import { updateDbChange, updateEdit, updateUserDetails } from "../../Store/DataStore";
import { getDocs, doc, setDoc, query, collection } from "firebase/firestore";
import db from "../../Firebase";

export default function Name() {
  const { edit, user, dbChange, userId } = useSelector((state) => state.data);
  const [userData, setUserData] = useState()
  const dispatch = useDispatch();
  useEffect(() => {
    const q = query(collection(db, `${user}`));
    getDocs(q).then((query) => {
      setUserData(query.docs);
      dispatch(updateUserDetails(query.docs[0]._document.data.value.mapValue.fields.name.stringValue))
    });
  }, [dbChange]);
  const clickAction = () => {
    dispatch(updateEdit("none"));
    let namee = document.getElementById("textt").value;
    let imagee = document.getElementById("file").value;
    if (namee !== "" && imagee !== "") {
      setDoc(doc(db, `${user}`, `${userId}`), {image : imagee, name : namee, number : userData[0]._document.data.value.mapValue.fields.number.stringValue})
      console.log("1");
    } else if (imagee !== "") {
      setDoc(doc(db, `${user}`, `${userId}`), {image : imagee, name : userData[0]._document.data.value.mapValue.fields.name.stringValue, number : userData[0]._document.data.value.mapValue.fields.number.stringValue})
      console.log("2");
    } else if (namee !== "") {
      setDoc(doc(db, `${user}`, `${userId}`), {image : userData[0]._document.data.value.mapValue.fields.image.stringValue, name : namee, number : userData[0]._document.data.value.mapValue.fields.number.stringValue})
      console.log("3");
    }
    document.getElementById("textt").value = "";
  };

  return (
    <div className="mainn" style={{ display: edit }}>
      <div className="nameChange">
        <PersonIcon id="imageIcon" />
        <input id="file" type="file" name="file" />
        <input id="textt" type="text" name="name" placeholder='Enter your Name' />
        <button id="save" onClick={clickAction}>Save</button>
      </div>
    </div>
  );
}
