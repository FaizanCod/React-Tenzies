import React, { useEffect, useState } from "react";
import Dice from './Dice';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

function App() {
    const [diceElements, setDiceElements] = useState(allNewDice());
    // state to check if user has won the game
    const [tenzies, setTenzies] = useState(false);
    
    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.floor(Math.random() * 6) + 1, 
            isHeld: false
        }
    }

    function allNewDice() {
        // const randomNumber = ;
        const randomDice = [];
        for (let i = 0; i < 10; i++) {
            randomDice.push(generateNewDie());
        }
        return randomDice;
    }

    function holdDice(diceId) {
        // checking for id of dice and flipping isHeld property
        setDiceElements(oldDiceElements => 
            oldDiceElements.map(diceElement => {
                return diceElement.id === diceId ? 
                    {...diceElement, isHeld: !diceElement.isHeld} :
                    {...diceElement}
        }));
    }

    function rollDice() {
        // rolling all those die which are unset
        if (!tenzies) {
            setDiceElements(oldDiceElements =>
                oldDiceElements.map(diceElement => {
                    return diceElement.isHeld ?
                        diceElement :
                        generateNewDie()
            }));
        } else {
            setTenzies(false);
            setDiceElements(allNewDice());
        }
    }

    const die = diceElements.map(diceElement => (
        <Dice
            // key={}
            key={diceElement.id}
            id={diceElement.id}
            value={diceElement.value}
            isHeld={diceElement.isHeld}
            handleHold={() => holdDice(diceElement.id)}
        />
    ))

    useEffect(() => {
        // checks if all dice elements are held
        const allHeld = diceElements.every(diceElement => diceElement.isHeld);
        // checks if all dice elements have same value
        const firstValue = diceElements[0].value;
        const allSameValue = diceElements.every(diceElement => diceElement.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
            console.log('You won!');
        }
    }, [diceElements]);

    return (
        <main className="main">
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <h4 className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h4>
            <div className="dice-container">
                {die}
            </div>
            <button 
                className="roll-btn"
                onClick={rollDice}
            >
                    {
                        tenzies ? 
                        "New Game" : 
                        "Roll"
                    }
            </button>
        </main>
    );
};

export default App;