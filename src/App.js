import React, {useState, useEffect} from 'react';
import Die from "./components/Die";
import {nanoid} from "nanoid"

import Confetti from 'react-confetti'

const App = () => {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const heldDice = dice.every(die => die.isHeld === true)
        const firstDie = dice[0].value
        const sameValueDice = dice.every(die => die.value === firstDie)
        console.log(dice[0].value)
        if (heldDice && sameValueDice) {
            console.log("YOU WIN")
            setTenzies(true)
        }

    }, [dice])

    function generateNewDie() {
        return {
            value: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const dice = []
        for (let i = 0; i < 10; i++) {
            dice.push(generateNewDie())
        }
        return dice
    }

    function rollDice() {
        if (tenzies) {
            setDice(allNewDice())
            setTenzies(prevTenzies => !prevTenzies)
        } else {
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld ? die : generateNewDie()
            }))
        }
    }
    function holdDice(id) {
        // FIRST SOLUTION
        // const newDice = []
        // dice.map(die => {
        //     if (die.id === id) {
        //         newDice.push({
        //             ...die,
        //             isHeld: !die.isHeld
        //         })
        //     } else {
        //         newDice.push(die)
        //     }
        // })
        // setDice(prevDice => prevDice)

        setDice(prevDice => prevDice.map(die => {
            return die.id === id
            ? {...die, isHeld: !die.isHeld}
            : die
        }))
    }

    const diceElements =  dice.map(die =>
        <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            hold={holdDice}
            id={die.id}
        />
    )

    return (
        <main>
            {tenzies && <Confetti />
            }

            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice'>
                {diceElements}
            </div>
            <button className='roll' onClick={rollDice}>
                <h1>{tenzies ? "New game"  : "Roll"}</h1>
            </button>
        </main>
    );
};

export default App;