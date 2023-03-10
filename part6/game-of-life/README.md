# General

This project is the final exercise for the MOOC course [TDD](https://tdd.mooc.fi/).

## Documentation

- [project plan](documentation/project-plan.md): Project plan and task list.
- [project notes](documentation/project-notes.md): Short documentation on final notes and test coverage.

## Video recordings

For this exercise the instruction was to record the coding process.

- [Part 1: Setting up the project](https://youtu.be/NTwA7fSnCFI) [app. 25 mins]
- [Part 2: Writing the first tests](https://youtu.be/wU2ub4HU2Zs) [app. 1 hr] Writing the first tests and first code. Making some misteps and correcting course.
- **Part 3-1**: [app. 1 hr 10 min] I had a terrible accident and forgot to turn recording on. I noticed this one hour into work.
- [Part 3: finishing the core game mechanics](https://youtu.be/qWHYmxeu14I): [app. 40 minutes] I start with a code review to go through what was done in the unrecorded segment. Then we continue to write code for the 'game'-functionalities.
- [Part 4: Creating first features for parser service](https://youtu.be/iZ_p3b-887w): [app 1 h 55 min]
- [Part 5: Expanding parsing functionalities](https://youtu.be/QHInGAFZcoI): [app 1 h 50 min]
- [Part 6: The part in which nothing progresses, and I just fight with ArgumentParser](https://youtu.be/-Js_cB73ZrE) [1 h 5 min]
- [Part 7: Back on track](https://youtu.be/mRiI4agXNDI): [app 1 h 5 min]
- [Part 8: Oops, I forgot a feature!](https://youtu.be/tsmPb1dS1GQ): [app 30 min]
- [Part 9: I can almost see the finish-line](https://youtu.be/j5UTNGZnY6w): [2 h 30 min]
- [Part 10: Time to let go](https://youtu.be/X3eCqu0IxCQ): [app 1 h 25 min]

**Total time spent: app. 13 h 35 min**

## Installation

Install packages with

```
pip install -r requirements.txt
```

## Commands in venv

The commands can easily be run in Virtual environment (venv) with the following invoke commands:

Running the application:

```
invoke start [filename] [iterations]
```

Use `invoke --help start` for instructions. **Please note** that the directory for rle-files is hard coded to be `rle-files/` located in the project root directory.

Unittests

```
invoke test
```

Coverage

```
invoke coverage-test
```

Mutation tests:

```
mutmut run
```

## Commands without venv

Starting the application without venv:

```
python3 src/index.py --imp=[filename] --iter=[iterations]
```

To run the tests without virtual environment use the following commands:

Unittests:

```
python3 -m pytest src/tests/
```

Coverage:

```
coverage run -m pytest src/tests/
```

## Links

- [Wikipedia: Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life): A Wikipedia article on game of life

- [Run Length Encoded](https://conwaylife.com/wiki/Run_Length_Encoded): documentation for RLE-file format
