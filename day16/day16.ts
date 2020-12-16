import { readInput } from "../common";

const instructions = readInput('day16/input.txt')

const run = () => {
    const validNumbers: number[] = []
    const invalidNumbers: number[] = []
    const validTickets = []

    const validNumbersInstructions = instructions.splice(0, instructions.indexOf(''))
    const yourTicket = instructions.splice(0, 4).splice(1, 2)
    const nearbyTickets = [...instructions]
    yourTicket.shift()
    nearbyTickets.shift()

    for (let line of validNumbersInstructions) {
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
    }

    for (let line of nearbyTickets) {
        let validTicket = true
        const splitLine = line.split(',')
                
        for (let num of splitLine) {
            const parsedNum = parseInt(num)
            if (!validNumbers.includes(parsedNum)) {
                invalidNumbers.push(parsedNum)
            }
        }

        if (validTicket) {
            validTickets.push(line)
        }
    }


    const sum = invalidNumbers.reduce((curr, num) => {
        if (!!num) {
            return curr + num
        }
        return curr
    }, 0)
    console.log('Part 1 solution:', sum)

    const ranges = []

    for (let line of validNumbersInstructions) {
        const name = line.split(':')[0]
        const splitNumbers = line.split(':')[1].split('or')
        
        const numA = parseInt(splitNumbers[0].trim().slice(0, splitNumbers[0].trim().indexOf('-')))
        const numB = parseInt(splitNumbers[0].trim().slice(splitNumbers[0].trim().indexOf('-') + 1,))
        const numC = parseInt(splitNumbers[1].trim().slice(0, splitNumbers[1].trim().indexOf('-')))
        const numD = parseInt(splitNumbers[1].trim().slice(splitNumbers[1].trim().indexOf('-') + 1,))
        
        const rangeOne = {
            start: numA, end: numB
        }

        const rangeTwo = {
            start: numC, end: numD
        }

        ranges.push({ name, rangeOne, rangeTwo })
    }
    
    for (let i = 0; i < ranges.length; i++) {
        const allPossibleSections: string[] = []
        for (let validTicket of validTickets) {
            const possibleSections: string[] = []
            const num = parseInt(validTicket[i])
            
            for (let range of ranges) {
                if ((range.rangeOne.start <= num && num <= range.rangeOne.end) || (range.rangeTwo.start <= num && num <= range.rangeTwo.end)) {
                    possibleSections.push(range.name)
                }
            }

            if (allPossibleSections.length === 0) {
                allPossibleSections.push(...possibleSections)
            } else {
                for (let section of possibleSections) {
                    if (!allPossibleSections.includes(section)) {
                        allPossibleSections.filter(val => val !== section)
                    }
                }
            }
        }   
        console.log(allPossibleSections)
    }
}

run()