import * as R from 'ramda'

import { readInput } from "../common";

const input = readInput('day6/input.txt')

const run = () => {
    const data = [...input]

    const answerGroups = []
    let yesCount = 0

    while (data.length > 0) {
        const nextCutoff = data.indexOf('') !== -1 ? data.indexOf('') : data.length
        const group = data.splice(0, nextCutoff)
        answerGroups.push(group)

        if (!!data.length) {
            data.shift()
        }
    }
    
    for (let group of answerGroups) {
        const allAnswers = group.join('')
        yesCount += R.uniq(allAnswers).length
    }

    console.log('Part 1 solution:', yesCount)

    yesCount = 0

    for (let group of answerGroups) {
        const numOfPeople = group.length
        const allYesAnswers = group.join('')

        let numOfQuestionsWithAllYes = 0

        for (let question of R.uniq(allYesAnswers)) {
            const regexp = new RegExp(question, "gi")
            if ((allYesAnswers.match(regexp) || []).length === numOfPeople) {
                numOfQuestionsWithAllYes++
            }
        }

        yesCount += numOfQuestionsWithAllYes
    }

    console.log('Part 2 solution:', yesCount)
}

run()