const startingNumbers = [18,8,0,5,4,1,20]

const partOne = () => {
    const saidNumbers: { [key: number]: number } = {}
    
    const targetRound = 2020
    let nextNumber: number;
    let lastNumber: number;

    for (let i = 1; i <= targetRound; i++) {
        lastNumber = nextNumber
        if (i <= startingNumbers.length) {
            saidNumbers[startingNumbers[i - 1]] = i
            
            if (i === startingNumbers.length) {
                nextNumber = 0
            }

        } else {
            const numberHasBeenSaid = Object.keys(saidNumbers).includes(nextNumber.toString())
    
            if (numberHasBeenSaid) {
                const temp = nextNumber
                nextNumber = i - saidNumbers[nextNumber]
                saidNumbers[temp] = i
            } else {
                saidNumbers[nextNumber] = i
                nextNumber = 0
            }
        }
    }

    console.log('Part 1 solution:', lastNumber)
}

partOne()