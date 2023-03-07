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
- [ ] Setup venv
- [ ] Install packages
- [x] Create initial README.md

**Game of Life functionalities**

- [ ] Investigate and decide a data structure for storing cell states
- [ ] The game state is returned after one tick
- [ ] One cell dies after one tick
- [ ] Board with two neighboring cells remains unchanged after one tick
- [ ] Board with three neighboring cells remains unchanged after one tick
- [ ] Board with four neighboring cells becomes empty after one tick
- [ ] A cell with exactly three neighboring cells becomes alive after one tick

**File management**

- [ ] An RLE-file can be read
- [ ] RLE file content is stored into a data structure
- [ ] A board setup is created from the loaded data
- [ ] A board setup is saved into an RLE file
