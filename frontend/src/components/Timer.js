import React, {useEffect, useState} from 'react';

const Timer = ({getTimeTaken}) => {
  
  const [seconds, setSeconds] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [counter, setCounter] = useState(0);
  
  useEffect(() => {


    let interval = setInterval(() => {

      const secondCounter = counter % 60;
      const minuteCounter = Math.floor(counter / 60);

      const computedSeconds = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
      const computedMinutes = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;
      
      setSeconds(computedSeconds);
      setMinutes(computedMinutes);
      setCounter(counter => counter + 1);

      }, 1000)

    return () => {
      
      getTimeTaken(`${minutes}:${seconds}`)
      clearInterval(interval)
    
    }
  
  }, [counter, getTimeTaken, minutes, seconds])

  return (
    <>
      <div>
      <span className="minute">{minutes}</span>
      <span>:</span>
      <span className="second">{seconds}</span>
      </div>
    </>
  )
}

export default Timer

