import sys
from argparse import ArgumentParser
from services.service_controller import ServiceController

def parse_arguments(args: list):
    parser = ArgumentParser()
    parser.add_argument("--imp", required=True)
    parser.add_argument("--iter", required=True, type=int)
    parser.add_argument("--exp", required=False)
    return parser.parse_args(args)

parser = parse_arguments(sys.argv[1:])
service_controller = ServiceController()

try:
    service_controller.execute(parser.imp, parser.iter)
    print(f"Success!\nOutput: {service_controller.parser.export_filename}")
except Exception as e:
    print(f"Something went wrong. Details:\n{e}")



