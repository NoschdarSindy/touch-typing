import "../styles/NasaTlx.css";
import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import update from "immutability-helper";
import { useRecoilState } from "recoil";
import { tlxAtoms } from "../recoil/atoms";

const items = [
  {
    name: "Mental Demand",
    description: "How mentally demanding was the task?",
  },
  {
    name: "Physical Demand",
    description: "How physically demanding was the task?",
  },
  {
    name: "Temporal Demand",
    description: "How hurried or rushed was the pace of the task?",
  },
  {
    name: "Performance",
    description:
      "How successful were you in accomplishing what you were asked to do?",
  },
  {
    name: "Effort",
    description:
      "How hard did you have to work to accomplish your level of performance?",
  },
  {
    name: "Frustration",
    description:
      "How insecure, discouraged, irritated, stressed, and annoyed were you?",
  },
];

function NasaTlx() {
  const { id } = useParams();
  const numId = parseInt(id);

  const [selections, setSelections] = useRecoilState(tlxAtoms(numId - 1));
  const [showFormHelper, setShowFormHelper] = useState(false);

  if (!id.match("^[1-4]")) {
    return <Navigate to={`/`} replace />;
  }

  let afterPath;

  if (numId >= 4) {
    afterPath = "/end";
  } else {
    afterPath = `/taskdef/${numId + 1}`;
  }

  const handleClick = (itemIndex, value) => {
    setSelections(update(selections, { [itemIndex]: { $set: value } }));
  };

  const preventSubmit = (e) => {
    e.preventDefault();
    setShowFormHelper(true);
  };

  return (
    <div id="tlx" className="container">
      <link
        rel="stylesheet"
        type="text/css"
        href={"/bootstrap.3.2.0.min.css"}
      />
      <h1>NASA Task Load Index (TLX)</h1>
      <p>
        There are no right or wrong answers. If something is not entirely clear,
        follow your intuition.
      </p>
      <br />
      {items.map((item, itemIndex) => (
        <div key={item.name}>
          <h4>
            {item.name}&nbsp;<small>{item.description}</small>
          </h4>
          <table className="scale">
            <tbody>
              <tr>
                {[...Array(20)].map((e, value) => (
                  <td
                    className={`${value % 2 === 0 ? "" : "tick"} ${
                      selections[itemIndex] === value ? "selected" : ""
                    }`}
                    onClick={() => handleClick(itemIndex, value)}
                    key={value}
                  />
                ))}
              </tr>
              <tr>
                {[...Array(20)].map((e, value) => (
                  <td
                    className={`tick ${
                      selections[itemIndex] === value ? "selected" : ""
                    }`}
                    onClick={() => handleClick(itemIndex, value)}
                    key={value}
                  />
                ))}
              </tr>
            </tbody>
          </table>
          <div className="row">
            <div className="col-xs-5 text-left">Very Low</div>
            <div className="col-xs-2 text-center">|</div>
            <div className="col-xs-5 text-right">Very High</div>
          </div>
          <br />
        </div>
      ))}
      <br />
      {showFormHelper && (
        <div className="alert alert-danger" role="alert">
          Please select a value for every scale!
        </div>
      )}
      <Link
        to={afterPath}
        onClick={selections.includes(-1) && preventSubmit}
        className="btn btn-default"
      >
        Submit
      </Link>
      <br />
      <br />
    </div>
  );
}

export default NasaTlx;
