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
  
  }, [counter, getTimeTaken])

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

// import React, {useEffect, useState} from 'react'

// const Timer = () => {
  
//   const [seconds, setSeconds] = useState(0);
//   const [isActive, setIsActive] = useState(true);
  
//   const toggle = () => {
//     setIsActive(!isActive);
//   }

//   const reset = () => {
//     setSeconds(0);
//     setIsActive(false);
//   }

//   useEffect(() => {
//     let interval = null;

//     if (isActive) {

//       interval = setInterval(() => {
//         setSeconds(seconds => seconds + 1);
//       }, 1000)
    
//     } else if (!isActive && seconds !== 0) {
//       clearInterval(interval)
//     }

//     return () => clearInterval(interval);
//   }, [seconds])

//   console.log(seconds)
//   return (
//     <>
//       <div>
//       {seconds}s
//       </div>
//       <button onClick={toggle}>
//         {isActive ? 'Pause' : 'Start'}
//       </button>
//       <button onClick={reset}>
//         Reset
//       </button>
//     </>
//   )
// }

// export default Timer

// import React, {useEffect, useState} from 'react'

// const Timer = () => {
  
//   const [seconds, setSeconds] = useState('00');
//   const [minutes, setMinutes] = useState('00');
//   const [isActive, setIsActive] = useState(false);
//   const [counter, setCounter] = useState(0);
  
//   const toggle = () => {
//     setIsActive(!isActive);
//   }

//   const reset = () => {
//     setSeconds(0);
//     setIsActive(false);
//   }

//   useEffect(() => {
//     let interval = null;

//     if (isActive) {

//       interval = setInterval(() => {
//         setSeconds(seconds => seconds + 1);
//       }, 1000)

//     } else if (!isActive && seconds !== 0) {
//       clearInterval(interval)
//     }

//     return () => clearInterval(interval);
//   }, [isActive, seconds])

//   return (
//     <>
//       <div>
//       {seconds}s
//       </div>
//       <button onClick={toggle}>
//         {isActive ? 'Pause' : 'Start'}
//       </button>
//       <button onClick={reset}>
//         Reset
//       </button>
//     </>
//   )
// }

// export default Timer
