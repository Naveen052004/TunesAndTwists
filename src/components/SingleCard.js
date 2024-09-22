import React from 'react'
import './SingleCard.css'
export default function SingleCard({card,handleChoice,flipped,disable}) {
    const handleClick = () =>{
        if(!disable)
            handleChoice(card)
    }
    return (
        <div className='card'>
            <div className={flipped ? "flipped":''}>
                <img src={card.src} className='front' alt='Card Front' />
                <img src="/img/cover1.jpg" alt="Cover" className='back' onClick={handleClick}/>
            </div>
        </div>
    )
}
