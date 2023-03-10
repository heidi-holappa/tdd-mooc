class ParserService:

    def __init__(self):
        self.x_dim = 0
        self.y_dim = 0
        self.pattern_as_str = ""
        self.pattern_as_grid = []

    def create_grid_from_pattern(self):
        self.pattern_as_grid = [[0]* self.x_dim for _ in range(self.y_dim)]
        str_idx = 0
        for y in range(self.y_dim):
            print(str_idx)
            x = 0
            while x < self.x_dim:
                if self.pattern_as_str[str_idx] == "!":
                    break
                if self.pattern_as_str[str_idx].isdigit():
                    x_length = int(self.pattern_as_str[str_idx])
                    if self.pattern_as_str[str_idx + 1] == "o":
                        self.pattern_as_grid[y][x:x + x_length] = [1]*x_length
                    x += x_length
                    str_idx += 2
                if self.pattern_as_str[str_idx] == "o":
                    self.pattern_as_grid[y][x] = 1
                    str_idx += 1
                    x += 1
                if self.pattern_as_str[str_idx] == "b":
                    str_idx += 1
                    x += 1
                if self.pattern_as_str[str_idx] == "$":
                    str_idx += 1
                    break

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
            file.write("Done")

