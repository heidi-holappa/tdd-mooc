from services.parser_service import ParserService
from services.game_service import GameService

class ServiceController:
    def __init__(self):
        self.parser = ParserService()
        self.game_service = GameService()
        self.subdir_and_filename = ""
        self.iterations = 0

    def execute(self, subdir_and_filename: str, iterations: int):
        self.subdir_and_filename = subdir_and_filename
        self.iterations = iterations
        self.parser.initialize_parser_with_given_cli_args(subdir_and_filename, iterations)
        iterated_grid, r_value = self.game_service.iterate_n_ticks(self.parser.pattern_as_grid, self.iterations, self.parser.initial_r_value)
        self.parser.create_rle_file(iterated_grid, r_value)
        