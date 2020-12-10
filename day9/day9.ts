import { readInput } from "../common";

const input = readInput('day9/input.txt')
const parsedInput = input.map(val => parseInt(val))

const findPair = (range: number[], target: number): number[] | null => {
    for (let num of range) {
        const pair = range.find(val => ((val + num ) === target) && val !== num)

        if (!!pair) {
            return [num, pair]
        }
    }

    return null
}

const findInvalidNumber = (preambleCount: number) => {
    for (let i = preambleCount; i < parsedInput.length - 1; i++) {
        const target = parsedInput[i]
        const range = parsedInput.slice(i - preambleCount, i)

        const pair = findPair(range, target)
        
        if (pair === null) {
            console.log('Part 1 solution:', target)
            return target
        }
    }
}

const findNumberSet = (target: number) => {
    for (let i = 0; i < parsedInput.length; i++) {
        let currentSum = parsedInput[i]
        for (let j = i + 1; j < parsedInput.length - 1; j++) {
            const numToCheck = parsedInput[j]
            currentSum += numToCheck
            if (currentSum === target) {
                const range = parsedInput.slice(i, j + 1)
                const biggestNumber = Math.max(...range)
                const smallestNumber = Math.min(...range)
                console.log('Part 2 solution:', biggestNumber + smallestNumber)
            }            

            if (currentSum > target) {
                break
            }
        }
    }
}

const PREAMBLE_COUNT = 25

const invalidNumber = findInvalidNumber(PREAMBLE_COUNT)

findNumberSet(invalidNumber)
