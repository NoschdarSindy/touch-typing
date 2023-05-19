import { atom, atomFamily } from "recoil";

export const participantIdAtom = atom({
  key: "participantId",
  default: "",
});

// Array that maps an iteration id to a task load to determine n-back task difficulty
// E.g. latin square ABDC is represented as [0,1,2,4,3]
// The first element is always 0 because the first round involves no task and is for getting used to the keyboard
export const taskDifficultiesAtom = atom({
  key: "taskDifficulties",
  default: [0, 1, 2, 4, 3],
});

export const userFormDataAtom = atom({
  key: "userFormData",
  default: {
    age: 18,
    gender: "",
    typing: "",
    english: "",
  },
});

export const acceleratorAtoms = atomFamily({
  key: "accelerator",
  default: [],
});

export const typingDataAtoms = atomFamily({
  key: "typingData",
  default: {
    providedPhrases: "",
    typedPhrases: "",
    pressTimestamps: [],
    numberOfCharacters: 0,
    numberOfBackspaces: 0,
    totalTime: 0,
  },
});

export const tlxAtoms = atomFamily({
  key: "tlx",
  default: Array(6).fill(-1),
});
