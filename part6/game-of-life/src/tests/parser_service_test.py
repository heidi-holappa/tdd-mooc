import os 
import unittest
from services.parser_service import ParserService

class TestParserService(unittest.TestCase):

    def setUp(self):
        self.parser = ParserService()
        self.directory_name = os.path.dirname(__file__)
        self.path = os.path.join(self.directory_name, '..', '..', "rle-files/")
    
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

    def test_gosper_glider_pattern_is_correctly_parsed_into_grid(self):
        self.parser.x_dim = 36
        self.parser.y_dim = 9
        self.parser.pattern_as_str = "24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4bobo$10bo5bo7bo$11bo3bo$12b2o!"
        self.parser.create_grid_from_pattern()
        grid_should_be = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
            [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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

    def test_multiline_pattern_is_read_correctly(self):
        multiline_pattern = "24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4bobo$10bo5bo7bo$11bo3bo$12b2o!"
        file_to_read = os.path.join(self.path, "gosper-glider.rle")
        self.parser.parse_file(file_to_read)
        self.assertEqual(multiline_pattern, self.parser.pattern_as_str)
    

    def test_rle_filename_is_extracted_from_given_cli_arguments(self):
        path_and_file = "glider.rle"
        iterations = 10
        self.parser.initialize_parser_with_given_cli_args(path_and_file, iterations)
        self.assertEqual(path_and_file, self.parser.import_subdir_and_filename)
    
    def test_n_of_iterations_is_extracted_from_given_cli_arguments(self):
        path_and_file = "glider.rle"
        iterations = 10
        self.parser.initialize_parser_with_given_cli_args(path_and_file, iterations)
        self.assertEqual(iterations, self.parser.iterations)

    def test_export_filename_is_created_after_cli_arguments_are_extracted(self):
        path_and_file = "glider.rle"
        iterations = 10
        self.parser.initialize_parser_with_given_cli_args(path_and_file, iterations)
        export_filename_should_be = f"glider-iterated-{iterations}-life-cycles.rle"
        self.assertEqual(export_filename_should_be, self.parser.export_filename)

    def test_grid_is_created_from_parsed_file_given_as_cli_arg(self):
        path_and_file = "glider.rle"
        iterations = 10
        self.parser.initialize_parser_with_given_cli_args(path_and_file, iterations)
        pattern__as_grid_should_be = [
            [0,1,0],
            [0,0,1],
            [1,1,1],
        ]
        self.assertEqual(pattern__as_grid_should_be, self.parser.pattern_as_grid)

    def test_glider_is_fetched_from_rle_file_with_given_cli_args(self):
        path_and_file = "glider.rle"
        iterations = 10
        self.parser.initialize_parser_with_given_cli_args(path_and_file, iterations)
        pattern_should_be = "bo$2bo$3o!"
        self.assertEqual(pattern_should_be, self.parser.pattern_as_str)

    def test_r_value_is_fetched_from_rle_file_with_given_cli_args(self):
        path_and_file = "glider.rle"
        iterations = 10
        self.parser.initialize_parser_with_given_cli_args(path_and_file, iterations)
        r_value_should_be = (-10,9)
        self.assertEqual(r_value_should_be, self.parser.initial_r_value)
    
    def test_parser_creates_str_pattern_from_a_grid(self):
        self.parser.pattern_as_grid = [
            [0,1,0],
            [0,0,1],
            [1,1,1]
        ]
        self.parser.x_dim = 3
        self.parser.y_dim = 3
        self.parser.create_str_pattern_from_grid(self.parser.pattern_as_grid)
        pattern_as_str_should_be = "bo$2bo$3o!"
        print(self.parser.str_pattern_from_grid)
        self.assertEqual(pattern_as_str_should_be, self.parser.str_pattern_from_grid)


class TestRleFileCreation(unittest.TestCase):

    def setUp(self):
        self.parser = ParserService()
        self.directory_name = os.path.dirname(__file__)
        self.path = os.path.join(self.directory_name, '..', '..', "rle-files/")
        self.file_to_parse = "glider.rle"
        self.glider_state_one = [
            [0,1,0],
            [0,0,1],
            [1,1,1],
        ]
        self.r_value = (0, 0)
        self.parser.initialize_parser_with_given_cli_args(self.file_to_parse, 0)
        self.parser.create_rle_file(self.glider_state_one, self.r_value)
        self.created_rle_file = self.parser.export_filename
        self.new_parser = ParserService()        
        self.new_parser.parse_file(self.created_rle_file)

    def test_new_rle_file_is_created(self):
        self.assertTrue(os.path.exists(self.parser.export_filename))

    def test_new_rle_file_contains_x_dimension(self):
        x_dim_should_be = 3
        self.assertEqual(x_dim_should_be, self.new_parser.x_dim)

    def test_new_rle_file_contains_y_dimension(self):
        y_dim_should_be = 3
        self.assertEqual(y_dim_should_be, self.new_parser.y_dim)

    
    def test_new_rle_file_contains_single_line_pattern(self):
        pattern_should_be = "bo$2bo$3o!"
        self.assertEqual(pattern_should_be, self.new_parser.pattern_as_str)

    def test_new_rle_file_contains_multi_line_pattern_split_into_70_char_lines(self):
        gosper_parser = ParserService()
        gosper_parser.initialize_parser_with_given_cli_args("gosper-glider.rle", 0)
        gosper_parser.create_rle_file(gosper_parser.pattern_as_grid, (0, 0))
        with open(gosper_parser.export_filename, "r", encoding="utf-8") as file:
            content = file.read()
            content_as_list = content.split("\n")
        line_lengths_should_be = (70, 29)
        self.assertEqual(line_lengths_should_be, (len(content_as_list[-2]), len(content_as_list[-1])))
        self.destroy_created_file(gosper_parser.export_filename)

    def test_created_file_contains_r_value(self):
        with open(self.parser.export_filename, "r", encoding="utf-8") as file:
            content = file.read()
            content_as_list = ["".join(i.split()) for i in content.split("\n")]
        self.assertTrue(bool('#R00' in content_as_list))
    
    def destroy_created_file(self, path_and_file):
        if os.path.exists(path_and_file):
            os.remove(path_and_file)

    def tearDown(self):
        self.destroy_created_file(self.created_rle_file)
        