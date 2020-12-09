import { readInput } from "../common";

const input = readInput('day8/input.txt')

type Action = 'nop' | 'acc' | 'jmp'

const Program = input => {
    const instructions = [...input]

    let running = true
    let currentIndex = 0
    let accumulator = 0

    const readInstructionIndexes = []

    const readInstruction = () => {
        if (readInstructionIndexes.includes(currentIndex)) {
            stopProgram()
        }

        readInstructionIndexes.push(currentIndex)

        const instruction = instructions[currentIndex].split(' ')

        const action: Action = instruction[0]
        const value = parseInt(instruction[1])

        switch (action) {
            case 'nop':
                currentIndex++
                break;
            case 'acc':
                addAccumulator(value)
                currentIndex++
                break;
            case 'jmp':
                jumpInstructions(value)
                break;
            default:
                stopProgram()
                break;
        }
        
    }

    const addAccumulator = value => {
        accumulator += value
    }

    const jumpInstructions = value => {
        currentIndex += value
    }

    const stopProgram = () => {
        running = false
        console.log('Part 1 solution:', accumulator)
    }

    while (running) {
        readInstruction()
    }
}

Program(input)