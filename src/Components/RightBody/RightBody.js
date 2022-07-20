import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import db from "../../Firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./RightBody.css";

export default function RightBody() {
  const { dbChange, user, userId, userDetails, chatId } = useSelector((state) => state.data);
  const [messages, setMessages] = useState([]);
  let prev = 'empty'
  useEffect(() => {
    const q = query(collection(db, `${user}/${userId}/chats/${chatId}/messages`), orderBy("timestamp", "asc"))
    getDocs(q).then((query) => {setMessages(query.docs)});
  }, [chatId, dbChange]);
  const timeCheck = (each) => {
    if (prev !== each._document.data.value.mapValue.fields.timestamp.arrayValue.values[0].stringValue.substr(0,10)) {
      prev = each._document.data.value.mapValue.fields.timestamp.arrayValue.values[0].stringValue.substr(0,10)
      return <p>{prev}</p>
    }
  }

  return (
    <div className="rightbody">
      <div className="center">
        {messages?.map((each) => 
          each._document.data.value.mapValue.fields.name.stringValue === userDetails ? (
            <div>
              <div className="check">{timeCheck(each)}</div>
              <div className="sender">
                {each._document.data.value.mapValue.fields.message.stringValue}
                <span id="timestamp">{(each._document.data.value.mapValue.fields.timestamp.arrayValue.values[1].stringValue)}</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="check">{timeCheck(each)}</div>
              <div className="receiver">
                {each._document.data.value.mapValue.fields.message.stringValue}
                <span id="timestamp">{(each._document.data.value.mapValue.fields.timestamp.arrayValue.values[1].stringValue)}</span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
