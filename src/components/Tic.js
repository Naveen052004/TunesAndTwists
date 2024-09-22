import { useState } from "react";

function Square({ value, onSquareClick }) {
  const [values, setValue] = useState(null);
  // function handleClick() {
  //   if(values != 'X')
  //   setValue('X');
  //   else 
  //     setValue('');
  // }
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ turn, square, onPlay }) {
  // console.log(square)
  // function handleClick(i){
  //   if(winner(square) || square[i])
  //     return;
  //   const nextSquare = square.slice();
  //   if(turn)
  //     nextSquare[i] = 'X';
  //   else
  //     nextSquare[i] = 'O';
  //   setTurn(!turn);
  //   setSquares(nextSquare);
  // }
  function handleClick(i) {
    if (winner(square) || square[i])
      return;
    const nextSquare = square.slice();
    if (turn)
      nextSquare[i] = 'X';
    else
      nextSquare[i] = 'O';
    onPlay(nextSquare);
  }
  let win = winner(square)
  let status;
  if (win)
    status = "Winner is " + win;
  else
    status = 'Turn of ' + (turn ? 'X' : 'O');
  return (
    <>
      <div>

        <h1>Play Here</h1>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={square[0]} onSquareClick={() => handleClick(0)} />
          <Square value={square[1]} onSquareClick={() => handleClick(1)} />
          <Square value={square[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={square[3]} onSquareClick={() => handleClick(3)} />
          <Square value={square[4]} onSquareClick={() => handleClick(4)} />
          <Square value={square[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={square[6]} onSquareClick={() => handleClick(6)} />
          <Square value={square[7]} onSquareClick={() => handleClick(7)} />
          <Square value={square[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const turn = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setCurrentMove(nextHistory.length - 1);
    setHistory(nextHistory);
    // setTurn(!turn);
  }
  function jumpTo(move) {
    setCurrentMove(move);
    // setTurn(move%2 === 0);
  }
  const moves = history.map((squares, move) => {
    let des;
    if (move > 0)
      des = 'Go to move #' + move;
    else
      des = 'Go to game start';
    return (
      <li key={move} >
        <button onClick={() => jumpTo(move)}>{des}</button>
      </li>
    );
  });

  const newGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0)
  }
  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board turn={turn} square={currentSquares} onPlay={handlePlay}></Board>
          <button onClick={newGame} style={
            {marginTop:'80px'}
          }>Play Again</button>
        </div>
        <div className="game-info">
          <h3>Previous Moves</h3>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}

function winner(squares) {
  const temp = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < temp.length; i++) {
    const [a, b, c] = temp[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}