import { useState, useRef, useEffect } from 'react'
import dayjs from 'supersimpledev/dayjs';
import './Form.css'

export function Form() {
  const [show, setShow] = useState(false);

  const [time, setTime] = useState(dayjs().format('HH:mm:ss'));

  const containerRef = useRef(null);

  useEffect(() => {
    const stop = setInterval(() => {
      console.log('run code')
      setTime(dayjs().format('HH:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(stop)
    }
  }, [])


  function isShow() {
    setShow(show ? false : true)
  }
  return (
    <div
      className="form"
    >
      <input type="text" placeholder="Email" />
      <div>
        <input type={show ? "text" : "password"} placeholder="Password" />
        <button onClick={isShow}>{show ? "hide" : "show"}</button>
      </div>
      <button>Login</button>
      <button>Sign Up</button>
      <div
        ref={containerRef}
      >
        {time}
      </div>
    </div>
  )
}