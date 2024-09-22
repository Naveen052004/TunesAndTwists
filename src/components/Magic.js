import React, { useEffect, useState } from 'react'
import '../App.css'
import SingleCard from './SingleCard'

const cardImg = [
    { 'src': '/img/helmet-1.1.png', matched: false },
    { 'src': '/img/potion-1.1.png', matched: false },
    { 'src': '/img/ring-1.1.png', matched: false },
    { 'src': '/img/scroll-1.1.png', matched: false },
    { 'src': '/img/shield-1.1.png', matched: false },
    { 'src': '/img/sword-1.1.png', matched: false },
]

// const cardImg = [
//     { 'src': '/img/helmet-1.1.png', matched:false },
//     { 'src': '/img/potion-1.1.png', matched:false },
//     { 'src': '/img/ring-1.1.png', matched:false },
//     { 'src': '/img/scroll-1.1.png', matched:false },
//     { 'src': '/img/shield-1.1.png', matched:false },
//     { 'src': '/img/sword-1.1.png', matched:false },
// ]

function Magic() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const shuffleCards = () => {
        const shuffleCards = [...cardImg, ...cardImg]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffleCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        }
                        return card
                    })
                })
                resetTurn();
            }
            else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);
    //  console.log(cards)
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(turns + 1)
        setDisabled(false);
    }
    useEffect(() => {
        shuffleCards(cards)
    }, [])
    return (
        <div className="App">
            {/* <h1>Magic Match</h1> */}

            <div className="card-grid">
                {cards.map(card => (
                    <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disable={disabled} />
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
                <span>Turns : {turns}</span>
                <button onClick={shuffleCards}>New Game</button>
            </div>
        </div>
    )
}

export default Magic