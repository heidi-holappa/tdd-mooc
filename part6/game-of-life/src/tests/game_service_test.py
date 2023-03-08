import unittest
from services.game_service import GameService

class TestGameService(unittest.TestCase):

    def setUp(self):
        self.game_service = GameService()
        pass

    def test_dead_cell_with_no_living_neigbours_remains_dead(self):
        grid = [[0]]
        self.game_service.grid = grid
        self.game_service.tick()
        self.assertEqual([], self.game_service.grid)
    
    def test_grid_is_expanded_by_a_layer_of_dead_cells(self):
        grid = [[0]]
        self.game_service.grid = grid
        expanded_grid = self.game_service.create_expanded_grid()
        expanded_grid_should_be = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]
        self.assertEqual(expanded_grid, expanded_grid_should_be)
        pass
    
    def live_cell_with_no_living_neighbours_dies(self):
        grid = [[1]]
        self.game_service.grid = grid
        self.game_service.tick()
        self.assertEqual([], self.game_service.grid)
    
    # Commented out for now
    def one_dead_and_two_live_cells_returns_a_grid_with_two_live_cells(self):
        grid = [[0, 1, 1]]
        self.game_service.grid = grid
        self.game_service.tick()
        self.assertEqual([[1,1]], self.game_service.grid)