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
import fs from "fs";

inquirer.prompt([{
    name: "length", message: "How many rows?",
    }, 
    {
    name: "width", message: "How many columns?",
    },
    {   
    name: "complexity", message: "How complex should the maze be?"
    // length: 30, width: 43, complexity: 7, causes crash??
}]).then(answers => {
        let length = answers.length;
        let width = answers.width;
        let maze = [];
        for (let i = 0; i < length; i++) {
            maze[i] = [];
            for (let j = 0; j < width; j++) {
                //check if this space is an outer wall
                if(i === 0 || j === 0 || i === length - 1 || j === width - 1) {
                    maze[i][j] = 1;
                }
                else {
                    maze[i][j] = 2;
                }
            }
        }
        let guidePosts = placeGuideposts(maze, answers.complexity);
        randWalk(guidePosts.maze, guidePosts.guidePosts);
        mazeFinisher(maze);
        //logMaze(maze);
        let filename = 'mazes/mazefile' + randomInt(0, 9999) + ".json";
        if (!checkIfFilenameExists(filename)){
            fs.writeFileSync(filename, JSON.stringify(maze));
        }
        
    });
    
function placeGuideposts (maze, complexity) {
    let guidePosts = [];
    if(!complexity) complexity = randomInt(2, 5);
    //set inner guideposts
    for(let i = 0; i < complexity; i++) {
        let postX = randomInt(1, maze.length - 2);
        let postY = randomInt(1, maze[0].length - 2);
        guidePosts.push([postX, postY]);
        maze[postX][postY] = 0;
    }
    //set outer guideposts (entrance and exit)
    let wall = randomInt(0,3);
    guidePosts.unshift(outerGuidepost(wall, maze));
    wall = randomInt(0,3);
    guidePosts.push(outerGuidepost(wall, maze));
    //console.log(guidePosts);
    return {maze, guidePosts};
}

function outerGuidepost (wall, maze) {
    let post;
    switch (wall) {
        case 0:
            //Left wall
            post = [
                0, 
                randomInt(0, maze[1].length - 1)
            ];
            //console.log(post);
            maze[post[0]][post[1]] = 0;
            return (post);
        case 1:
            //Right wall
            post = [
                maze[0].length - 1, 
                randomInt(0, maze[1].length - 1)
            ];
            //console.log(post);
            maze[post[0]][post[1]] = 0;
            return (post);
        case 2:
            //bottom wall
            post = [
                randomInt(0, maze[0].length - 1),
                0    
            ];
            //console.log(post);
            maze[post[0]][post[1]] = 0;
            return (post);
        case 3:
            //top wall
            post = [
                randomInt(0, maze[0].length - 1), 
                maze[1].length - 1
            ];
            //console.log(post);
            maze[post[0]][post[1]] = 0;
            return (post);
    }
}

//returns a random integer between the high and low bounds (inclusive)
function randomInt(lowBound, highBound) {
    highBound = highBound + 1 - lowBound;
    return Math.floor(Math.random() * highBound) + lowBound;
}

function distance (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

function step (x, y) {
    let stepDirections = [[0,1],[1,0],[1,1],[-1,0],[0,-1],[-1,-1],[1,-1],[-1,1]];
    let step = stepDirections[randomInt(0,7)]; //TODO: This could be optimized to prevent repeats
    let newX = x + step[0];
    let newY = y + step[1];
    return [newX, newY];
    //Take randwalk directions and add them to current position. 
    
    //Evaluate if this is a 'step in the right direction' using distance
    //return new values if it is
}

function randWalk (arr, guidePosts) {
    let currentX = guidePosts[0][0];
    let currentY = guidePosts[0][1];
    for (let i = 1; i < guidePosts.length; i++) {
        //
        while (JSON.stringify([guidePosts[i][0], guidePosts[i][1]]) != JSON.stringify([currentX, currentY])) {
            let stepReturn = step(currentX, currentY);
            let [newX, newY] = stepReturn;
            if (distance(currentX, currentY, guidePosts[i][0], guidePosts[i][1]) >= distance(newX, newY, guidePosts[i][0], guidePosts[i][1])) {
              if (checkBounds([newX, newY], arr)) {
                //console.log('stepped closer!')
                currentX = newX;
                currentY = newY;
                arr[currentX][currentY] = 0;
              }
              else {
                //console.log('out of bounds');
              }
            }
            else {
                //console.log('bad step!')
                //console.log(`Bad step! New X: ${newX}, new Y: ${newY}`);
                
            }
        }
        //logMaze(arr);
        console.log(`guidepost ${i} of ${guidePosts.length} reached!`)
    }
}


//log out an array across multiple lines instead of flattening it into one silly line
function logMaze (arr) {
    for(let i = 0; i < arr[0].length; i++) {
        let row = "";
        for(let j = 0; j < arr.length; j++) {
            row = `${row} ${arr[j][i]}`;
        }
        console.log(row);
    }
}

function checkBounds (coords, arr) {
    if(coords[0] < 0) return false;
    if(coords[0] >= arr.length) return false;
    if(coords[1] < 0) return false;
    if(coords[1] >= arr[0].length) return false;
    
    return true;
}

function mazeFinisher (maze) {
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[0].length; j++) {
            if (maze[i][j] === 2 ) {
                maze[i][j] = randomInt(0,1);
            }
        }
    }
};

function checkIfFilenameExists(filename) {
    let currDirFiles = fs.readdir(`${filename}`, ()=>{});
    console.log(filename);
    if (fs.existsSync(filename)){
        console.log('File already exists!!!!');
        return true;
    }
    return false;
}