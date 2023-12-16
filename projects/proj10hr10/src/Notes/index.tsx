import React, { useState } from "react";
import styles from "./index.module.css";
import { Button, TextArea } from "@douyinfe/semi-ui";
import { IconDelete, IconPlus, IconSave } from "@douyinfe/semi-icons";

interface INote {
  idx: number;
  content: string;
  save: boolean;
}
const Note = (props: {
  note: INote;
  notes: INote[];
  setNotes: (n: INote[]) => void;
}) => {
  const { note, notes, setNotes } = props;
  const [inputValue, setInputValue] = useState<string>("");
  console.log(note);
  return (
    <div>
      <div className={styles.note}>
        <div className={styles.tools}>
          <Button
            style={{ marginLeft: 16 }}
            icon={<IconSave />}
            onClick={() => {
              let newNotes = [...notes];
              console.log(newNotes);
              newNotes[note.idx - 1].content = inputValue;
              newNotes[note.idx - 1].save = !newNotes[note.idx - 1].save;
              setNotes(newNotes);
            }}
          />
          <Button
            style={{ marginLeft: 16 }}
            icon={<IconDelete />}
            onClick={() => setNotes(notes.filter((v) => v.idx !== note.idx))}
          />
        </div>
        <div className={styles.main}>
          <TextArea
            disabled={note.save}
            value={inputValue}
            onChange={(v) => setInputValue(v)}
          />
        </div>
      </div>
    </div>
  );
};

const Notes = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  return (
    <div className={styles.body}>
      <Button
        theme="solid"
        style={{ marginLeft: 16 }}
        icon={<IconPlus />}
        onClick={() =>
          setNotes([
            ...notes,
            { idx: notes.length + 1, content: "", save: false },
          ])
        }
      >
        Add Note
      </Button>
      <div className={styles.notes}>
        {notes.map((note, index: number) => (
          <Note key={index} note={note} notes={notes} setNotes={setNotes} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
