import React from "react";
import DashBoardSection2 from "../DashBoardSection2";
import DashBoard3Chart from "../DashBoard3Chart";

const DashBoard = () => {
  return (
    <div className="bg-[#B1B1B1]">
        {/* <DashBoard1Top /> */}
      <div style={{paddingTop:"24px"}} className=" w-full">
        <DashBoardSection2 />
      </div>
      <DashBoard3Chart />

    </div>
  );
};

export default DashBoard;
