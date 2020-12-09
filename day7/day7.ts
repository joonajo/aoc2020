import { readInput } from "../common";

const input = readInput('day7/input.txt')

const TARGET_BAG = 'shiny gold'

const run = () => {    
    const findBagsThatContainTarget = (target: string) => {
        const linesWithTargetBag = [...input.filter(line => line.includes(target))]
        
        const bagsThatContainTargetBag = []

        linesWithTargetBag.forEach(line => {
            if (!line.split('bags')[0].includes(TARGET_BAG)) {
                bagsThatContainTargetBag.push(line.split(' bag')[0])
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

    const findBagsThatTargetContains = (target: Bag) => {
        const lineWithBag = input.find(line => {
            const splitLine = line.split(' ')
            return splitLine[0] + ' ' + splitLine[1] === target.bag
        })

        const splitLine = lineWithBag.split(' ').splice(4,)

        const containedBags = []
        
        if (splitLine[0] === 'no') return []

        while (splitLine.length > 0) {
            containedBags.push({
                amount: parseInt(splitLine.shift()) * target.amount,
                bag: splitLine.shift() + ' ' + splitLine.shift()
            })    

            if (splitLine.length > 0) {
                splitLine.shift()
            }
        }

        return containedBags
    }

    type Bag = {
        amount: number;
        bag: string;
    }

    const containedBags: Bag[]  = []
    let sum: number = 0

    containedBags.push({ amount: 1, bag: 'shiny gold' })
    
    while (containedBags.length > 0) {
        const bagToCheck = containedBags.shift()
        sum += bagToCheck.amount
        console.log(bagToCheck)

        containedBags.push(...findBagsThatTargetContains(bagToCheck))
    }

    console.log('Part 2 solution:', sum - 1)
}

run()