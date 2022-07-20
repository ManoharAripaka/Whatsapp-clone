import React from "react";
import LeftBar from "../LeftBar/LeftBar";
import Name from "../Name/Name";
import NameChange from "../NameChange/NameChange";
import NewChat from "../NewChat/NewChat";
import RightBar from "../RightBar/RightBar";
import "./Home.css";

export default function Home() {

  return (
    <div className="home">
      <NewChat />
      <NameChange />
      <Name />
      <LeftBar />
      <RightBar />
    </div>
  );
}
