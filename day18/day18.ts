import { parse } from 'path';
import { readInput } from './../common';

const input = readInput('day18/input.txt')

const operations = {
    '+': (a: number, b: number) => {
        console.log('add', a, b)
        return a + b
    },
    '*': (a: number, b: number) => {
        console.log('times', a, b)
        return a * b
    },
}

const run = () => {
    let sum = 0
    for (let line of input) {
        let unused = []
        const trimmedLine = Array.from(line.replace(/\s/g, ''))

        let currentOperationTotal = 0
    
        for (let i = 0; i < trimmedLine.length; i++) {
            const char = trimmedLine[i]

            if (!!parseInt(char)) {
                const number = parseInt(char)
      
                if (unused.length === 0) {
                    unused.unshift(number)
                } else if (unused[0] === '+' || unused[0] === '*') {
                    const opr = unused.shift()
                    currentOperationTotal = operations[opr](number, unused.shift())
                    unused.unshift(currentOperationTotal)
                } else {
                    unused.unshift(number)
                }
            } else {
                if (char === ')') {
                    let next = unused.shift()
                    let val = null
                    let opr = null

                    while (next !== '(' && !!next) {
                        console.log(next)
                        if (!!parseInt(next)) {
                            if (!val) {
                                val = next
                            } else {
                                val = operations[opr](val, next)
                            }
                        } else {
                            opr = next
                        }
                        next = unused.shift()
                    }

                    if (unused.length !== 0) {
                        next = unused.shift()

                        if (!parseInt(next)) {
                            if (next !== '(') {
                                val = operations[next](val, unused.shift())
                            }
                        }
                    }
                    unused.unshift(val)
                } else {
                    unused.unshift(char)
                }
            } 
        }
        let num = null
        let opr = null
    
        console.log(unused)
    
        for (let val of unused) {
            if (!!parseInt(val)) {
                if (!num) {
                    num = val
                } else {
                    if (opr) {
                        num = operations[opr](val, num)
                    }
                }
            } else {
                opr = val
            }
        }
    
        sum += num
    }
    console.log(sum)
}

run()