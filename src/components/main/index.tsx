import React from "react";
import { TopBar } from "./top-bar";
import { BottomBar } from "./bottom-bar";
import { Content } from "./content";

const Main: React.FC = () => {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] h-full">
      <TopBar />
      <Content />
      <BottomBar />
    </div>
  );
};

export default Main;
