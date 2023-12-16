import React, { useState } from "react";
import styles from "./index.module.css";
import { Typography } from "@douyinfe/semi-ui";
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getLowercase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const PswGen = () => {
  const { Title } = Typography;
  const [password, setPassword] = useState("Uf6JzLVJ0M8W3jaN6v");
  const [len, setLen] = useState(15);
  const [upperEl, setUpperEl] = useState(false);
  const [lowerEl, setLowerEl] = useState(false);
  const [numberEl, setNumberEl] = useState(false);
  const [symbolEl, setSymbolEl] = useState(false);
  const generateX = () => {
    const xs = [];
    if (upperEl) {
      xs.push(getUppercase());
    }
    if (lowerEl) {
      xs.push(getLowercase());
    }
    if (numberEl) {
      xs.push(getNumber());
    }
    if (symbolEl) {
      xs.push(getSymbol());
    }
    if (xs.length === 0) return "";
    return xs[Math.floor(Math.random() * xs.length)];
  };
  const generatePassword = () => {
    let pw = "";
    if (upperEl) {
      pw += getUppercase();
    }
    if (lowerEl) {
      pw += getLowercase();
    }
    if (numberEl) {
      pw += getNumber();
    }
    if (symbolEl) {
      pw += getSymbol();
    }

    for (let i = pw.length; i < len; i++) {
      const x = generateX();
      pw += x;
    }
    setPassword(pw);
  };
  return (
    <div className={styles.body}>
      <div className={styles.pwContainer}>
        <div className={styles.pwHeader}>
          <div className={styles.pw}>
            <Title className={styles.pwText} strong copyable>
              {password}
            </Title>
          </div>
        </div>
        <div className={styles.pwBody}>
          <div className={styles.pwControl}>
            <span>Password Length</span>
            <input
              style={{ width: 80 }}
              type="number"
              defaultValue={len}
              min="2"
              max="30"
              onChange={(v) => setLen(Number(v?.target?.value))}
            />
          </div>
          <div className={styles.pwControl}>
            <span>Contain Uppercase Letters</span>
            <input
              type="checkbox"
              onClick={() => {
                setUpperEl(!upperEl);
              }}
            />
          </div>
          <div className={styles.pwControl}>
            <span>Contain Lowercase Letters</span>
            <input
              type="checkbox"
              onClick={() => {
                setLowerEl(!lowerEl);
              }}
            />
          </div>
          <div className={styles.pwControl}>
            <span>Contain Numbers</span>
            <input
              type="checkbox"
              onClick={() => {
                setNumberEl(!numberEl);
              }}
            />
          </div>
          <div className={styles.pwControl}>
            <span>Contain Symbols</span>
            <input
              type="checkbox"
              onClick={() => {
                setSymbolEl(!symbolEl);
              }}
            />
          </div>
          <button className={styles.generate} onClick={generatePassword}>
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PswGen;
