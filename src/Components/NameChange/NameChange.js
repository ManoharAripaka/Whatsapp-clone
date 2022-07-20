import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import db from '../../Firebase'
import { updateChatName, updateDbChange, updateNameChange } from '../../Store/DataStore'
import "./NameChange.css"

export default function NameChange() {
    const { user, userId, nameChange, chatId } = useSelector(state => state.data)
    const dispatch = useDispatch()
    const saveName = () => {
        dispatch(updateNameChange('none'))
        const newName = document.getElementById('texttt').value
        if (newName !== ''){
            const q = query(collection(db, `${user}/${userId}/chats`), where("number","==", chatId))
            getDocs(q).then((query) => {
                setDoc(doc(db, `${user}/${userId}/chats`, `${chatId}`), {
                    image : query.docs[0]._document.data.value.mapValue.fields.image.stringValue,
                    name : newName,
                    number : query.docs[0]._document.data.value.mapValue.fields.number.stringValue,
                    timestamp : [query.docs[0]._document.data.value.mapValue.fields.timestamp.arrayValue.values[0].stringValue, query.docs[0]._document.data.value.mapValue.fields.timestamp.arrayValue.values[1].stringValue]
                })
                dispatch(updateChatName(newName))
            })
            
        }
    }
  return (
    <div className="maiinn" style={{ display: nameChange }}>
      <div className='Change'>
        <p id="closee" onClick={() => dispatch(updateNameChange("none"))}>close</p>
        <div className='inside'>
            <h3>Change User Name</h3>
            <input id="texttt" type="text" name="name" placeholder='Enter your Name' />
            <button id="savee" onClick={saveName}>Save</button>
        </div>
      </div>
    </div>
  )
}
