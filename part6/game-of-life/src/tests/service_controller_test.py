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
        self.assertEqual(path_and_filename, self.controller.subdir_and_filename)

    def test_executing_cli_args_adds_iterations_to_attributes(self):
        path_and_filename = "glider.rle"
        iterations = 10
        self.controller.execute(path_and_filename, iterations)
        self.assertEqual(iterations, self.controller.iterations)
