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

    console.log(numOfTrees)
}

runPart1()