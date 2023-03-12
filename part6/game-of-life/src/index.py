from argparse import ArgumentParser
from services.parser_service import ParserService
import sys

def parse_arguments(args: list):
    parser = ArgumentParser()
    parser.add_argument("--imp", required=True)
    parser.add_argument("--iter", required=True, type=int)
    parser.add_argument("--exp", required=False)
    return parser.parse_args(args)

parser = parse_arguments(sys.argv[1:])
parser_service = ParserService()
print(parser.imp, parser.iter, parser.exp)


