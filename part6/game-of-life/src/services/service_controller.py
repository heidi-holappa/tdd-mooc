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
        # Parse file
        # Do n iterations
        # Write data to file