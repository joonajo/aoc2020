import { time } from "console";
import { readInput } from "../common";


const notes = readInput('day13/input.txt')
const timestamp = parseInt(notes.shift())
const busIds =  notes.shift().split(',').filter(id => id !== 'x').map(id => parseInt(id))


const partOne = () => {
    let closest = {
        value: -1,
        busId: null
    }
    for (let id of busIds) {
        const division = timestamp / id
        const min = Math.floor(division)
        const max = Math.ceil(division)
        const closestLegitValue = min * id >= timestamp ? min * id : max * id

        if (closestLegitValue < closest.value || closest.busId === null) {
            closest = {
                busId: id,
                value: closestLegitValue
            }
        } 
    }

    const solution = (closest.value - timestamp) * closest.busId
    console.log('Part 1 solution:', solution)
}

partOne()