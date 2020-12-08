import * as fs from 'fs'

export const readInput = (path: string) => {
    return fs.readFileSync(path).toString().split('\n');
}