import * as R from 'ramda'

import { readInput } from "../common";

const input = readInput('day1/input.txt')

const TARGET_NUMBER = 2020

const run = () => {
    for (const num of input) {
        const currentNumber = (num as unknown as number)
        const neededNumber = TARGET_NUMBER - currentNumber
    
        if (input.includes(neededNumber.toString())) {
            return currentNumber * neededNumber
        }
    }
}

console.log('Part 1 solution:', run())