export const WinMsg = ({moves}) => {
  return (
    <div className="win-message">
      <h2>Congratulations!</h2>
      <p>You Completed the Game in {moves} moves</p>
    </div>
  )
}