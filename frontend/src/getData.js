/* eslint-disable react-hooks/rules-of-hooks */
import { useRecoilValue } from "recoil";
import {
  acceleratorAtoms,
  participantIdAtom,
  taskDifficultiesAtom,
  tlxAtoms,
  typingDataAtoms,
  userFormDataAtom,
} from "./recoil/atoms";

export default function getData() {
  const taskDifficulties = useRecoilValue(taskDifficultiesAtom);

  const data = {
    userId: useRecoilValue(participantIdAtom),
    taskDifficulties,
    formData: useRecoilValue(userFormDataAtom),
    results: [],
    timestamp: Date.now(),
  };

  for (let i = 0; i < 4; i++) {
    data.results.push({
      difficulty: taskDifficulties[i + 1],
      typing: useRecoilValue(typingDataAtoms(i)),
      tlx: useRecoilValue(tlxAtoms(i)),
      acc: useRecoilValue(acceleratorAtoms(i)),
    });
  }

  return data;
}
