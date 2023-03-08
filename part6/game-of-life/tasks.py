from invoke import task

@task
def test(ctx):
    ctx.run("python3 -m pytest src/tests/")

@task
def coverage_test(ctx):
    ctx.run("coverage run -m pytest src/tests/")