import { readInput } from "../common";

const adapters = readInput('day10/input.txt').map(voltage => parseInt(voltage)).sort((a, b) => a - b)

const MIN_JOLTAGE = 0
const JOLTAGE_TRESHOLD = 3

let currentJoltage = MIN_JOLTAGE

const run = () => {
    let counts = {
        1: 0,
        2: 0,
        3: 0
    }

    counts[adapters[0]] += 1
    counts[3] += 1

    for (let i = 0; i < adapters.length - 1; i++) {
        const adapterA = adapters[i]
        const adapterB = adapters[i + 1]

        const difference = adapterB - adapterA

        counts[difference] += 1
    }

    console.log('Part 1 solution', counts[1] * counts[3])
}

run()