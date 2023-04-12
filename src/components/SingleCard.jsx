import React from 'react'
import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped}) {

    const handleClick = () => {
         handleChoice(card)//pass in the cards we have chosen
    }

  return (
    <div className="card">
        <div className={flipped ? "flipped" : ""}>
            <img className="front" src={card.src} alt="card front" />
            <img 
            className="back" 
            src="/img/cover.png" 
            onClick={handleClick} 
            alt="card back" />
        </div>
    </div>

  )
}
