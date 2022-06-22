import React from 'react'
import '../App.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

let flags = [];
let index = 0;


export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [start, setStart] = useState(false);
    const element = <FontAwesomeIcon icon={faClock} />
    const formatTime = (timer) => {
        const getMiliSeconds = `0${(timer / 10 % 1000)}`.slice(-2)
        const secs = `${Math.floor(timer / 1000)}`
        const getSeconds = `0${secs % 60}`.slice(-2)
        const getMinutes = `0${Math.floor(timer / 60000 % 60)}`.slice(-2)
        const getHours = `0${Math.floor(getMinutes / 60)}`.slice(-2)

        return `${getHours} : ${getMinutes} : ${getSeconds} : ${getMiliSeconds}`
    }
    useEffect(() => {
        let interval = null;
        if (start) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10);

        }
        else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [start])




    const handleFlag = () => {
        flags.push(formatTime(time));
        // console.log(flags);
        displayFlags();
    }
    let displayFlags = () => {
        const lis = document.getElementsByClassName("ls")[0];
        const element = flags[index];
        index = index + 1;
        lis.innerHTML += `<li>&#9872;&nbsp;&nbsp;${element}</li>`


    }

    const clearFlags = () => {
        const lis = document.getElementsByClassName("ls")[0];
        lis.innerHTML = "";
        while (flags.length) { flags.pop(); }
        index = 0;
    }



    return (
        <div className='App'>
            <div className="stopwatch-card">
                <h3>Reactified StopWatch {element} </h3>
                <div className="timer">
                    <h1>
                        <span>{formatTime(time)}</span>

                    </h1>
                    <div className='buttons'>
                        <button onClick={() => { setStart(true) }}>Start</button>
                        <button onClick={() => { setStart(false) }}>Stop</button>
                        <button onClick={() => { setTime(0); setStart(false); }}>Reset</button>
                        <button onClick={handleFlag}><i className='flagIcon'>&#9872;</i></button>

                    </div>
                </div>
            </div>
            <div className="flags">
                <center className="sticky">Flags</center>
                <div className='scroll-pad'>
                    <ul className="ls"></ul>
                </div>
                <button className="flag-reset" onClick={clearFlags}>CLEAR</button>
            </div>

        </div>
    )
}







