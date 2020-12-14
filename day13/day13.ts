import { readInput } from "../common";


const notes = readInput('day13/input.txt')
const timestamp = parseInt(notes.shift())
const busIds =  notes.shift().split(',')

const partOne = () => {
    let closest = {
        value: -1,
        busId: null
    }

    for (let id of busIds) {
        if (id !== 'x') {
            const busId = parseInt(id)
            const division = timestamp / busId
            const min = Math.floor(division)
            const max = Math.ceil(division)
            const closestLegitValue = min * busId >= timestamp ? min * busId : max * busId
    
            if (closestLegitValue < closest.value || closest.busId === null) {
                closest = {
                    busId: id,
                    value: closestLegitValue
                }
            } 
        }
    }

    const solution = (closest.value - timestamp) * closest.busId
    console.log('Part 1 solution:', solution)
}

const partTwo = () => {
    const buses = busIds.map((id, index) => ({
        busId: id,
        busIndex: index,
    })).filter(bus => bus.busId !== 'x').map(bus => ({ ...bus, busId: parseInt(bus.busId)}))

    const { busId: firstBusId } = buses.shift()

    const matchingBus = buses.find(bus => bus.busIndex === firstBusId)

    const checkValue = timestamp => {
        for (let bus of buses) {
            if ((bus.busIndex + timestamp) % bus.busId !== 0) {
                return false
            }
        }
        return true
    }

    const busIdToUse = matchingBus ? matchingBus.busId : firstBusId
    const toAdd = busIdToUse
    let currentTimestamp = 100000000000000 - (100000000000000 % toAdd)
    console.log(toAdd, currentTimestamp)

    while (true) {
        const firstBusTimestamp = currentTimestamp - firstBusId

        if (firstBusTimestamp % firstBusId === 0 && checkValue(firstBusTimestamp)) {
            console.log('ay wadap', currentTimestamp)
            break
        }
        currentTimestamp += toAdd
    }
}

partOne()
partTwo()