# JS_Maze_Maker
A CLI program that generates mazes with user-defined parameters and exports them as JSONs

This is part 1 of an at-least-2 part project centered around generating mazes and then implementing solving algorithms in a variety of languages. Maze structure is incredibly simple, with 0's representing traversible coordinates and 1's representing walls. 
Complexity is defined by a set number of "guideposts" that must be reached by an intial randwalk through the maze that ensures all mazes have at least 1 path. This means that actually complexity is very nuanced, as too low a value probably leads to only 1 legitimate path, while too high of a value would lead to what is effectively an empty room. Once we begin testing and solving these I may come back to update this aspect and suggest ratios of area to complexity, for example! 

By the way, my name is Casey Chartier and I can be reached at chartiercasey@gmail.com if you have any suggestions or questions or would even like to contribute! 

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

 The GNU General Public License can be found at <https://www.gnu.org/licenses/>.
