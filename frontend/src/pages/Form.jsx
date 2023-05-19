import "../styles/Form.css";
import React, { useState } from "react";
import update from "immutability-helper";
import { Link } from "react-router-dom";
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { userFormDataAtom } from "../recoil/atoms";

function Form() {
  const [userFormData, setUserFormData] = useRecoilState(userFormDataAtom);
  const [showEnglishInfo, setShowEnglishInfo] = useState(false);
  const [formComplete, setFormComplete] = useState({
    age: userFormData.age >= 16 && userFormData.age <= 120,
    gender: userFormData.gender !== "",
    typing: userFormData.typing !== "",
    english: userFormData.english !== "",
    levelApproved: !userFormData.english.startsWith("a"),
  });
  const [showErrors, setShowErrors] = useState(false);

  const handleButtonClick = (e) => {
    if (
      formComplete.age &&
      formComplete.typing &&
      formComplete.english &&
      formComplete.levelApproved
    ) {
      return;
    }

    e.preventDefault();
    setShowErrors(true);
  };

  return (
    <div id="form">
      <h1>Welcome</h1>
      <p>Please fill out the following form:</p>

      <form id="form">
        <FormControl fullWidth className="form-element">
          <TextField
            required
            error={showErrors && !formComplete.age}
            type="number"
            label="Age"
            value={userFormData.age}
            onChange={(e) => {
              setFormComplete(
                update(formComplete, {
                  age: { $set: e.target.value > 16 && e.target.value < 120 },
                })
              );

              setUserFormData(
                update(userFormData, {
                  age: { $set: e.target.value },
                })
              );
            }}
          />
        </FormControl>

        <FormControl
          fullWidth
          className="form-element"
          required
          error={showErrors && !formComplete.gender}
        >
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            value={userFormData.gender}
            onChange={(e) => {
              setFormComplete(
                update(formComplete, {
                  gender: { $set: e.target.value !== "x" },
                })
              );

              setUserFormData(
                update(userFormData, {
                  gender: { $set: e.target.value },
                })
              );
            }}
          >
            <MenuItem value={"f"}>Female</MenuItem>
            <MenuItem value={"m"}>Male</MenuItem>
            <MenuItem value={"o"}>Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          className="form-element"
          required
          error={showErrors && !formComplete.typing}
        >
          <InputLabel>Touch Typing Proficiency</InputLabel>
          <Select
            label="Touch Typing Proficiency"
            value={userFormData.typing}
            onChange={(e) => {
              setFormComplete(
                update(formComplete, {
                  typing: { $set: e.target.value !== "x" },
                })
              );

              setUserFormData(
                update(userFormData, {
                  typing: { $set: e.target.value },
                })
              );
            }}
          >
            <MenuItem value={"w"}>Well</MenuItem>
            <MenuItem value={"rw"}>Rather Well</MenuItem>
            <MenuItem value={"rp"}>Rather Poor</MenuItem>
            <MenuItem value={"p"}>Poor</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          fullWidth
          className="form-element"
          required
          error={showErrors && !formComplete.english}
        >
          <InputLabel>English Language Proficiency</InputLabel>
          <Select
            label="English Language Proficiency"
            value={userFormData.english}
            onChange={(e) => {
              const isValid = e.target.value.startsWith("a");

              setShowEnglishInfo(isValid);

              setFormComplete(
                update(formComplete, {
                  levelApproved: { $set: !isValid },
                  english: { $set: e.target.value !== "x" },
                })
              );

              setUserFormData(
                update(userFormData, {
                  english: { $set: e.target.value },
                })
              );
            }}
          >
            <MenuItem value={"a1"}>Beginner (A1)</MenuItem>
            <MenuItem value={"a2"}>Elementary (A2)</MenuItem>
            <MenuItem value={"b1"}>Intermediate (B1)</MenuItem>
            <MenuItem value={"b2"}>Upper-Intermediate (B2)</MenuItem>
            <MenuItem value={"c1"}>Advanced (C1)</MenuItem>
            <MenuItem value={"c2"}>Native Speaker (C2)</MenuItem>
          </Select>
        </FormControl>

        {showEnglishInfo ? (
          <>
            <p className="info">
              We do not recommend participating in this study with a English
              Proficiency of A2 or below - Please contact your supervisor!
            </p>

            <FormControlLabel
              control={
                <p>
                  <Checkbox
                    value={formComplete.levelApproved}
                    onChange={(e) =>
                      setFormComplete(
                        update(formComplete, {
                          levelApproved: { $set: e.target.checked },
                        })
                      )
                    }
                  />
                </p>
              }
              label={
                <p className={"required"}>
                  Participation approved by Supervisor
                </p>
              }
            />
          </>
        ) : null}
      </form>

      <Link to={"/taskdef"} onClick={handleButtonClick} style={{ float: "right" }}>
        <button id="next" type="button">
          Next
        </button>
      </Link>
    </div>
  );
}

export default Form;
