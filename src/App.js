
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard'

const cardImages = [
  {"src" : "/img/dazai.png", matched: false},
  {"src" : "/img/diluc.jpg", matched: false},
  {"src" : "/img/levi.png", matched: false},
  {"src" : "/img/luffy.png", matched: false},
  {"src" : "/img/tanjiro.png", matched: false},
  {"src" : "/img/todoroki.jpg", matched: false},
  {"src" : "/img/tomori.png", matched: false},
  {"src" : "/img/yuri.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  //to compare whether the cards match or not
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)


//shuffle cards
  const shuffleCards = () => {
    // (...) are used for spreading cardImages, place each elements in the elements in the array
    const shuffledCards = [...cardImages, ...cardImages]
    //used sort to shuffle the cards randomly
    .sort(() => Math.random() - 0.5)//if the num is less than zero the order will remain the same, +ve the order will switch
    .map((card) => ({...card, id: Math.random() }))
 
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

//handle a choice
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)//evaluate false when null
}

//compare 2 selected cards
useEffect(() => {
  if (choiceOne && choiceTwo) {

    if(choiceOne.src === choiceTwo.src) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src){
            return {...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else {
      
      setTimeout(() => resetTurn(), 1000)
    }
  }
}, [choiceOne, choiceTwo])

console.log(cards)

//reset choice & increase turn

const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
}

//start a new game automatically
useEffect(() => {
  shuffleCards()
}, [])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          
          />
        ))}
        
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
