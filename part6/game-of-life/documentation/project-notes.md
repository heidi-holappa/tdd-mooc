# Project notes

## Known issues and limitations.

- Some code quality issues remain. Pylint score at the time of release 1.0 is 9.38.
- Y-coordinate values differentiate from LifeWiever. In this adaptation, y-values decrease when going downwards. This means that in this adaptation $y_{\text{this adaptation}} = -y_{\text{LifeViewer}}$. This however was a conscious design choice.
- RLE-directory is hard coded in the project. The directory is `rle-files/` located at the root directory.
- For mutation tests the current score is at best mediocre. Unfortunately I ran into time constraints and did not have a chance to refactor code based on mutation test results. As this was not a required part of the exercise, I decided to prioritize other areas of the project.

## Testing

The test coverage at the time of release 1.0 is $99\%$.

![coverage-report](img/coverage-report.png)
