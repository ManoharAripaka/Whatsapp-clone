import { setDoc, doc, collection, getDocs, query } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import db from "../../Firebase";
import { updateChatId, updateChatName, updateChats, updateNewChat } from "../../Store/DataStore";
import "./NewChat.css";

export default function NewChat() {
    const { user, newChat, userId } = useSelector((state) => state.data);
    const [check, setCheck] = useState(false);
    var newChatDetails = {
        name : '',
        number : '',
        image : 'null',
        timestamp : [new Date().toLocaleString(), new Date().toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric"})]
    }
    const dispatch = useDispatch();
    const toaster = () => {
        let data = document.getElementById("number").value;
        if (data !== '' && `+91${data}` !== user) {
            const q = query(collection(db, `+91${data}`));
            getDocs(q).then((query) => {
                if (query.docs.length !== 0){
                    setCheck(true);
                    toast("Number Valid", {className: "toast-success", position: "top-center", hideProgressBar: true})
                    newChatDetails.image = query.docs[0]._document.data.value.mapValue.fields.image.nullValue
                } else toast("No Account Found", { className: "toast-warning", position: "top-center", hideProgressBar: true})
            });
        } else if (`+91${data}` === user) toast("Can't self chat.!", {className: "toast-warning", position: "top-center", hideProgressBar: true})
        else toast('No Input', {className: "toast-error", position: "top-center", hideProgressBar: true})
    }
    const reset = () => {
        document.getElementById('number').value = ''
    }
    const addChat = () => {
        let newChatNumber = document.getElementById('number').value
        document.getElementById('number').value = ''
        newChatDetails.name = `+91${newChatNumber}`
        newChatDetails.number = `+91${newChatNumber}`
        setDoc(doc(db, `${user}/${userId}/chats`, `+91${newChatNumber}`), newChatDetails)
        getDocs(collection(db, `+91${newChatNumber}`)).then((result) => {
            console.log(result)
            dispatch(updateChatId(result.docs[0].id))
            dispatch(updateChatName(`+91${newChatNumber}`))
        })
        dispatch(updateNewChat('none'))
    }

return (
    <div className="maintop" style={{ display: newChat }}>
        <div className="new">
            <p id="close" onClick={() => dispatch(updateNewChat("none"))}>close</p>
            <div className="newchat">
                <h2 id="title">New Chat</h2>
                <div className="num">
                    <p id="country">+91</p>
                    <input id="number" type="number" name="newchat" onChange={()=>setCheck(false)} placeholder="Enter mobile number" />
                </div>
                <button id="validate" onClick={toaster}>Validate</button>
                {check ? (<button id="start" onClick={addChat}>Start New Chat</button>) : (<button id="reset" onClick={reset}>reset</button>)}
            </div>
        </div>
    </div>
  );
}
