import { readInput } from "../common"

type Row = 'F' | 'B'
type Column = 'R' | 'L'

const input = readInput('day5/input.txt')

const takeLowerHalf = (currentRange: { from: number, to: number }) => {
    const minus = (currentRange.to - currentRange.from) / 2
    return { ...currentRange, to: currentRange.to - minus }
}

const takeUpperHalf = (currentRange: { from: number, to: number }) => {
    const plus = (currentRange.to - currentRange.from) / 2
    return { ...currentRange, from: currentRange.from + plus }
}

const ROW_RANGE = { from: 0, to: 127 }
const COLUMN_RANGE = { from: 0, to: 7 }

const run = () => {
    const seatIds = []
    let highestSeatId = 0
    for (const line of input) {
        let row = ROW_RANGE
        let column = COLUMN_RANGE

        for (const letter of line) {
            switch (letter) {
                case 'F':
                    row = takeLowerHalf(row)
                    break;
                case 'B':
                    row = takeUpperHalf(row)
                    break;
                case 'R':
                    column = takeUpperHalf(column)
                    break;
                case 'L':
                    column = takeLowerHalf(column)
                    break;
                default:
                    break;
            }
        }
        const finalRow = Math.round((row.from + row.to) / 2)
        const finalColumn = Math.round((column.from + column.to) / 2)
        const seatId = finalRow * 8 + finalColumn
        seatIds.push(seatId)
        if (seatId > highestSeatId) {
            highestSeatId = seatId
        }
    }

    console.log('Part 1 solution:', highestSeatId)

    const SMALLEST_SEAT_ID = 1 * 8 + 1
    const BIGGEST_SEAT_ID = 128 * 8 + 8

    for (let currentSeatId = SMALLEST_SEAT_ID + 1; currentSeatId < BIGGEST_SEAT_ID; currentSeatId++) {
        if (!seatIds.includes(currentSeatId) && seatIds.includes(currentSeatId - 1) && seatIds.includes(currentSeatId + 1)) {
            console.log('Part 2 solution:', currentSeatId)
        }
    }
}

run()