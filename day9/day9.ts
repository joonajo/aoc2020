import { readInput } from "../common";

const input = readInput('day9/input.txt')

const findPair = (range: number[], target: number): number[] | null => {
    for (let num of range) {
        const pair = range.find(val => ((val + num ) === target) && val !== num)

        if (!!pair) {
            return [num, pair]
        }
    }

    return null
}

const run = (preambleCount: number) => {
    const parsedInput = input.map(val => parseInt(val))

    for (let i = preambleCount; i < parsedInput.length ; i++) {
        const target = parsedInput[i]
        const range = parsedInput.slice(i - preambleCount, i)

        const pair = findPair(range, target)
        
        if (pair === null) {
            console.log('Part 1 solution:', target)
            return
        }
    }
}

const PREAMBLE_COUNT = 25

run(PREAMBLE_COUNT)