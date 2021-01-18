import React, {useEffect, useState} from 'react';

const Timer = () => {
  
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    let interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000)

    return () => clearInterval(interval);
  }, [seconds])

  console.log(seconds)
  return (
    <>
      <div>
      {seconds}s
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
