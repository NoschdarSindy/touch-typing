import "../styles/Task.css";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Howl } from "howler";
import update from "immutability-helper";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  acceleratorAtoms,
  taskDifficultiesAtom,
  typingDataAtoms,
} from "../recoil/atoms";

const filenames = [...Array(10).keys()].map((i) => `/${i}.mp3`);
const randIndex = () => Math.floor(Math.random() * 10);

export default function Task() {
  const navigate = useNavigate();
  const { id } = useParams();
  const numId = parseInt(id);
  const [showNextButton, setShowNextButton] = useState(false);
  const [phrases, setPhrases] = useState(null);
  const [typingData, setTypingData] = useRecoilState(
    typingDataAtoms(numId - 1)
  );
  const setAccelerometerData = useSetRecoilState(acceleratorAtoms(numId - 1));
  const taskDifficulty = useRecoilValue(taskDifficultiesAtom)[numId];
  const textRef = useRef(null);
  const inputRef = useRef(null);
  let stopPlayback = useRef(false);
  let startingTime = useRef(null);
  const accelerometerDataTmp = useRef([]);
  const numberOfBackspaces = useRef(0);
  const numberOfCharacters = useRef(0);
  const pressTimestamps = useRef([]);

  const playNumber = () => {
    let sound = new Howl({
      src: [filenames[randIndex()]],
      onend: () => {
        setTimeout(() => playNumber(), 2000);
      },
    });

    if (!stopPlayback.current) sound.play();
  };

  const getRandomPhrases = (arr, n = 8) => {
    const result = [];
    let i, entry;

    while (result.length < n) {
      i = Math.floor(Math.random() * (arr.length + 1));
      entry = arr.splice(i, 1)[0];

      if (entry && entry.length > 2) {
        result.push(entry.slice(0, -1));
      }
    }

    return result;
  };

  const handleTextChange = (e) => {
    if (numberOfNonEmptyLines(inputRef.current.value) >= phrases.length) {
      setShowNextButton(true);
    } else {
      const newPhraseIndex = numberOfNonEmptyLines(e.target.value);
      textRef.current?.scrollTo({
        top: textRef.current?.children[newPhraseIndex]?.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleDeviceMotion = (e) => {
    const motionData = {
      acceleration: {
        x: e.acceleration.x,
        y: e.acceleration.y,
        z: e.acceleration.z,
      },
      accelerationIncludingGravity: {
        x: e.accelerationIncludingGravity.x,
        y: e.accelerationIncludingGravity.y,
        z: e.accelerationIncludingGravity.z,
      },
      interval: e.interval,
    };
    accelerometerDataTmp.current?.push({
      timestamp: Date.now(),
      ...motionData,
    });
  };

  const handleButtonClick = () => {
    stopPlayback.current = true;

    if (taskDifficulty > 0) {
      setAccelerometerData(accelerometerDataTmp.current);
      setTypingData(
        update(typingData, {
          providedPhrases: { $set: phrases },
          typedPhrases: { $set: inputRef.current.value.split("\n") },
          pressTimestamps: { $set: pressTimestamps.current },
          numberOfCharacters: { $set: numberOfCharacters.current },
          numberOfBackspaces: { $set: numberOfBackspaces.current },
          totalTime: { $set: Date.now() - startingTime.current },
        })
      );
      navigate(`/tlx/${id}`);
    } else {
      navigate(`/taskdef/1`);
    }
  };

  useEffect(() => {
    inputRef.current?.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        if (inputRef.current === document.activeElement) {
          e.target.blur();
        }
        e.target.focus();
      },
      {
        passive: false,
      }
    );

    if (!phrases) {
      fetch("/phrases.txt")
        .then((response) => response.text())
        .then((text) => setPhrases(getRandomPhrases(text.split("\n"))));

      if (taskDifficulty > 0) {
        textRef.current.addEventListener("wheel", (e) => e.preventDefault(), {
          passive: false,
        });
        if (taskDifficulty > 1) {
          playNumber();
        }
        startingTime.current = Date.now();
      }
    }

    window.addEventListener("devicemotion", handleDeviceMotion, true);
    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion, true);
    };
  });

  if (!id.match("^[0-4]")) {
    return <Navigate to={`/`} replace />;
  }

  const numberOfNonEmptyLines = (text) => {
    return (text.match(/.+\n/g) || "").length;
  };

  return (
    <div id="task">
      <div className={"top"}>
        {taskDifficulty > 0 && (
          <div>
            <div id="info" className={"text-secondary"}>
              Please type out the phrases as they appear below. After each
              phrase press Enter.
            </div>
          </div>
        )}
        <div>
          <div id="info">
            Now you have some time to freely type some sentences to get used to
            the keyboard. Press Next when you are ready to continue to the
            typing tasks.
          </div>
        </div>
      </div>

      <div className={"bottom"}>
        {taskDifficulty > 0 && (
          <div id="text" ref={textRef}>
            {phrases?.map((phrase, i) => (
              <p key={i}>{phrase}</p>
            ))}
          </div>
        )}

        <button
          id="next"
          onClick={handleButtonClick}
          style={{
            display: taskDifficulty === 0 || showNextButton ? "inline" : "none",
          }}
        >
          Next
        </button>

        {phrases && (
          <textarea
            id="input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            autoFocus
            ref={inputRef}
            onChange={handleTextChange}
            onKeyDown={(e) => {
              pressTimestamps.current.push(Date.now());
              if (e.key === "Backspace") {
                numberOfBackspaces.current++;
              }

              numberOfCharacters.current++;
            }}
          ></textarea>
        )}
      </div>
    </div>
  );
}
