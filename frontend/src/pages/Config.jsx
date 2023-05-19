import "bootstrap/dist/css/bootstrap.css";
import "dexie-export-import";
import React, { useRef, useState } from "react";
import download from "downloadjs/download";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { participantIdAtom, taskDifficultiesAtom } from "../recoil/atoms";
import { db } from "../db";

const latinSquares = ["ABDC", "BCAD", "CDBA", "DACB"];

function Config() {
  const [taskDifficulties, setTaskDifficulties] =
    useRecoilState(taskDifficultiesAtom);
  const [completed, setCompleted] = useState([]);
  const [latinSquareOccurrences, setLatinSquareOccurrences] = useState([]);
  const [nextLatinSquare, setNextLatinSquare] = useState("");
  const suggestedLatinSquare = useRef("");

  const [participantId, setParticipantId] = useRecoilState(participantIdAtom);

  const numToChar = (n) => String.fromCharCode(n + 64);
  const charToNum = (c) => c.charCodeAt(0) - 64;

  const taskDifficultiesToLatinSquare = (taskDifficulties) =>
    taskDifficulties?.slice(1).map(numToChar).join("");

  const handleSubmit = () => {
    if (!participantId) setParticipantId(Date.now().toString());
  };

  const handleDbExport = async () => {
    const blob = await db.export();
    download(blob, Date.now() + "-tt.db.json", "application/json");
  };

  const handleDbDelete = async () => {
    if (window.confirm("This will erase all collected data.")) {
      await db.delete();
      window.location.reload();
    }
  };

  const handleSelect = (e) => {
    const latinSquare = e.target.value; // e.g. "ABDC"
    setTaskDifficulties([0, ...latinSquare.split("").map(charToNum)]);
    setNextLatinSquare(latinSquare);
  };

  if (!!!completed.length) {
    db.completed
      .reverse()
      .toArray()
      .then((result) => {
        result = result.map((row) => {
          return {
            latinSquare: taskDifficultiesToLatinSquare(row.taskDifficulties),
            time: new Date(row.timestamp).toLocaleString("de-DE"),
            ...row,
          };
        });
        const latinSquareOccurrenceCount = latinSquares.map(
          (ls) => result.filter((row) => row.latinSquare === ls).length
        );
        setLatinSquareOccurrences(latinSquareOccurrenceCount);
        if (!nextLatinSquare) {
          suggestedLatinSquare.current =
            latinSquares[
              latinSquareOccurrenceCount.indexOf(
                Math.min(...latinSquareOccurrenceCount)
              )
            ];
          setNextLatinSquare(suggestedLatinSquare.current);
          setTaskDifficulties([
            0,
            ...suggestedLatinSquare.current.split("").map(charToNum),
          ]);
        }
        setCompleted(result);
      });
  }

  return (
    <div className={"m-3 config"}>
      <p className="pageBreak">
        <span>Participant ID:</span>
        <input onChange={(e) => setParticipantId(e.target.value)} />
      </p>

      <div className="pageBreak">
        <span>Latin Square Order:</span>
        <select value={nextLatinSquare} onChange={handleSelect}>
          {latinSquares.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 mb-2">
        <p>Task load will be as follows: {taskDifficulties.join(",")}</p>
      </div>
      <div className="mt-2 mb-2">
        <Link
          onClick={handleSubmit}
          to={"/consent"}
          className="btn btn-outline-dark d-flex justify-content-center"
        >
          Submit
        </Link>
        <hr />
        <h4>Completed runs</h4>
        <table>
          <thead>
            <tr>
              <td>User ID</td>
              <td>Latin Square</td>
              <td>completed at</td>
            </tr>
          </thead>
          <tbody>
            {completed.map((row, i) => (
              <tr key={i}>
                <td>{row.userId}</td>
                <td>{row.latinSquare}</td>
                <td>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <h5>Count</h5>
        {latinSquareOccurrences.map((ls, i) => (
          <span key={i}>
            {latinSquares[i]}: {latinSquareOccurrences[i]} times
            <br />
          </span>
        ))}
        Next run should be: {suggestedLatinSquare.current}
        <hr />
        <h4>Jump to</h4>
        <Link to={"/consent"}>Consent Form</Link>
        <br />
        <Link to={"/form"}>Demographics Form</Link>
        {[...Array(5).keys()].map((i) => (
          <div key={i}>
            <Link to={`/taskdef/${i}`}>{i}. Task Definition</Link>
            <br />
            <Link to={`/task/${i}`}>{i}. Task</Link>
            <br />
            {i > 0 && (
              <>
                <Link to={`/tlx/${i}`}>{i}. TLX Questionnaire</Link>
              </>
            )}
          </div>
        ))}
        <Link to={"/end"}>End</Link>
        <br />
        <hr />
        <h4>DB options</h4>
        <div
          onClick={handleDbExport}
          className="btn btn-outline-dark d-flex justify-content-center"
        >
          Export DB
        </div>
        <br />
        <div
          onClick={handleDbDelete}
          className="btn btn-danger d-flex justify-content-center"
        >
          Delete DB
        </div>
      </div>
    </div>
  );
}

export default Config;
