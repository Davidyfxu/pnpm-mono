import { Button, List, Radio, RadioGroup, Toast } from "@douyinfe/semi-ui";
import React, { useRef, useState } from "react";
import styles from "./index.module.css";
const quizData = [
  {
    question: "How old are you?",
    a: "10",
    b: "20",
    c: "30",
    d: "40",
    correct: "b",
  },
  {
    question: "What is the most used Programming language?",
    a: "C",
    b: "Java",
    c: "Python",
    d: "Javascript",
    correct: "a",
  },
  {
    question: "Who is the President of US?",
    a: "David",
    b: "Donald",
    c: "Bill",
    d: "George",
    correct: "b",
  },
];
const Quiz = () => {
  const quizNum = useRef(0);
  const score = useRef(0);
  const [quiz, setQuiz] = useState<{
    question: string;
    a: string;
    b: string;
    c: string;
    d: string;
    correct: string;
  }>(quizData[quizNum.current]);
  const [answer, setAnswer] = useState<string>("");
  return (
    <div className={styles.page}>
      <div className={styles.quizContainer}>
        <div className={styles.quizHeader}>
          <h3 className={styles.questionText}>{quiz.question}</h3>
          <RadioGroup
            style={{ width: "100%" }}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          >
            <List
              dataSource={[
                { question: quiz.a, value: "a" },
                { question: quiz.b, value: "b" },
                { question: quiz.c, value: "c" },
                { question: quiz.d, value: "d" },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Radio value={item.value}>{item.question}</Radio>
                </List.Item>
              )}
            />
          </RadioGroup>
        </div>
        <Button
          theme="solid"
          onClick={() => {
            if (answer === quiz.correct) {
              score.current += 1;
            }
            if (quizNum.current === quizData.length - 1) {
              Toast.info(
                `You answered correctly at ${score.current}/${quizData.length} questions.`
              );
              quizNum.current = 0;
              score.current = 0;
              setQuiz(quizData[quizNum.current]);
              return;
            }
            if (!answer) {
              return;
            }
            setQuiz(quizData[quizNum.current + 1]);
            quizNum.current += 1;
          }}
          className={styles.button}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
