import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { differenceInSeconds } from "date-fns";
const NEW_YEARS = "1 Jan 2023";

const CountdownTime = () => {
  const newYearsDate = new Date(NEW_YEARS);
  const [diffTime, setDiffTime] = useState<{
    days: string | number;
    hours: string | number;
    mins: string | number;
    seconds: string | number;
  }>({
    days: 0,
    hours: 0,
    mins: 0,
    seconds: 0,
  });

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  useEffect(() => {
    setInterval(() => {
      const currentDate = new Date();
      const totalSeconds = differenceInSeconds(newYearsDate, currentDate);
      const days = Math.floor(totalSeconds / 3600 / 24);
      const hours = Math.floor(totalSeconds / 3600) % 24;
      const mins = Math.floor(totalSeconds / 60) % 60;
      const seconds = Math.floor(totalSeconds) % 60;
      setDiffTime({
        days,
        hours: formatTime(hours),
        mins: formatTime(mins),
        seconds: formatTime(seconds),
      });
    }, 1000);
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New Years Eve - 2023</h1>
      <div className={styles.countdownContainer}>
        <div className={styles.countdownEl}>
          <p className={styles.bigText}>{diffTime.days}</p>
          <span>days</span>
        </div>
        <div className={styles.countdownEl}>
          <p className={styles.bigText}>{diffTime.hours}</p>
          <span>hours</span>
        </div>
        <div className={styles.countdownEl}>
          <p className={styles.bigText}>{diffTime.mins}</p>
          <span>mins</span>
        </div>
        <div className={styles.countdownEl}>
          <p className={styles.bigText}>{diffTime.seconds}</p>
          <span>seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTime;
