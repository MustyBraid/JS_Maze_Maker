/* Psuedocode:
Take input from user: length, width, complexity?? (later, is this even possible to define without solving?)
Use inputs to generate matrix/2D array
possibly refactor array into a valid JSON if it isn't already one? (Grady says: arrays are inherently valid JSON)
return JSON*/

  
/* 1. Generate grid, assign all outside edges to 1, and all inside spaces to 2
2. Pick 2 spaces along the outside edges, assign them to 0, pick n spaces inside the maze and also assign them to 0. Store them, these are 'guideposts'
3. using distance equation, randwalk from each guidepost to the next, assigning each space to 0 as you go.'
4. Flip all remaining 2s to 1s */

import inquirer from "inquirer";

inquirer.prompt([{
    name: "length", message: "How many rows?",
    }, 
    {
    name: "width", message: "How many columns?",
    },
    {   
    name: "complexity", message: "How complex should the maze be?"
}]).then(answers => {
        console.log(answers);
        let length = answers.length;
        let width = answers.width;
        let matrix = [];
        for (let i = 0; i < length; i++) {
            matrix[i] = [];
            for (let j = 0; j < width; j++) {
                //check if this space is an outer wall
                if(i === 0 || j === 0 || i === length - 1 || j === width - 1) {
                    matrix[i][j] = 1;
                }
                else {
                    matrix[i][j] = 2;
                }
            }
        }
        placeGuideposts(matrix, answers.complexity),
        randWalk(matrix);
        // console.log(matrix);
        logMatrix(matrix);
    });

    
function placeGuideposts (arr, complexity) {
    let guidePosts = [];
    if(!complexity) complexity = randomInt(2, 5);
    for(let i = 0; i < complexity; i++) {
        let postX = randomInt(1, arr.length - 2);
        let postY = randomInt(1, arr[0].length - 2);
        guidePosts.push([postX, postY]);
        arr[postX][postY] = 0;
    }
    return guidePosts;
}

//returns a random integer between the high and low bounds (inclusive)
function randomInt(lowBound, highBound) {
    highBound = highBound + 1 - lowBound;
    return Math.floor(Math.random() * highBound) + lowBound;
}

function distance (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

function step (x1, y1, x2, y2) {
    //TODO: Write this. use it to finish randwalk
    //Take randwalk directions and add them to current position. 
    //Evaluate if this is a 'step in the right direction' using distance
    //return new values if it is
}

function randWalk (arr, guidePosts) {
    let randWalkDirections = [[0,1],[1,0][1,1],[-1,0],[0,-1],[-1,-1],[1,-1],[-1,1]];
    let currentX = guidePosts[0][0];
    let currentY = guidePosts[0][1];
    for (let i = 1; i < guidePosts.length; i++) {
        while (guidePosts[i] !== [currentX, currentY]) {
            //Take a step using step.
        }
    }
}

function logMatrix (arr) {
    for(let i = 0; i < arr[0].length; i++) {
        console.log(arr[i]);
    }
}

function addArrays (arr1, arr2) {
    if(arr1.length != arr2.length) return;
    let arr3 = [];
    for(let i = 0; i < arr1.length; i++) {
        arr3.push(arr1[i] + arr2[i]);
    }
    return arr3;
}