import * as R from 'ramda'

import { readInput } from "../common";

const input = readInput('day6/input.txt')

const run = () => {
    const data = [...input]

    const answerGroups = []
    let yesCount = 0

    while (data.length > 0) {
        const nextCutoff = data.indexOf('') !== -1 ? data.indexOf('') + 1 : data.length
        const group = data.splice(0, nextCutoff)
        answerGroups.push(group)
    }
    
    for (let group of answerGroups) {
        const allAnswers = group.join('')
        yesCount += R.uniq(allAnswers).length
    }

    console.log('Part 1 solution:', yesCount)
}

run()