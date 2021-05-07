import Board from '../Board/Board';
import { useState } from 'react'

function Game() {

    const [history, setHistory] = useState([[Array(9).fill(null)]]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    function handleClick(i) {
        const historyHandle = history.slice(0, stepNumber + 1);
        const current = historyHandle[historyHandle.length - 1];
        const squares = current.slice();
        if (calculateWinner(squares) || squares[i] === 'X' || squares[i] === 'O') {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(historyHandle.concat([squares]));
        setStepNumber(historyHandle.length);
        setXIsNext(!xIsNext);
        console.log(squares[i]);
    }

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }
    
    const current = history[stepNumber];
    const winner = calculateWinner(current);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Перейти к ходу #' + move :
            'К началу игры';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner ' + winner;
    } else {
        status = 'Next turn: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="board-game">
                <Board
                    squares={current}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;