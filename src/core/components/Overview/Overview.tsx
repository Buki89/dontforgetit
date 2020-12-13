import React, { FC } from "react";

type OverViewProps = {
  completed: number;
  incompleted: number;
  overall: number;
};

const Overview: FC<OverViewProps> = ({ completed, overall, incompleted }) => {
  return (
    <>
      <div>
        <span>Overall :</span>
        <span>{overall}</span>
      </div>
      <div>
        <span>Completed :</span>
        <span>{completed}</span>
      </div>
      <div>
        <span>Incompleted :</span>
        <span>{incompleted}</span>
      </div>
    </>
  );
};

export default Overview;
