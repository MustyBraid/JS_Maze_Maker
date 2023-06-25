/* Psuedocode:
Take input from user: length, width, complexity?? (later)
Use inputs to generate matrix/2D array
possibly refactor array into a valid JSON?
return JSON*/

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
                matrix[i][j] = 0;
            }
        }
        console.log(matrix);
    });