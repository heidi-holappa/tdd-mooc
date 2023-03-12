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
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        self.assertEqual(expanded_grid, expanded_grid_should_be)
        pass

    def test_after_update_glider_reaches_its_second_state(self):
        grid = [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ]
        self.game_service.expanded_grid = grid
        self.game_service.update_expanded_grid()
        glider_state_two = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 1, 0, 0],
        ]
        self.assertEqual(glider_state_two, self.game_service.expanded_grid)

    def test_after_update_glider_in_state_two_reaches_its_third_state(self):
        grid = [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
        ]
        self.game_service.expanded_grid = grid
        self.game_service.update_expanded_grid()
        glider_state_three = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ]
        self.assertEqual(glider_state_three, self.game_service.expanded_grid)

    def test_after_one_tick_expanded_glider_in_state_two_is_properly_trimmed(self):
        glider_state_two_expanded_grid = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 1, 0, 0],
        ]
        self.game_service.expanded_grid = glider_state_two_expanded_grid
        self.game_service.trim_grid()
        trimmed_grid_should_be = [
            [1, 0, 1],
            [0, 1, 1],
            [0, 1, 0],
        ]
        self.assertEqual(trimmed_grid_should_be, self.game_service.grid)

    def test_after_one_tick_glider_position_is_correctly_in_state_two(self):
        glider_state_one = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
        ]
        self.game_service.grid = glider_state_one
        self.game_service.tick()

        glider_state_two = [
            [1, 0, 1],
            [0, 1, 1],
            [0, 1, 0],
        ]
        self.assertEqual(glider_state_two, self.game_service.grid)

    def test_after_one_tick_glider_position_is_correctly_in_state_three(self):
        glider_state_two = [
            [1, 0, 1],
            [0, 1, 1],
            [0, 1, 0],
        ]
        self.game_service.grid = glider_state_two
        self.game_service.tick()

        glider_state_three = [
            [0, 0, 1],
            [1, 0, 1],
            [0, 1, 1],
        ]
        self.assertEqual(glider_state_three, self.game_service.grid)

    def test_after_two_ticks_glider_starting_in_state_one_is_in_state_three(self):
        glider_state_one = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
        ]
        self.game_service.grid = glider_state_one
        self.game_service.tick()
        self.game_service.tick()
        glider_state_three = [
            [0, 0, 1],
            [1, 0, 1],
            [0, 1, 1],
        ]
        self.assertEqual(glider_state_three, self.game_service.grid)

    def test_one_dead_and_two_live_cells_returns_a_grid_with_two_live_cells(self):
        grid = [[0, 1, 1, 1]]
        self.game_service.grid = grid
        self.game_service.tick()
        self.assertEqual([[1], [1], [1]], self.game_service.grid)

    def test_live_cell_with_no_living_neighbours_dies(self):
        grid = [[1]]
        self.game_service.grid = grid
        self.game_service.tick()
        self.assertEqual([], self.game_service.grid)

    def test_game_service_tracks_r_value_ie_coordinate_position(self):
        at_start_r_value_should_be = (0, 0)
        self.assertEqual(at_start_r_value_should_be, self.game_service.r_value)

    def test_after_one_tick_glider_r_value_is_updated_correctly(self):
        glider_state_one = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
        ]
        self.game_service.grid = glider_state_one
        self.game_service.tick()
        r_value = self.game_service.r_value
        r_value_should_be = (0, -1)
        self.assertEqual(r_value_should_be, r_value)

    def test_after_two_ticks_glider_r_value_is_updated_correctly(self):
        glider_state_one = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
        ]
        self.game_service.grid = glider_state_one
        self.game_service.tick()
        r_value = self.game_service.r_value
        r_value_should_be = (0, -1)
        self.assertEqual(r_value_should_be, r_value)

    def test_one_dead_and_two_live_cells_returns_correctly_updated_r_value(self):
        grid = [[0, 1, 1, 1]]
        self.game_service.grid = grid
        self.game_service.tick()
        r_value = self.game_service.r_value
        r_value_should_be = (2, 1)
        self.assertEqual(r_value_should_be, r_value)

    def test_one_dead_and_two_live_cells_returns_correctly_updated_r_value_after_two_ticks(self):
        grid = [[0, 1, 1, 1]]
        self.game_service.grid = grid
        self.game_service.tick()
        self.game_service.tick()
        r_value = self.game_service.r_value
        r_value_should_be = (1, 0)
        self.assertEqual(r_value_should_be, r_value)

    def test_game_service_iterator_iterates_through_two_ticks_and_has_a_correct_grid(self):
        glider_state_one = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
        ]
        self.game_service.iterate_n_ticks(glider_state_one, 2, (0, 0))
        glider_state_three = [
            [0, 0, 1],
            [1, 0, 1],
            [0, 1, 1],
        ]
        self.assertEqual(glider_state_three, self.game_service.grid)

    def test_game_service_iterator_iterates_the_grid_given_as_an_argument_and_returns_correct_grid_after_two_iterations(self):
        glider_state_one = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
        ]
        grid_after_iterations, r_value = self.game_service.iterate_n_ticks(
            glider_state_one, 2, (0, 0))
        glider_state_three = [
            [0, 0, 1],
            [1, 0, 1],
            [0, 1, 1],
        ]
        self.assertEqual(glider_state_three, grid_after_iterations)

    def test_game_service_iterator_returns_correct_r_value_after_two_glider_iterations(self):
        glider_state_one = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
        ]
        grid_after_iterations, r_value = self.game_service.iterate_n_ticks(
            glider_state_one, 2, (0, 0))
        r_value_should_be = (0, -1)
        self.assertEqual(r_value_should_be, r_value)

    def test_game_service_iterator_returns_correct_r_value_after_hundred_glider_iterations(self):
        glider_state_one = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
        ]
        grid_after_iterations, r_value = self.game_service.iterate_n_ticks(
            glider_state_one, 100, (0, 0))
        r_value_should_be = (25, -25)
        self.assertEqual(r_value_should_be, r_value)

    def test_game_service_iterator_returns_correct_r_value_after_fifty_gosper_glider_iterations(self):
        gosper_glider_state_zero = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
                0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0,
                0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
                0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        grid_after_iterations, r_value = self.game_service.iterate_n_ticks(
            gosper_glider_state_zero, 50, (0, 0))
        r_value_should_be = (0, 0)
        self.assertEqual(r_value_should_be, r_value)

    def test_game_service_iterator_returns_correct_y_dim_after_fifty_gosper_glider_iterations(self):
        gosper_glider_state_zero = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
                0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
                0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0,
                0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
                0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
        self.game_service.iterate_n_ticks(gosper_glider_state_zero, 50, (0, 0))
        y_dim_value_should_be = 17
        self.assertEqual(y_dim_value_should_be, len(self.game_service.grid))

    def test_game_service_iterator_returns_empty_grid_if_all_live_cells_die(self):
        initialized_grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
        ]
        grid_after_iterations, r_value = self.game_service.iterate_n_ticks(
            initialized_grid, 10000000, (0, 0))
        grid_should_be = []
        self.assertEqual(grid_should_be, grid_after_iterations)
