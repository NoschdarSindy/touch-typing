import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { taskDifficultiesAtom } from "../recoil/atoms";

const nAsWord = [undefined, "one", "two", "three"];
const exampleSequence = [3, 5, 0, 9, 2];

export default function TaskDefinition() {
  const { id } = useParams();

  const taskDifficulty = useRecoilValue(taskDifficultiesAtom)[parseInt(id)];
  const nBack = taskDifficulty - 1;
  const nBackAsWord = nAsWord[nBack];
  const positionSgPl = `position${nBack > 1 ? "s" : ""}`;
  if (!id.match("^[0-4]")) {
    return <Navigate to={`/`} replace />;
  }

  return (
    <div className={"m-3"}>
      {taskDifficulty === 0 ? (
        <>
          Now you will have some time to freely type some sentences to get used
          to the keyboard. Press Start to begin. Click Next when you are ready
          to continue to the typing tasks.
        </>
      ) : (
        <>
          <h1>Typing Out Phrases {nBack ? `During ${nBack}-Back Task` : ""}</h1>
          <p></p>
          <div>
            <p>
              Next, phrases will be presented on the screen consecutively. Type
              out each phrase using the keyboard, pressing Enter after each
              phrase.
            </p>
            {!!nBack && (
              <>
                <p>
                  At the same time, you will hear a series of numbers presented
                  to you through audio, one number at a time. Your task is to
                  listen carefully to each number and speak it out with a delay
                  of <b>{nBackAsWord}</b> {positionSgPl}, meaning you should
                  speak the number that occurred <b>{nBackAsWord}</b>{" "}
                  {positionSgPl} back in the sequence when the current number is
                  presented.
                </p>
                <p>
                  For example, let's say you hear the following sequence:{" "}
                  {exampleSequence.join(", ")}. When the number "
                  {exampleSequence[nBack]}" is presented, you should speak out
                  the number that occurred <b>{nBackAsWord}</b> {positionSgPl}{" "}
                  back, which is "{exampleSequence[0]}". Then, when the number "
                  {exampleSequence[nBack + 1]}" is presented, you should again
                  speak out the number that occurred <b>{nBackAsWord}</b>{" "}
                  {positionSgPl} back, which is "{exampleSequence[1]}". This
                  pattern continues for the rest of the sequence. Whenever a
                  number is presented, think back <b>{nBackAsWord}</b>{" "}
                  {positionSgPl} in the sequence and speak out the corresponding
                  number.
                </p>
              </>
            )}
            <p>
              Once you have completed typing all the phrases, the task will come
              to an end. If you have any questions or need further
              clarifications, feel free to ask.
            </p>
            <p>Press Start when you are ready.</p>
          </div>
        </>
      )}

      <Link
        to={`/task/${id}`}
        className="btn btn-outline-dark d-flex justify-content-center"
      >
        Start
      </Link>
    </div>
  );
}
