import { readInput } from "../common";

const input = readInput('day8/input.txt')

type Action = 'nop' | 'acc' | 'jmp'

const Program = input => {
    const defaultInstructions = [...input]

    let running = true
    let currentIndex = 0
    let accumulator = 0
    let finished = false

    let readInstructionIndexes = []

    const readNextInstruction = (instructions = defaultInstructions) => {
        if (readInstructionIndexes.includes(currentIndex)) {
            duplicateInstruction()
            return
        }

        if (currentIndex >= instructions.length) {
            finishProgram()
            return
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
        }
        
    }

    const addAccumulator = value => {
        accumulator += value
    }

    const jumpInstructions = value => {
        currentIndex += value
    }

    const duplicateInstruction = () => {
        terminate()
    }

    const finishProgram = () => {
        console.log('Finished instructions.')
        console.log('Accumulator value:', accumulator)
        terminate()
    }

    const runDefaultInstructions = () => {
        running = true
        while (running) {
            readNextInstruction()
        }
    }

    const runWithCustomInstructions = customInstructions => {
        reset()
        while (running) {
            readNextInstruction(customInstructions)
        }
    }

    const reset = () => {
        running = true
        currentIndex = 0
        accumulator = 0
        readInstructionIndexes = []
    }

    const fixInstructions = () => {        
        const allNopAndJmpIndexes: number[] = defaultInstructions.reduce((indexes, current, index) => {
            const action = current.split(' ')[0]
            if (action === 'jmp' || action === 'nop') {
                return [...indexes, index]
            }
            return [...indexes]
        }, [])

        allNopAndJmpIndexes.forEach(index => {
            const oldAction = input[index].split(' ')[0]
            const newAction = oldAction === 'jmp' ? 'nop' : 'jmp'

            const newInstruction = newAction + ' ' + input[index].split(' ')[1]
            const newInstructions = [...input]
            newInstructions[index] = newInstruction

            runWithCustomInstructions(newInstructions)
        })
    }

    const terminate = () => {
        running = false
    }

    return { fixInstructions, runDefaultInstructions, terminate }
}

const partOneProgram = Program(input)

partOneProgram.runDefaultInstructions()

const partTwoProgram = Program(input)

partTwoProgram.fixInstructions()