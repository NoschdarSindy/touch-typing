import "../styles/End.css";
import download from "downloadjs/download";
import getData from "../getData";
import { db } from "../db";

export default function End() {
  const data = getData();

  const { userId, taskDifficulties, timestamp } = data;

  download(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
    `results_user_${userId.replace(/([^a-z0-9 ]+)/gi, "-")}.json`, // throwing out illegal filename characters
    "application/json"
  );

  db.completed.add({ userId, taskDifficulties, timestamp });

  return (
    <div id="end">
      <h1>End</h1>
      <p>You are finished</p>
      <p>Thank you for your participation!</p>
    </div>
  );
}
