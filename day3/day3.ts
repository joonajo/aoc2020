import { readInput } from "../common";

const TREE_SYMBOL = '#'

const input = readInput('day3/input.txt')

const runPart1 = () => {
    
    let numOfTrees = 0
    let currPosition = 0
    let movement = 3

    for (const line of input) {

        if (line[currPosition] === TREE_SYMBOL) {
            numOfTrees++
        }
        currPosition = (currPosition + movement) < line.length ? currPosition + movement : currPosition + movement - line.length
    }

    console.log('Part 1 solution:', numOfTrees)
}

const runPart2 = () => {
        
    const numOfTrees: number[] = []
    let movements = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 },
    ]

    for (let movement of movements) {
        let numberOfTreesForMovement = 0
        let currPosition = 0
        for (let i = 0; i < input.length; i += movement.y) {
            if (!input[i]) {
                break
            }

            const line = input[i]

            if (line[currPosition] === TREE_SYMBOL) {
                numberOfTreesForMovement++
            }

            currPosition = (currPosition + movement.x) < line.length ? currPosition + movement.x : currPosition + movement.x - line.length
        }

        numOfTrees.push(numberOfTreesForMovement)
    }

    const solution = numOfTrees.reduce((current, value) => current * value, 1)
    
    console.log('Part 2 solution:', solution)
}

runPart1()
runPart2()