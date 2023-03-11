import os
class ParserService:

    def __init__(self):
        self.x_dim = 0
        self.y_dim = 0
        self.pattern_as_str = ""
        self.str_pattern_from_grid = ""
        self.pattern_as_grid = []
        self.import_subdir_and_filename = ""
        self.export_filename = ""
        self.iterations = 0

    def create_grid_from_pattern(self):
        """
            Note: cell_multiplier is tuple that keeps track of whether the multiplier has been updated.
            It it has been updated, then any additional integers will be concatenated with the existing string
            When the grid is updated, the cell_multiplier tuple will be reset. 
        """
        self.pattern_as_grid = [[0]* self.x_dim for _ in range(self.y_dim)]
        str_idx = 0
        for y in range(self.y_dim):
            x = 0
            cell_multiplier = ("1", False)
            while x < self.x_dim:
                if self.pattern_as_str[str_idx] == "!":
                    break
                if self.pattern_as_str[str_idx].isdigit():
                    if not cell_multiplier[1]:
                        cell_multiplier = (self.pattern_as_str[str_idx], True)
                    else:
                        cell_multiplier = (cell_multiplier[0] + self.pattern_as_str[str_idx], True)
                    str_idx += 1
                    print(f"str_idx: {str_idx}, cell-multiplier: {cell_multiplier}")
                    continue
                if self.pattern_as_str[str_idx] == "o" or self.pattern_as_str[str_idx] == "b":
                    cell_value = int(bool(self.pattern_as_str[str_idx] == "o"))
                    x_length = int(cell_multiplier[0])
                    self.pattern_as_grid[y][x:x + x_length] = [cell_value]*x_length
                    str_idx += 1
                    x += x_length
                    cell_multiplier = ("1", False)
                if self.pattern_as_str[str_idx] == "$":
                    str_idx += 1
                    break

    def create_str_pattern_from_grid(self):
        y_count = 0
        x_count = 0
        new_pattern = ""
        for y in range(self.y_dim):
            for x in range(self.x_dim):
                if x == 0:
                    if self.pattern_as_grid[y][x] == 1:
                        x_count = 1
                    else:
                        y_count = 1
                elif self.pattern_as_grid[y][x] == 1:
                    if self.pattern_as_grid[y][x-1] != 1:
                        count = ""
                        if y_count > 1:
                            count = str(y_count)
                        new_pattern += f"{count}b"
                        y_count = 0
                    x_count += 1
                else:
                    if self.pattern_as_grid[y][x-1] != 0:
                        count = ""
                        if x_count > 1:
                            count = str(x_count)
                        new_pattern += f"{count}o"
                        x_count = 0
                    y_count += 1
            if x_count:
                if x_count > 1:
                    new_pattern += f"{str(x_count)}o"
                else:
                    new_pattern += "o"
            x_count = 0
            y_count = 0
            new_pattern +="$"
        self.str_pattern_from_grid = f"{new_pattern[:-1]}!"


    def parse_file(self, file: str):
        with open(file, "r", encoding="utf-8") as rle_file:
            content = rle_file.read()
        content_as_list = content.split("\n")
        for element in content_as_list:
            if element[0] == "#":
                continue
            if element[0] == "x":
                trimmed_element = "".join(element.split())
                header = trimmed_element.split(",")
                self.x_dim = int(header[0][2:])
                self.y_dim = int(header[1][2:])
                continue
            self.pattern_as_str += element

    def create_rle_file(self, filename: str):
        with open(filename, "w", encoding="utf-8") as file:
            file.write(f"x =  {self.x_dim}, y = {self.y_dim}\n")
            pattern_max_line_length = 70
            split_pattern = [self.pattern_as_str[i: i + pattern_max_line_length] for i in range(0, len(self.pattern_as_str), pattern_max_line_length)]
            for i in range(len(split_pattern)):
                if i + 1 < len(split_pattern):
                    file.write(split_pattern[i] + "\n")
                else:
                    file.write(split_pattern[i])
            file.close()

    def execute_cli_args(self, path_and_file: str, iterations: int):
        self.import_subdir_and_filename = path_and_file
        self.iterations = iterations
        self.export_filename = f"{path_and_file[:-4]}-iterated-{iterations}-life-cycles.rle"
        import_directory_and_filename = os.path.join(os.path.dirname(__file__), '..', '..', 'rle-files/', self.import_subdir_and_filename)
        self.parse_file(import_directory_and_filename)
