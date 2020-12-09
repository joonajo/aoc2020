import { readInput } from "../common";

const input = readInput('day7/input.txt')

const TARGET_BAG = 'shiny gold bag'

const run = () => {    
    const findBagsThatContainTarget = (target: string) => {
        const linesWithTargetBag = [...input.filter(line => line.includes(target))]
        
        const bagsThatContainTargetBag = []

        linesWithTargetBag.forEach(line => {
            if (!line.split('bags')[0].includes('shiny gold')) {
                bagsThatContainTargetBag.push(line.split(' bags')[0])
            }
        })
        return bagsThatContainTargetBag
    }

    const bagStack = [TARGET_BAG]
    const checkedBags = []

    while (bagStack.length > 0) {
        const bagToCheck = bagStack.shift()
        checkedBags.push(bagToCheck)
        findBagsThatContainTarget(bagToCheck).forEach(bag => {
            if (!checkedBags.includes(bag) && !bagStack.includes(bag)) {
                bagStack.push(bag)
            }
        })
    }

    console.log("Part 1 solution:", checkedBags.length - 1)
}

run()