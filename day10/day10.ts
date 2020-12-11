import { readInput } from "../common";

const adapters = readInput('day10/input.txt').map(voltage => parseInt(voltage)).sort((a, b) => a - b)
adapters.unshift(0)
const biggestValue = Math.max(...adapters)
adapters.push(biggestValue + 3)

const partOne = () => {
    let counts = {
        1: 0,
        2: 0,
        3: 0
    }

    for (let i = 0; i < adapters.length - 1; i++) {
        const adapterA = adapters[i]
        const adapterB = adapters[i + 1]

        const difference = adapterB - adapterA

        counts[difference] += 1
    }

    console.log('Part 1 solution', counts[1] * counts[3])
}

const partTwo = () => {
    class Adapter {
        index: number;
        value: number;
        childAmount: number;
        parentAmount: number;

        constructor(index: number, value: number) {
            this.index = index
            this.value = value    
            this.childAmount = 0
            this.parentAmount = 0
        }
    }

    const MAX_TRESHOLD = 3

    const allAdapters = adapters.map((value, index) => new Adapter(index, value))

    for (let i = 0; i < allAdapters.length; i++) {
        const currAdapter = allAdapters[i]
        const nextThreeAdapterValues = [
            adapters[i + 1],
            adapters[i + 2],
            adapters[i + 3]
        ]
        
        
        for (let j = 0; j < nextThreeAdapterValues.length; j++) {
            const adapterValue = nextThreeAdapterValues[j]
            
            if (adapterValue - currAdapter.value <= MAX_TRESHOLD) {
                const foundAdapter = allAdapters[i + j + 1]
                currAdapter.childAmount += 1
                foundAdapter.parentAmount += 1
            }
        }
    }

    allAdapters.map(adapter => console.log(adapter.childAmount))
}

partOne()
partTwo()