import { readInput } from "../common";

const input = readInput('day1/input.txt')

const TARGET_NUMBER = 2020

const part1 = () => {
    for (const num of input) {
        const currentNumber = (num as unknown as number)
        const neededNumber = TARGET_NUMBER - currentNumber
    
        if (input.includes(neededNumber.toString())) {
            return currentNumber * neededNumber
        }
    }
}

const part2 = () => {
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = i + 1; j < input.length - 1; j++) {
            const numberOne = input[i] as unknown as number
            const numberTwo = input[j] as unknown as number

            const neededNumber = TARGET_NUMBER - numberOne - numberTwo

            if (neededNumber > 0) {
                if (input.includes(neededNumber.toString())) {
                    return numberOne * numberTwo * neededNumber
                }
            }
        }
    }
}


console.log('Part 1 solution:', part1())
console.log('Part 2 solution:', part2())
