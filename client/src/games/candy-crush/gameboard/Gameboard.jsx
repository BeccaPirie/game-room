// coded with help from tutorial
// https://www.youtube.com/watch?v=PBrEq9Wd6_U&list=PLlAY3uJFrlo5-0ghjA64f5YbJIWXD-DQ4&index=9&t=12s

import { useState, useEffect, useCallback } from "react"
import "./gameboard.scss"
import Scoreboard from '../scoreboard/Scoreboard'
import blue from "../images/blue.jpg"
import green from "../images/green.jpg"
import orange from "../images/orange.jpg"
import purple from "../images/purple.jpg"
import red from "../images/red.jpg"
import yellow from "../images/yellow.jpg"
import empty from "../images/empty.jpg"
import Candies from "../candies/Candies"
import EndScreen from "../endScreen/EndScreen"

const width = 8
const colours = [green, blue, purple, yellow, orange, red]
const levelUpGoal = [50, 200, 500, 1000, 2000]

export default function Gameboard() {
    const [currentArrangement, setCurrentArrangement] = useState([])
    const [squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

    const [gameScore, setGameScore] = useState(0)
    const [moves, setMoves] = useState(2)
    const [level, setLevel] = useState(0)

    const [isPlaying, setIsPlaying] = useState(true)

    // create the board
    useEffect(() => {
        const boardArrangement = []
        for(let i = 0; i < (width * width); i++) {
            const randomNumber = Math.floor(Math.random() * colours.length)
            const randomColour = colours[randomNumber]
            boardArrangement.push(randomColour)
        }
        setCurrentArrangement(boardArrangement)
    }, [])

    // check if level up
    const updateLevelUp = useCallback(() => {
        if(gameScore >= levelUpGoal[level] && moves > 0) {
            console.log("level up")
            setMoves(15)
            setLevel(level => level + 1)
        }
    },[gameScore, level, moves])

    // check for four matching colours in column
    const checkColOfFour = useCallback(() => {
        for(let i = 0; i <= 39; i++) {
            const findColOfFour = [i, i + width, i + width * 2, i + width * 3]
            const colourToCheck = currentArrangement[i]
            const isBlank = currentArrangement[i] === empty
            // if every item in the array is the same colour, remove colour
            if(findColOfFour.every(item => currentArrangement[item] === colourToCheck && !isBlank)) {
                findColOfFour.forEach(item => currentArrangement[item] = empty)
                setGameScore(score => score + 4)
                updateLevelUp()
                return true
            }
        }
    }, [currentArrangement, updateLevelUp])

    // check for four matching colours in row
    const checkRowOfFour = useCallback(() => {
        for(let i = 0; i < 64; i++) {
            const findRowOfFour = [i, i + 1, i + 2, i + 3]
            const colourToCheck = currentArrangement[i]
            const isBlank = currentArrangement[i] === empty

            // don't check invalid squares
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            if(notValid.includes(i)) continue

            // if every item in the array is the same colour, remove colour
            if(findRowOfFour.every(item => currentArrangement[item] === colourToCheck && !isBlank)) {
                findRowOfFour.forEach(item => currentArrangement[item] = empty)
                setGameScore(score => score + 4)
                updateLevelUp()
                return true
            }
        }
    }, [currentArrangement, updateLevelUp])

    // check for three matching colours in column
    const checkColOfThree = useCallback(() => {
        for(let i = 0; i <= 47; i++) {
            const findColOfThree = [i, i + width, i + width * 2]
            const colourToCheck = currentArrangement[i]
            const isBlank = currentArrangement[i] === empty
            // if every item in the array is the same colour, remove colour
            if(findColOfThree.every(item => currentArrangement[item] === colourToCheck && !isBlank)) {
                findColOfThree.forEach(item => currentArrangement[item] = empty)
                setGameScore(score => score + 3)
                updateLevelUp()
                return true
            }
        }
    }, [currentArrangement, updateLevelUp])

    // check for three matching colours in a row
    const checkRowOfThree = useCallback(() => {
        for(let i = 0; i < 64; i++) {
            const findRowOfThree = [i, i + 1, i + 2]
            const colourToCheck = currentArrangement[i]
            const isBlank = currentArrangement[i] === empty

            // don't check invalid squares
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            if(notValid.includes(i)) continue

            // if every item in the array is the same colour, remove colour
            if(findRowOfThree.every(item => currentArrangement[item] === colourToCheck && !isBlank)) {
                findRowOfThree.forEach(item => currentArrangement[item] = empty)
                setGameScore(score => score + 3)
                updateLevelUp()
                return true
            }
        }
    }, [currentArrangement, updateLevelUp])

    // fill empty squares when colours are removed
    const fillEmptySquares = useCallback(() => {
        for(let i = 0; i <= 55; i++) {
            const topRow = [0, 1, 2, 3, 4, 5, 6, 7]

            // if top row square is empty, add a random colour
            if(topRow.includes(i) && currentArrangement[i] === empty) {
                const randomNumber = Math.floor(Math.random() * colours.length)
                currentArrangement[i] = colours[randomNumber]
            }

            // if square below is empty, move colour down and set to empty
            if(currentArrangement[i + width] === empty) {
                currentArrangement[i + width] = currentArrangement[i]
                currentArrangement[i] = empty
            }
        }
    }, [currentArrangement])

    const dragStart = (e) => setSquareBeingDragged(e.target)
    const dragDrop = (e) => setSquareBeingReplaced(e.target)

    const dragEnd = () => {
        // get ids of squares bring dragged and replaced
        const draggedId = parseInt(squareBeingDragged.getAttribute('id'))
        const replacedId = parseInt(squareBeingReplaced.getAttribute('id'))

        // switch colours
        currentArrangement[draggedId] = squareBeingReplaced.getAttribute('src')
        currentArrangement[replacedId] = squareBeingDragged.getAttribute('src')

        // check if move is valid
        const validMoves = [draggedId + 1, draggedId - 1,
            draggedId + width, draggedId - width]

        // check for cols/rows of three/four
        const colOfFour = checkColOfFour()
        const rowOfFour = checkRowOfFour()
        const colOfThree = checkColOfThree()
        const rowOfThree = checkRowOfThree()

        // if move is valid and creates a row/col, set colour to ""
        if(replacedId && validMoves.includes(replacedId) && 
        (colOfFour || rowOfFour || rowOfThree || colOfThree)) {
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
            setMoves(moves => moves - 1)
        }
        // switch colours back if move isn't valid
        else {
            currentArrangement[draggedId] = squareBeingDragged.getAttribute('src')
            currentArrangement[replacedId] = squareBeingReplaced.getAttribute('src')
            setCurrentArrangement([...currentArrangement])
        }
    }

    useEffect(() => {
        if(moves > 0) {
            console.log(moves)
            const timer = setInterval(() => {
                checkColOfFour()
                checkRowOfFour()
                checkColOfThree()
                checkRowOfThree()
                fillEmptySquares()
                setCurrentArrangement([...currentArrangement])
            }, 100)
            return() => clearInterval(timer)
        }
        if(moves <= 0) {
            const timer = setTimeout(() => {
                setIsPlaying(false)
            }, 2000)
            return() => clearTimeout(timer)
        }
    }, [moves, checkColOfFour, checkRowOfFour, checkColOfThree,
        checkRowOfThree, fillEmptySquares, currentArrangement])

    return(
        isPlaying ?
            <div className="container">
                <div className="board">
                    {currentArrangement.map((colour, index) => (
                        <Candies key={index} index={index} colour={colour}
                        dragStart={dragStart} dragDrop={dragDrop}
                        dragEnd={dragEnd} isPlaying={isPlaying}/>
                    ))}
                </div>
            <Scoreboard score={gameScore} moves={moves} level={level}/>
        </div>
        : <EndScreen score={gameScore}/>
    )
}