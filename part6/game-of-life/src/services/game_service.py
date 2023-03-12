class GameService:

    def __init__(self):
        self.grid = []
        self.expanded_grid = []
        self.r_value = (0, 0)

    def tick(self):
        self.expanded_grid = self.create_expanded_grid()
        self.update_expanded_grid()
        self.trim_grid()

    def trim_grid(self):
        """ 
            Creates a reduced copy of the grid as a 
            smallest possible rectangle with live cells in it. 
        """
        x_dim = len(self.expanded_grid[0])
        y_dim = len(self.expanded_grid)
        x_min = x_dim
        y_min = y_dim
        x_max = 0
        y_max = 0
        for i in range(y_dim):
            for j in range(x_dim):
                if self.expanded_grid[i][j] == 1:
                    x_min = min(x_min, j)
                    y_min = min(y_min, i)
                    y_max = i
                    x_max = max(x_max, j)
        self.create_updated_trimmed_grid(x_min, x_max, y_min, y_max)

    def create_expanded_grid(self):
        increased_x = len(self.grid[0]) + 2
        expanded_grid = []
        new_row = [0 for _ in range(increased_x)]
        expanded_grid.append(new_row)
        for row in self.grid:
            expanded_grid.append([0] + row + [0])
        expanded_grid.append(new_row)
        return expanded_grid

    def update_expanded_grid(self):
        x_dim = len(self.expanded_grid[0])
        y_dim = len(self.expanded_grid)
        new_grid = [[0]*x_dim for _ in range(y_dim)]
        for row_idx in range(y_dim):
            for col_idx in range(x_dim):
                neighbours = 0
                if row_idx > 0:
                    row_above = self.expanded_grid[row_idx - 1]
                    neighbours += sum(row_above[max(0, col_idx - 1):min(x_dim, col_idx + 2)])
                if col_idx > 0:
                    neighbours += self.expanded_grid[row_idx][col_idx-1]
                if col_idx < x_dim - 1:
                    neighbours += self.expanded_grid[row_idx][col_idx+1]
                if row_idx < y_dim - 1:
                    row_below = self.expanded_grid[row_idx + 1]
                    neighbours += sum(row_below[max(0, col_idx - 1):min(x_dim, col_idx + 2)])
                if self.expanded_grid[row_idx][col_idx] == 0:
                    if neighbours == 3:
                        new_grid[row_idx][col_idx] = 1
                else:
                    if neighbours in [2, 3]:
                        new_grid[row_idx][col_idx] = 1
        self.expanded_grid = new_grid

    def create_updated_trimmed_grid(self,
                                    x_min: int,
                                    x_max: int,
                                    y_min: int,
                                    y_max: int):
        if x_min == 0 and x_max == len(self.expanded_grid[0]) and y_min == 0 and y_max == len(self.expanded_grid):
            return
        new_grid = []
        self.r_value = (self.r_value[0]-1 + x_min, self.r_value[1] + 1 - y_min)
        for i in range(y_min, y_max+1):
            new_row = []
            for j in range(x_min, x_max + 1):
                new_row.append(self.expanded_grid[i][j])
            new_grid.append(new_row)
        self.grid = new_grid

    def iterate_n_ticks(self, grid: list, n_of_ticks: int, initial_r_values: tuple):
        self.r_value = initial_r_values
        self.grid = grid
        for _ in range(n_of_ticks):
            if self.grid == []:
                break
            self.tick()
        return self.grid, self.r_value
