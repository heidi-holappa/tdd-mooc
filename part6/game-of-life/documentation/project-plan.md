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
- [x] Install package for Invoke (if needed)
- [x] create requirements.txt
- [x] Create initial README.md

**Game of Life functionalities**

- [x] Investigate and decide a data structure for storing cell states
- [x] TO CONSIDER: The game state is returned after n ticks
- [x] Live cell with no neighbours dies after one tick
- [x] Live cell with two neighboring cells remains unchanged after one tick
- [x] Live cell with three neighboring cells remains unchanged after one tick
- [x] Live cell with four neighboring cells dies after one tick
- [x] A dead cell with exactly three neighboring cells becomes alive after one tick

**File management**

- [x] Content of RLE-file can be read
- [x] A new file can be created
- [x] x- and y-dim can be written into the new file
- [x] single line pattern can be written into the new file
- [x] multi-line pattern can be written into the new file
- [x] # R - line can be included in the file

**Argument parser**

- [x] Argument parser extracts import rle-filename
- [x] Argument parser extracts n of iterations

**Parsing pattern**

- [x] x-dimension can be parsed
- [x] y-dimension can be parsed
- [x] 1-line pattern pattern can be parsed into str
- [x] multiple line pattern can be parsed into a str
- [x] pattern with length-1 integer values can be transformed into grid form
- [x] pattern with length-1+ integer values can be transformed into grid form
- [x] # x- and y-coordinated can be parsed from #R - line

**Bringing it all together**

- [x] Add a controller class to coordinate services
- [x] Controller calls parses to parse the given RLE-file
- [x] Controller calls game service to perform n iterations ($n\in\N_0$)
- [x] Controller coordinater writing of a new file
- [x] Reminder add the #R-line

**Final phase: bug fixes**

- [x] To fix: exported file does not contain correct state (the state is the initial state)
- [x] To fix: exported file does not go to right directory

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

## RLE - examples

Some examples of RLE-forms used. Credits included in each RLE-segment.

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

Gosper glider gun

```
#N Gosper glider gun
#C This was the first gun discovered.
#C As its name suggests, it was discovered by Bill Gosper.
x = 36, y = 9, rule = B3/S23
24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4b
obo$10bo5bo7bo$11bo3bo$12b2o!
```
