import { readInput } from "../common";

const input = readInput('day4/input.txt')

const runPart1 = () => {

    const data = [...input]

    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

    const splitToPassports = () => {
        const validPassports = []

        while (data.length > 0) {
            const nextCutoff = data.indexOf('') !== -1 ? data.indexOf('') + 1 : data.length

            const passportData = data.splice(0, nextCutoff).join(', ')

            if (requiredFields.every(field => passportData.includes(field))) {
                validPassports.push(passportData)
            }
        }

        return validPassports
    }

    const passports = splitToPassports()
    console.log('Part 1 solution: ', passports.length)
 }

runPart1()