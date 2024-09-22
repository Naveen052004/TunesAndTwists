import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import './SpeedType.css'


function generateRandomParagraph(numWords, minWordLength, maxWordLength) {
    let randomParagraph = "";
    for (let i = 0; i < numWords; i++) {
        // Generate random word length between min and max
        const wordLength = Math.floor(Math.random() * (maxWordLength - minWordLength + 1)) + minWordLength;
        randomParagraph += generateRandomWord(wordLength) + " ";
    }
    return randomParagraph;
}

function generateRandomWord(length) {
    const charset = "abcdefghijklmnopqrstuvwxyz ";
    let randomWord = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomWord += charset[randomIndex];
    }
    return randomWord;
}



function SpeedType() {
    const maxTime = 60;
    const [para, setPara] = useState(generateRandomParagraph(30, 1, 10));
    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [mistakes, setMistakes] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [WPM, setWPM] = useState(0)
    const [CPM, setCPM] = useState(0)
    const charRefs = useRef([])
    const inputRef = useRef(null)
    const [correctWrong, setCorrectWrong] = useState([])

    useEffect(() => {
        inputRef.current.focus();
        setCorrectWrong(Array(charRefs.current.length).fill(''))
    }, [])

    useEffect(() => {
        if(!isTyping)
            return;
        let interval;
        if (isTyping && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
                let correctChars = charIndex - mistakes;
                let totalTime = maxTime - timeLeft;

                let cpm = correctChars * (60 / totalTime)
                cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
                setCPM(parseInt(cpm, 10));

                let wpm = Math.round((correctChars / 5 / totalTime) * 60);
                wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
                setWPM(parseInt(wpm));
            }, 1000)
        }
        else if (timeLeft === 0) {
            clearInterval(interval);
            setIsTyping(false);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isTyping, timeLeft]);

    const resetGame = () => {
        setIsTyping(false);
        setPara(generateRandomParagraph(30, 1, 10));
        setTimeLeft(maxTime);
        setMistakes(0);
        setCharIndex(0);
        setWPM(0);
        setCPM(0);
        setCorrectWrong(Array(charRefs.current.length).fill(''))
        inputRef.current.focus();
        inputRef.current.value = '';
    }

    const handleChange = (e) => {
        const chars = charRefs.current
        let currentChar = charRefs.current[charIndex];
        let typedChar = e.target.value.slice(-1);
        if (charIndex < chars.length && timeLeft > 0) {
            if (!isTyping)
                setIsTyping(true);
            if (typedChar === currentChar.textContent) {
                setCharIndex(charIndex + 1);
                correctWrong[charIndex] = 'correct'
            } else {
                setCharIndex(charIndex + 1);
                correctWrong[charIndex] = 'wrong'
                setMistakes(mistakes + 1);
            }
            if (charIndex === chars.length-1)
                setIsTyping(false);
        }
        else
            setIsTyping(false);
    }

    return (
        <div>
            <h1 style={
                { margin: '40px' }
            }>SpeedType, Test Your Speed</h1>
            <div className="test" onClick={()=>inputRef.current.focus()}>
                <input type="text" className="input-field" ref={inputRef} onChange={handleChange} />
                {
                    para.split('').map((char, index) => (
                        <span key={index} className={`char ${index === charIndex ? 'active' : ''} ${correctWrong[index]}`} ref={(e) => charRefs.current[index] = e} >{char}</span>
                    ))
                }
            </div>
            <div className="result">
                <p>Time Left : <strong>{timeLeft}</strong> </p>
                <p>Mistakes : <strong>{mistakes}</strong> </p>
                <p>WPM : <strong>{WPM}</strong></p>
                <p>CPM : <strong>{CPM}</strong></p>
                <p>
                    <button onClick={resetGame}>New Game</button>
                </p>
            </div>
        </div>
    )
}

export default SpeedType