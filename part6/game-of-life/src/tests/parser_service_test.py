import os 
import unittest
from services.parser_service import ParserService

class TestParserService(unittest.TestCase):

    def setUp(self):
        self.parser = ParserService()
        self.directory_name = os.path.dirname(__file__)
        self.path = os.path.join(self.directory_name, "rle-test-files/")
    
    def test_glider_state_one_is_parsed_into_grid_correctly(self):
        self.parser.x_dim = 3
        self.parser.y_dim = 3
        self.parser.pattern_as_str = "bo$2bo$3o!"
        self.parser.create_grid_from_pattern()
        grid_should_be = [
            [0,1,0],
            [0,0,1],
            [1,1,1]
        ]
        self.assertEqual(grid_should_be, self.parser.pattern_as_grid)

    def test_blinker_state_one_is_parsed_into_grid_correctly(self):
        self.parser.x_dim = 3
        self.parser.y_dim = 1
        self.parser.pattern_as_str = "3o!"
        self.parser.create_grid_from_pattern()
        grid_should_be = [
            [1,1,1]
        ]
        self.assertEqual(grid_should_be, self.parser.pattern_as_grid)
    
    def test_five_cell_highlife_state_one_is_parsed_into_grid_correctly(self):
        self.parser.x_dim = 3
        self.parser.y_dim = 3
        self.parser.pattern_as_str = "2ob$obo$bo!"
        self.parser.create_grid_from_pattern()
        grid_should_be = [
            [1,1,0],
            [1,0,1],
            [0,1,0]
        ]
        self.assertEqual(grid_should_be, self.parser.pattern_as_grid)

    def test_glider_x_dim_is_extracted_correctly_from_rle(self):
        file = os.path.join(self.path, "glider.rle")
        self.parser.parse_file(file)
        x_dim_should_be = 3
        self.assertEqual(x_dim_should_be, self.parser.x_dim)
    
    def test_glider_y_dim_is_extracted_correctly_from_rle(self):
        file = os.path.join(self.path, "glider.rle")
        self.parser.parse_file(file)
        y_dim_should_be = 3
        self.assertEqual(y_dim_should_be, self.parser.y_dim)
    
    def test_glider_pattern_is_extracted_correctly_from_rle(self):
        file = os.path.join(self.path, "glider.rle")
        self.parser.parse_file(file)
        pattern_should_be = "bo$2bo$3o!"
        self.assertEqual(pattern_should_be, self.parser.pattern_as_str)

    def test_new_rle_file_is_created(self):
        file_to_read = os.path.join(self.path, "glider.rle")
        self.parser.parse_file(file_to_read)
        created_rle_file = os.path.join(self.path, "iterated-glider.rle")
        self.parser.create_rle_file(created_rle_file)
        self.assertTrue(os.path.exists(created_rle_file))
        self.destroy_created_file(created_rle_file)

    def destroy_created_file(self, path_and_file):
        if os.path.exists(path_and_file):
            os.remove(path_and_file)