import { readInput } from "../common";

const input = readInput('day2/input.txt')

const runPart1 = () => {
    let numOfValidPassowords = 0

    for (const combination of input) {
        let splitCombination = combination.split('-')

        const [minNumber] = splitCombination as unknown as number[]
        splitCombination = splitCombination[1].split(' ')
        const [maxNumber] = splitCombination as unknown as number[]
        const [passwordLetter] = splitCombination[1].split(':')
        const passwordCombination = splitCombination[2]

        const regexp = new RegExp(passwordLetter, "gi")
        const numOfLetterInCombination = (passwordCombination.match(regexp) || []).length

        if (numOfLetterInCombination >= minNumber && numOfLetterInCombination <= maxNumber) {
            numOfValidPassowords++
        }
    }

    console.log('Part 1 solution:', numOfValidPassowords)
}

runPart1()