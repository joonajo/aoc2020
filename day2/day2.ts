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

const runPart2 = () => {
    let numOfValidPassowords = 0

    for (const combination of input) {
        let splitCombination = combination.split('-')

        const [indexOne] = splitCombination as unknown as number[]
        splitCombination = splitCombination[1].split(' ')
        const [indexTwo] = splitCombination as unknown as number[]
        const [passwordLetter] = splitCombination[1].split(':')
        const passwordCombination = splitCombination[2]

        if (passwordCombination[indexOne - 1] === passwordLetter) {
            if (passwordCombination[indexTwo - 1] !== passwordLetter) {
                numOfValidPassowords++
            }
        }

        if (passwordCombination[indexOne - 1] !== passwordLetter) {
            if (passwordCombination[indexTwo - 1] === passwordLetter) {
                numOfValidPassowords++
            }
        }
    }

    console.log('Part 2 solution:', numOfValidPassowords)
}

runPart1()
runPart2()