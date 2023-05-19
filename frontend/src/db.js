import Dexie from "dexie";

export const db = new Dexie("tt");
db.version(2).stores({
  snapshots: "++id",
  completed: "++id",
});
