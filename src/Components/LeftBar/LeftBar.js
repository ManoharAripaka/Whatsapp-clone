import React, { useState } from "react";
import "./LeftBar.css";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from "@mui/icons-material/Logout";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chats from "../Chats/Chats";
import { useDispatch, useSelector } from "react-redux";
import { updateDbChange, updateEdit, updateNewChat } from "../../Store/DataStore";

export default function LeftBar() {
  const { userDetails } = useSelector(state => state.data)
  const [search, setSearch] = useState(false)
  const dispatch = useDispatch()
  const recall = () => {
    dispatch(updateDbChange())
    console.log('re-render')
    setTimeout(()=> {recall()}, 5000)
  }
  setTimeout(recall,5000)

  return (
    <div className="leftbar">
      <div className="top">
        <PersonIcon id="profile-icon"/>
        <h4 id='profile'>{userDetails}</h4>
        <EditIcon id='edit' onClick={() => dispatch(updateEdit('flex'))}/>
        <MessageIcon id='new-message' onClick={() => dispatch(updateNewChat('flex'))}/>
        <LogoutIcon id='logout'/>
      </div>
      <div className="search">
        {search ? <ArrowBackIcon id='arrow' onClick={() => setSearch(~search)}/> : <SearchIcon id='search' onClick={() => setSearch(~search)}/>}
        <input name='search' type='text' placeholder="Search or start new chat" />
      </div>
      <hr/>
      <div className="body">
        <Chats />
      </div>
    </div>
  );
}
