import promptSync from 'prompt-sync';

type BuzzWordSpecs = {
    content : string;
    priority : string;
}
function readUserDefinedRules() : Map<number, BuzzWordSpecs> {
    console.log("For each rule, enter {[NUMBER] [BUZZWORD] [F/B/R]}, F - append to the FRONT, B - append to the BACK, R - reverse.\n If the rule wasn't " +
        "formatted properly, it will be completely ignored.\n Type S to end.\n");

    const ruleInterface : any = require('prompt-sync')({sigint: true});

    const ruleDictionary : Map<number, BuzzWordSpecs> = new Map<number, BuzzWordSpecs>();

    const possiblePriorities : string[] = ['F', 'B', 'R'];

    while (true) {
        let userInput : string | null = ruleInterface("Enter a new rule: ");
        if (userInput) {
            let ruleSegments : string[] = userInput.split(" ");
            console.log(ruleSegments);
            if (ruleSegments.length != 3) {
                break;
            }
            if (!isNaN(Number(ruleSegments[0])) && possiblePriorities.includes(ruleSegments[2])) {
                ruleDictionary.set(Number(ruleSegments[0]), {
                    content: ruleSegments[1],
                    priority: ruleSegments[2]
                });
            }
        }
    }

    return ruleDictionary;
}

function fizzBuzzWithUserDefinedRules() : void {
    const userRules : Map<number, BuzzWordSpecs> = readUserDefinedRules();
    let maxNumber : number = readNumberFromConsole();
    let index : number = 0;
    for (index = 1; index <= maxNumber; ++index) {
        let ansIndexes : number[] = [];
        userRules.forEach(function(buzzWord : BuzzWordSpecs, divBy : number) : void {
            if (index % divBy == 0) {
                switch (buzzWord.priority) {
                    case "F": {
                        ansIndexes.splice(0, 0, divBy);
                        break;
                    }
                    case "B": {
                        ansIndexes.push(divBy);
                        break;
                    }
                    case "R": {
                        ansIndexes.reverse();
                        break;
                    }
                }
            }
        });
        let finalAns : string = "";
        ansIndexes.forEach((index : number) : void => {
            finalAns += userRules.get(index)?.content;
        });
        if (finalAns !== undefined && finalAns != "") {
            console.log(finalAns);
        } else {
            console.log(index);
        }
    }
}
function readNumberFromConsole() : number {
    const prompt : any = require('prompt-sync')({sigint : true});
    let userInput : number = NaN;

    while (isNaN(userInput)) {
        userInput = Number(prompt("Please enter max. number for Fizz Buzz"));
    }

    return userInput;
}

function fizzbuzz() : void {
    let i : number = 0;
    let maxNumber : number = readNumberFromConsole();
    for (i = 1; i <= maxNumber; ++i) {
        let divisibleByKeys : { [key: number] : string} = {};
        divisibleByKeys[3] = "Fizz";
        divisibleByKeys[5] = "Buzz";
        divisibleByKeys[7] = "Bang";
        divisibleByKeys[11] = "Bong";
        divisibleByKeys[13] = "Fezz";
        let ansKeys : number[] = [];
        if (i % 11 == 0) {
            ansKeys.push(11);
        } else {
            [3, 5, 7].forEach(function(divBy : number) : void {
                if (i % divBy == 0) {
                    ansKeys.push(divBy);
                }
            });
        }

        if (i % 13 == 0) {
            if (ansKeys[0] == 3) {
                ansKeys.splice(1, 0, 13);
            } else {
                ansKeys.splice(0, 0, 13);
            }
        }

        if (i % 17 == 0) {
            ansKeys.reverse();
        }

        let ans : string = "";
        ansKeys.forEach((el: number) : void => {
            ans += divisibleByKeys[el];
        });

        console.log(ans == "" ? i : ans);
    }
}

/*
fizzbuzz();*/
/*
console.log(readUserDefinedRules());*/
fizzBuzzWithUserDefinedRules();