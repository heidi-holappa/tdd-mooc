import os
import sys
from argparse import ArgumentParser
from services.service_controller import ServiceController


def parse_arguments(args: list):
    parser = ArgumentParser()
    parser.add_argument("--imp", required=True)
    parser.add_argument("--iter", required=True, type=int)
    parser.add_argument("--exp", required=False)
    return parser.parse_args(args)


arg_parser = parse_arguments(sys.argv[1:])
service_controller = ServiceController()


service_controller.execute(arg_parser.imp, arg_parser.iter)
print(
    f"Success!\nOutput: {os.path.normpath(service_controller.parser.export_filename)}")
