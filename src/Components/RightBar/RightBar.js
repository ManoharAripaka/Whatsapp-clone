import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import MoodIcon from "@mui/icons-material/Mood";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import ForumIcon from "@mui/icons-material/Forum";
import "./RightBar.css";
import RightBody from "../RightBody/RightBody";
import { useDispatch, useSelector } from "react-redux";
import { updateDbChange, updateNameChange } from "../../Store/DataStore";
import { addDoc, collection, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import db from "../../Firebase";
import EditIcon from '@mui/icons-material/Edit';

export default function RightBar() {
  const { chats, user, userId, userDetails, chatId, chatName } = useSelector((state) => state.data);
  const dispatch = useDispatch()
  const sendMessage = () => {
    const inputValue = document.getElementsByClassName('input')[0].value
    document.getElementsByClassName('input')[0].value = ''
    addDoc(collection(db, `${user}/${userId}/chats/${chatId}/messages`),{
      message : inputValue,
      name : userDetails,
      timestamp : [new Date().toLocaleString(), new Date().toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"})]
    })
    const q = query(collection(db, `${user}/${userId}/chats`), where("number", "==", chatId));
    getDocs(q).then((querySnapshot) => {
      const a = query(collection(db, `${user}/${userId}/chats/${chatId}/messages`), orderBy("timestamp", "asc"))
      getDocs(a).then((query) => {
        console.log(querySnapshot.docs)
        setDoc(doc(db, `${user}/${userId}/chats`, `${chatId}`), {
          image : querySnapshot.docs[0]._document.data.value.mapValue.fields.image.stringValue,
          name : querySnapshot.docs[0]._document.data.value.mapValue.fields.name.stringValue,
          number : querySnapshot.docs[0]._document.data.value.mapValue.fields.number.stringValue,
          timestamp : [query.docs[query.docs.length - 1]._document.data.value.mapValue.fields.timestamp.arrayValue.values[0].stringValue, query.docs[query.docs.length - 1]._document.data.value.mapValue.fields.timestamp.arrayValue.values[1].stringValue]
        })
      })
    })
    const b = query(collection(db, `${user}`))
    getDocs(b).then((query) => {
      console.log(query)
      setDoc(doc(db, `${chatId}/${chatId}/chats`, `${userId}`),{
        image : query.docs[0]._document.data.value.mapValue.fields.image.stringValue,
        name : query.docs[0]._document.data.value.mapValue.fields.number.stringValue,
        number : query.docs[0]._document.data.value.mapValue.fields.number.stringValue,
        timestamp : [new Date().toLocaleString(), new Date().toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"})]
      })
      addDoc(collection(db, `${chatId}/${chatId}/chats/${userId}/messages`),{
        message : inputValue,
        name : userId,
        timestamp : [new Date().toLocaleString(), new Date().toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"})]
      })
    })
  }
  return (
    <div className="rightbar">
      {chatId ? (
        <>
          <div className="righttop">
            <PersonIcon className="top-icon" />
            <p id="profile">{chatName}</p>
            <EditIcon id ='editName' onClick={() => dispatch(updateNameChange('flex'))}/>
          </div>
          <div className="middle">
            <RightBody />
          </div>
          <div className="rightbottom">
            <MoodIcon id="emoji" />
            <AttachFileIcon id="attach" />
            <input className='input' placeholder="Type a message" />
            <SendIcon id="send" onClick={sendMessage}/>
          </div>
        </>
      ) : (
        <div className="welcomee">
          <div className="iconn">
            <CloudQueueIcon sx={{ fontSize: "200px" }} className="icon-cloud" />
            <ForumIcon sx={{ fontSize: "180px" }} className="icon-chatt" />
            <h1>LM</h1>
          </div>
          <div className="text">
            <h2>Let Me Chat</h2>
          </div>
          <p id='welcome'>Welcome Manohar</p>
        </div>
      )}
    </div>
  );
}
