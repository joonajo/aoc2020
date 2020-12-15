import { readInput } from "../common";


const input = readInput('day14/input.txt')

const partOne = () => {

    let memory: { [key: number]: number } = {}
    let reversedBitmask: string[] = [];

    for (let i = 0; i < input.length; i++) {
        const line = input[i]

        if (line.includes('mask')) {
            reversedBitmask = Array.from(line).reverse().slice(0, 36)
        } else {
            const splitLine = line.split(' = ')
            const value = parseInt(splitLine[1])
            const reversedBits = Array.from(value.toString(2)).reverse()

            const diff = reversedBitmask.length - reversedBits.length

            for (let k = 0; k < diff; k++) {
                reversedBits.push('0')
            }

            for (let j = 0; j < reversedBitmask.length; j++) {
                const maskValue = reversedBitmask[j]
                
                if (maskValue === '1' || maskValue === '0') {
                    reversedBits[j] = maskValue
                }
            }
            const address = parseInt(splitLine[0].slice(splitLine[0].indexOf('[') + 1, splitLine[0].indexOf(']')))

            let val = 0
            for (let j = 0; j < reversedBits.length; j++) {
                if (reversedBits[j] === '1') {
                    val += Math.pow(2, j)
                }
            }
            memory[address] = val
        }
    }

    let sum = 0

    Object.keys(memory).map(key => sum += memory[key])
    console.log('Part 1 solution:', sum)
}

const partTwo = () => {

    let memory: { [key: number]: number } = {}
    let reversedBitmask: string[] = [];
    const floatingValues: { value: number, address: number }[] = []

    for (let i = 0; i < input.length; i++) {
        const line = input[i]

        if (line.includes('mask')) {
            reversedBitmask = Array.from(line).reverse().slice(0, 36)
        } else {
            const splitLine = line.split(' = ')
            const value = parseInt(splitLine[1])
            const address = parseInt(splitLine[0].slice(splitLine[0].indexOf('[') + 1, splitLine[0].indexOf(']')))
            const reversedAddressBits = Array.from(address.toString(2)).reverse()

            const diff = reversedBitmask.length - reversedAddressBits.length

            for (let k = 0; k < diff; k++) {
                reversedAddressBits.push('0')
            }

            for (let j = 0; j < reversedBitmask.length; j++) {
                const maskValue = reversedBitmask[j]
                
                if (maskValue === '1' || maskValue === 'X') {
                    reversedAddressBits[j] = maskValue
                }
            }

            const floatingBits = reversedAddressBits.filter(bit => bit === 'X').length

            
        }
    }

    let sum = 0

    Object.keys(memory).map(key => sum += memory[key])
    console.log('Part 1 solution:', sum)
}

partOne()
partTwo()