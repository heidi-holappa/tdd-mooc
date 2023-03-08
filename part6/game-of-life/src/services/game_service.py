class GameService:

    def __init__(self):
        self.grid = []
        self.expanded_grid = []
    
    def tick(self):
        # TODO: Add expansion. 
        # TODO: Add update. 
        self.expanded_grid = self.create_expanded_grid()
        self.update_expanded_grid()
        self.trim_grid()
        pass 

    def trim_grid(self):
        """ 
            Creates a reduced copy of the grid as a 
            smallest possible rectangle with live cells in it. 
        """
        x = len(self.expanded_grid[0]) 
        y = len(self.expanded_grid) 
        for i in range(y):
            for j in range(x):
                if self.expanded_grid[i][j] == 1:
                    x = min(x, j)
                    y = min(y, i)
        self.create_updated_grid(x, y)
    
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
        pass
    
    def create_updated_grid(self, x: int, y: int):
        if x == 0 and y == 0:
            return 
        new_grid = []
        for i in range(y, len(self.grid)):
            new_row = []
            for j in range(x, len(self.grid[0])):
                new_row.append(self.grid[i][j])
            new_grid.append(new_row)
        self.grid = new_grid