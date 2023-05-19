import "./index.css";
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./pages/Layout";
import Form from "./pages/Form";
import Task from "./pages/Task";
import End from "./pages/End";
import NasaTlx from "./pages/NasaTlx";
import Consent from "./pages/Consent";
import Config from "./pages/Config";
import TaskDefinition from "./pages/TaskDefinition";
import getData from "./getData";
import { db } from "./db";

export default function App() {
  const data = getData();

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      data.userId &&
      ["task/0", "tlx", "taskdef", "end"].some((substr) =>
        location.pathname.includes(substr)
      )
    ) {
      db.snapshots.add(data).catch(() => {
        console.log("Failed to save snapshot");
      });
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Config />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/form" element={<Form />} />
        <Route path="/end" element={<End />} />
        <Route path="/taskdef/:id" element={<TaskDefinition />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="/tlx/:id" element={<NasaTlx />} />
        <Route path="/taskdef" element={<Navigate to="/taskdef/0" replace />} />
        <Route path="/task" element={<Navigate to="/task/0" replace />} />
        <Route path="/tlx" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
