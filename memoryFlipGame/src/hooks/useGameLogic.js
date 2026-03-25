import { useState, useEffect } from 'react'

export const useGameLogic = (cardContent)=>{

    const [cards,setCards] = useState([]);
    const [flippedCards,setFlippedCards] = useState([])
    const [matchedCards,setMatchedCards] = useState([])
    const [score,setScore] = useState(0);
    const [moves,setMoves] = useState(0);
    const [islocked,setIsLocked] = useState(false);

    const shuffleArr = (arr) => {
      const shuffled = [...arr];
      for (let i = shuffled.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [shuffled[i],shuffled[j]] = [shuffled[j],shuffled[i]]
      }
      return shuffled;
    }

    const initializeGame = ()=>{
        const shuffled = shuffleArr(cardContent)
        const finalCards = shuffled.map((val,idx)=>({
        id: idx,
        val,
        isFlipped : false,
        isMatched : false,
        }))

      setCards(finalCards)
      setIsLocked(false)
      setMoves(0)
      setScore(0)
      setMatchedCards([])
      setFlippedCards([])
    };

    useEffect(()=>{
      initializeGame();
    },[]);

    const handleCardClick =(card)=>{
      if (card.isFlipped||card.isMatched || islocked || flippedCards.length==2) {
        return;
      }


      const newCards = cards.map((c)=>{
        if(c.id == card.id){
          return{...c,isFlipped:true};
        }else{
          return c
        }
      })

      setCards(newCards)

      const newFlippedCards = [...flippedCards,card.id]
      setFlippedCards(newFlippedCards)

      if(flippedCards.length === 1){
        setIsLocked(true)
        const firstCard = cards[flippedCards[0]]
        if (firstCard.val === card.val){
          setTimeout(() => {
            setMatchedCards((prev) => [...prev,firstCard.id,card.id]);
            setScore((prev) => prev + 1)
            setCards((prev)=>
              prev.map((c)=>{
                if(c.id == card.id || c.id === firstCard.id){
                  return{...c,isMatched:true};
                }else{
                  return c
                }
              })
            )
            setFlippedCards([])
            setIsLocked(false)
              

          },500)


        }else{
          setTimeout(()=>{
            const flippedBackCard = newCards.map((c)=>{
              if(newFlippedCards.includes(c.id) || c.id === card.id){
                return{...c,isFlipped:false};
              }else{
                return c
              }
            });
            setCards(flippedBackCard)

            setFlippedCards([]);
            setIsLocked(false)
          },800)
        }
        setMoves((prev) => prev+1)
      }
    };

    const isGameCompleted = matchedCards.length === cardContent.length

    return{cards,score,moves,isGameCompleted,initializeGame,handleCardClick}
}