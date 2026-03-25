
import { GameHeader } from './components/GameHeader'
import { Card } from './components/Card'
import { WinMsg } from './components/WinMsg'
import { useGameLogic } from './hooks/useGameLogic'


const cardContent = ["🦊","🐼","🦦","🐢","🐙","🐳","🦋","🦖","🦊","🐼","🦦","🐢","🐙","🐳","🦋","🦖"]

const App = () => {

  const {cards,score,moves,isGameCompleted,initializeGame,handleCardClick} = useGameLogic(cardContent);
  
  return (
    <div className='app'>
      <GameHeader score = {score} moves = {moves} onReset = {initializeGame}/>
      {isGameCompleted && <WinMsg moves = {moves}/>}


      <div className='cards-grid'>
        {cards.map((card)=>(
          <Card key={card.id} card = {card} onClick={handleCardClick} />
        ))}

      </div>

      
    </div>
  )
}

export default App
