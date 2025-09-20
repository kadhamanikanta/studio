'use client';

import { useState, useEffect } from 'react';

type CountdownTimerProps = {
  endDate: string;
};

const calculateTimeLeft = (endDate: string) => {
  const difference = +new Date(endDate) - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const CountdownTimer = ({ endDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endDate));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);
  
  if(!isMounted) {
    const initialTime = calculateTimeLeft(endDate);
    return (
        <div className="flex space-x-2 text-center">
            <span>{String(initialTime.days).padStart(2, '0')}d</span>
            <span>:</span>
            <span>{String(initialTime.hours).padStart(2, '0')}h</span>
            <span>:</span>
            <span>{String(initialTime.minutes).padStart(2, '0')}m</span>
            <span>:</span>
            <span>{String(initialTime.seconds).padStart(2, '0')}s</span>
        </div>
    );
  }

  const timerComponents = [];

  if (timeLeft.days > 0) {
    timerComponents.push(
      <span key="days">{String(timeLeft.days).padStart(2, '0')}d</span>
    );
  }
  timerComponents.push(
    <span key="hours">{String(timeLeft.hours).padStart(2, '0')}h</span>
  );
  timerComponents.push(
    <span key="minutes">{String(timeLeft.minutes).padStart(2, '0')}m</span>
  );
  timerComponents.push(
    <span key="seconds">{String(timeLeft.seconds).padStart(2, '0')}s</span>
  );

  return (
    <div className="flex space-x-2 text-center">
      {timerComponents.reduce((prev: (JSX.Element | string)[], curr, index) => {
        if (index > 0) {
          prev.push(<span key={`sep-${index}`}>:</span>);
        }
        prev.push(curr);
        return prev;
      }, [])}
    </div>
  );
};

export default CountdownTimer;
