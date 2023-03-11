from invoke import task

@task
def test(ctx):
    ctx.run("python3 -m pytest src/tests/")

@task
def coverage_test(ctx):
    ctx.run("coverage run -m pytest src/tests/")

@task(
    optional=['exp_file'],
    help={
        'in-file': 'Name and subdirectory of the importable rle-file',
        'cycles': 'Number of life cycles to iterate through'
    }
)
def start(ctx, in_file, cycles):
    """A command to start the application. Requires two arguments.
    """
    ctx.run(f"python3 src/index.py --imp {in_file} --iter {cycles}")