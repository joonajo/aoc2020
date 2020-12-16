import { readInput } from "../common";

const instructions = readInput('day16/input.txt')

const partOne = () => {
    const validNumbers: number[] = []
    const invalidNumbers: number[] = []

    let lastLineWasOwnTicket = false

    for (let line of instructions) {

        if (line.indexOf('or') !== -1) {
            const numbers = line.split(':')
            const splitNumbers = numbers[1].split('or')

            const numA = parseInt(splitNumbers[0].trim().slice(0, splitNumbers[0].trim().indexOf('-')))
            const numB = parseInt(splitNumbers[0].trim().slice(splitNumbers[0].trim().indexOf('-') + 1,))
            const numC = parseInt(splitNumbers[1].trim().slice(0, splitNumbers[1].trim().indexOf('-')))
            const numD = parseInt(splitNumbers[1].trim().slice(splitNumbers[1].trim().indexOf('-') + 1,))
            
            for (let i = numA; i <= numB; i++) {
                if (!validNumbers.includes(i)) {
                    validNumbers.push(i)
                }
            }

            for (let i = numC; i <= numD; i++) {
                if (!validNumbers.includes(i)) {
                    validNumbers.push(i)
                }            
            }
        } else {
            if (line.indexOf('your') !== -1) {
                lastLineWasOwnTicket = true
            } else if (line.indexOf('nearby') !== -1) {
                lastLineWasOwnTicket = false
            } else {
                if (!lastLineWasOwnTicket) {
                    const splitLine = line.split(',')
                    
                    for (let num of splitLine) {
                        const parsedNum = parseInt(num)
                        if (!validNumbers.includes(parsedNum)) {
                            invalidNumbers.push(parsedNum)
                        }
                    }
                }
            }   
        }
    }

    let sum = invalidNumbers.reduce((curr, num) => {
        if (!!num) {
            return curr + num
        }
        return curr
    }, 0)
    console.log(sum)
}

partOne()