# Project plan

The aim is to create specific functionalities for the Game of Life by using TDD-methodology.

## Rules of Game of Life

The game mechanics follows these four simple rules:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Task list

**Overhead**

- [x] Create project folder
- [x] Create sub-folder structure
- [x] Make crude plan for project structure. Don't write any code though!
- [x] Create task list
- [x] Setup venv
- [x] Install modules for testing (including coverage / mutation)
- [ ] Install module for Argument parser (if necessary)
- [x] Install package for Invoke (if needed)
- [x] create requirements.txt
- [x] Create initial README.md

**File management**

- [ ] An RLE-file can be read (parsed)
- [ ] RLE file content is stored into a data structure
- [ ] A board state is created from the loaded data
- [ ] A board state is saved into an RLE file

**Game of Life functionalities**

- [x] Investigate and decide a data structure for storing cell states
- [ ] The game state is returned after one tick
- [x] Live cell with no neighbours dies after one tick
- [x] Live cell with two neighboring cells remains unchanged after one tick
- [x] Live cell with three neighboring cells remains unchanged after one tick
- [x] Live cell with four neighboring cells dies after one tick
- [x] A dead cell with exactly three neighboring cells becomes alive after one tick

## Planning the data structure

Consider a simple glider as an example:

```
#C This is a glider.
x = 3, y = 3
bo$2bo$3o!
```

An initial idea on how to do one tick.

```
                    0 0 0 0 0              0 0 0 0 0
0 1 0               0 0 1 0 0              0 0 0 0 0            1 0 1
0 0 1  = expand =>  0 0 0 1 0  = update => 0 1 0 1 0  = trim => 0 1 1
1 1 1               0 1 1 1 0              0 0 1 1 0            0 1 0
                    0 0 0 0 0              0 0 1 0 0
```

**Notes**

- **Expand:** The grid is expanded by adding 2 two both dimensions, i.e. $x = x + 2$ and $y = y + 2$.
- **Update:** In update phase the expanded board is gone through and the new board is updated based on the game rules.
- **trim:** The grid is trimmed by creating the smallest possible rectangle with live cells in it. All live cells must be in the trimmed grid. **To consider:** How to keep track of the location while moving.

## Initial plan for parser

**First step:** Create functionality for parsing the pattern.

# RLE - examples

Blinker:

```
#N Blinker
#O John Conway
#C A period 2 oscillator that is the smallest and most common oscillator.
#C www.conwaylife.com/wiki/index.php?title=Blinker
x = 3, y = 1, rule = B3/S23
3o!
```

Highlife 5-cell still lifes

```
#N HighLife 5-cell still lifes
#C The only 5-cell still life in the HighLife (23/36) rule.
#C www.conwaylife.com/wiki/index.php?title=HighLife
x = 3, y = 3, rule = 23/36
2ob$obo$bo!
```
