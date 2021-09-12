import React from "react";
import "../App.css";

const Square = (props) => {
  const className1 = "square" + (props.highlightWinner ? "highlight" : "");

  return (
    <div className="squareStyle" id={className1} onClick={props.onClick}>
      {props.state}
    </div>
  );
};

export default Square;
