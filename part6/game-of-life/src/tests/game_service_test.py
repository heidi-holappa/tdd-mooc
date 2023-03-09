import unittest
from services.game_service import GameService

class TestGameService(unittest.TestCase):

    def setUp(self):
        self.game_service = GameService()
        pass

    def test_a_grid_with_just_empty_cells_returns_an_empty_grid_after_one_tick(self):
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

    def test_after_update_glider_reaches_its_second_state(self):
        grid = [
            [0,0,0,0,0],
            [0,0,1,0,0],
            [0,0,0,1,0],
            [0,1,1,1,0],
            [0,0,0,0,0],
        ]
        self.game_service.expanded_grid = grid
        self.game_service.update_expanded_grid()
        glider_state_two = [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,1,0,1,0],
            [0,0,1,1,0],
            [0,0,1,0,0],
        ]
        self.assertEqual(glider_state_two, self.game_service.expanded_grid)

    def test_after_update_glider_in_state_two_reaches_its_third_state(self):
        grid = [
            [0,0,0,0,0],
            [0,1,0,1,0],
            [0,0,1,1,0],
            [0,0,1,0,0],
            [0,0,0,0,0],
        ]
        self.game_service.expanded_grid = grid
        self.game_service.update_expanded_grid()
        glider_state_three = [
            [0,0,0,0,0],
            [0,0,0,1,0],
            [0,1,0,1,0],
            [0,0,1,1,0],
            [0,0,0,0,0],
        ]
        self.assertEqual(glider_state_three, self.game_service.expanded_grid)

    
    def test_after_one_tick_glider_in_state_two_is_properly_trimmed(self):
        glider_state_two_expanded_grid = [
            [0,0,0,0,0],
            [0,0,0,0,0],
            [0,1,0,1,0],
            [0,0,1,1,0],
            [0,0,1,0,0],
        ]
        self.game_service.expanded_grid = glider_state_two_expanded_grid
        self.game_service.trim_grid()
        trimmed_grid_should_be = [
            [1,0,1],
            [0,1,1],
            [0,1,0],
        ]
        self.assertEqual(trimmed_grid_should_be, self.game_service.grid)

    
    
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