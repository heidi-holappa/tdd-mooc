import os
import unittest
from services.service_controller import ServiceController
from services.parser_service import ParserService
from services.game_service import GameService


class TestServiceController(unittest.TestCase):

    def setUp(self):
        self.controller = ServiceController()

    def test_initialized_controller_has_a_parser_service_object(self):
        self.assertIsInstance(self.controller.parser, ParserService)

    def test_initialized_controller_has_a_game_service_object(self):
        self.assertIsInstance(self.controller.game_service, GameService)

    def test_executing_cli_args_adds_filename_to_attributes(self):
        path_and_filename = "glider.rle"
        iterations = 10
        self.controller.execute(path_and_filename, iterations)
        self.assertEqual(path_and_filename,
                         self.controller.subdir_and_filename)

    def test_executing_cli_args_adds_iterations_to_attributes(self):
        path_and_filename = "glider.rle"
        iterations = 10
        self.controller.execute(path_and_filename, iterations)
        self.assertEqual(iterations, self.controller.iterations)

    def test_parser_imports_pattern_as_str_from_given_filename(self):
        path_and_filename = "glider.rle"
        iterations = 10
        self.controller.execute(path_and_filename, iterations)
        pattern_should_be = "bo$2bo$3o!"
        self.assertEqual(pattern_should_be,
                         self.controller.parser.pattern_as_str)

    def test_parser_initializes_grid_from_parsed_str(self):
        path_and_filename = "glider.rle"
        iterations = 10
        self.controller.execute(path_and_filename, iterations)
        pattern__as_grid_should_be = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1],
        ]
        self.assertEqual(pattern__as_grid_should_be,
                         self.controller.parser.pattern_as_grid)

    def test_game_service_iterator_has_correct_r_value_after_two_glider_iterations(self):
        path_and_filename = "glider.rle"
        iterations = 2
        self.controller.execute(path_and_filename, iterations)
        r_value_should_be = (-10, 8)
        self.assertEqual(r_value_should_be,
                         self.controller.game_service.r_value)

    def test_game_service_iterator_has_correct_r_value_after_two_glider_iterations_with_respect_to_given_initial_r_value(self):
        path_and_filename = "glider.rle"
        iterations = 2
        self.controller.execute(path_and_filename, iterations)
        r_value_should_be = (-10, 8)
        self.assertEqual(r_value_should_be,
                         self.controller.game_service.r_value)

    def test_during_execution_file_method_calls_method_to_create_str_pattern_from_grid(self):
        path_and_filename = "glider.rle"
        iterations = 10
        self.controller.execute(path_and_filename, iterations)
        pattern_should_be = "2bo$obo$b2o!"
        self.assertEqual(pattern_should_be,
                         self.controller.parser.str_pattern_from_grid)

    def test_output_file_contains_right_str_pattern(self):
        path_and_filename = "glider.rle"
        iterations = 10
        self.controller.execute(path_and_filename, iterations)
        pattern_should_be = "2bo$obo$b2o!"
        with open(self.controller.parser.export_filename, "r", encoding="utf-8") as file:
            content = file.read()
            content_as_list = content.split("\n")
        self.assertEqual(pattern_should_be, content_as_list[-1])

    def destroy_created_file(self, path_and_file):
        if os.path.exists(path_and_file):
            os.remove(path_and_file)

    def tearDown(self):
        self.destroy_created_file(self.controller.parser.export_filename)
