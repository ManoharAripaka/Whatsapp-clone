import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import "./Chats.css";
import db from "../../Firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { updateChatId, updateChatName, updateChats } from "../../Store/DataStore";
import { useDispatch, useSelector } from "react-redux";

export default function Chats() {
  const { user, userId, dbChange } = useSelector((state) => state.data);
  const [data, setData] = useState();
  const [lastMessage, setLastMessage] = useState({});
  const [time, setTime] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const a = query(collection(db, `${user}/${userId}/chats`), orderBy("timestamp", "desc"));
    getDocs(a).then((querySnapshot) => {
      console.log(querySnapshot)
      setData(querySnapshot.docs);
      setLastMessage([]);
      setTime([]);
      querySnapshot?.docs.map((chat) => {
        const q = query(collection(db, `${user}/${userId}/chats/${chat.id}/messages`), orderBy("timestamp", "asc"));
        getDocs(q).then((query) => {
          if (query.docs.length !== 0) {
            setLastMessage((arr) => [...arr, query.docs[query.docs.length - 1]._document.data.value.mapValue.fields.message.stringValue]);
            setTime((arr) => [...arr, query.docs[query.docs.length - 1]._document.data.value.mapValue.fields.timestamp.arrayValue.values[1].stringValue]);
          }
        });
      });
    });
  }, [dbChange])
  const sendData = (chat) => {
    dispatch(updateChatId(chat.id))
    dispatch(updateChatName(chat._document.data.value.mapValue.fields.name.stringValue))
  };

  return (
    <div className="no">
      {data ? (
        <div className="chats">
          {data?.map((chat) => (
            <div>
              <div className="chat" onClick={() => sendData(chat)}>
                <div className="chat-left">
                  <PersonIcon id="chat-icon" />
                </div>
                <div className="chat-center">
                  <p id="profile">
                    {chat._document.data.value.mapValue.fields.name.stringValue}
                  </p>
                  {lastMessage.length !== 0 ? (
                    <p id="text">{lastMessage[data.indexOf(chat)]}</p>
                  ) : (
                    <p id="text"></p>
                  )}
                </div>
                <div className="chat-right">
                  {time.length !== 0 ? (
                    <p id="time">{time[data.indexOf(chat)]}</p>
                  ) : (
                    <p id="time"></p>
                  )}
                  <p id="count">10</p>
                </div>
              </div>
              <hr id="line" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
