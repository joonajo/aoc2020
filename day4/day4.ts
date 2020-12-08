import { readInput } from "../common";

const input = readInput('day4/input.txt')

const run = () => {

    const data = [...input]

    const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

    const splitToPassports = () => {
        const validPassports = []

        while (data.length > 0) {
            const nextCutoff = data.indexOf('') !== -1 ? data.indexOf('') + 1 : data.length

            const passportData = data.splice(0, nextCutoff).join(', ')

            if (requiredFields.every(field => passportData.includes(field))) {                
                const splitPassportData = passportData.split(' ')
                const passport = {}

                for (let field of requiredFields) {
                    const fieldData = splitPassportData.find(val => val.includes(field)).split(':')[1]   

                    passport[field] = fieldData.replace(/,/g, "")
                }

                validPassports.push(passport)
            }
        }

        return validPassports
    }

    const passports = splitToPassports()
    console.log('Part 1 solution: ', passports.length)

    const validPassports = []

    const validEcl = ['amb', 'brn', 'blu', 'gry', 'grn', 'hzl', 'oth']

    for (let passport of passports) {
        let isValid = true

        const byr = passport.byr as number
        const iyr = passport.iyr as number
        const eyr = passport.eyr as number
        const hcl = passport.hcl as string
        const ecl = passport.ecl as string
        const pid = passport.pid as string
        if (byr < 1920 || byr > 2002) {
            isValid = false
        }
        if (iyr < 2010 || iyr > 2020) {
            isValid = false
        }
        if (eyr < 2020 || eyr > 2030) {
            isValid = false
        }
        if (!hcl.includes('#')) {
            isValid = false
        }
        if (hcl.length !== 7) {
            isValid = false
        }

        if (!validEcl.includes(ecl)) {
            isValid = false
        }

        if (pid.length !== 9) {
            isValid = false
        } 

        const maxHeight = passport.hgt.includes('cm') ? 193 : 76
        const minHeight = passport.hgt.includes('cm') ? 150 : 59
        const height = passport.hgt.replace(/\D/g, "")

        if (height < minHeight || height > maxHeight) {
            isValid = false
        } 

        if (isValid) {
            validPassports.push(passport)
        }
    }

    console.log('Part 2 solution: ', validPassports.length)
 }

run()