#!/usr/bin/python3
"""Build and debloy the project as docker container."""

import argparse
import base64
import json
import os
import subprocess
import sys
import time

from docker import Client

cli = Client(base_url='unix://var/run/docker.sock')

projectName = 'v2'
tag = 'e2e-test'
#
#
#
#
# → Build and Unit Test
# ==================================================
print("→ Build and Unit Test")
e2e = subprocess.Popen('npm run deploy:dev', shell=True)
e2e.communicate()
#
#
#
#
# → Docker Build
# ==================================================
print("→ Docker Build ")
response = cli.build(path='.',
                     rm=True,
                     tag="{}:{}".format(projectName, tag),
                     decode=True)

for line in response:
    print(line.get('stream'))
#
#
#
#
# → Docker Run Container
# ==================================================
print("→ Docker Run Container ")
container = cli.create_container(
    image="{}:{}".format(projectName, tag),
    stdin_open=True,
    ports=[80],
    host_config=cli.create_host_config(port_bindings={80: 3000}))
cli.start(container=container.get('Id'))
response = cli.stats(container)
#
#
#
#
# → Start the E2E Testing
# ==================================================
print("→ Start the E2E Testing")
try:
    command_run = subprocess.check_call('npm run test:e2e', shell=True)
except subprocess.CalledProcessError:
    print('##########################################################')
    print('✗ Test Error')
else:
    print('##########################################################')


print('⟲ CleanUp')
#
#
#
#
# → Docker Kill Container
# ==================================================
print("→ Docker Kill Container ")
cli.kill(container)
#
#
#
#
# → Docker Remove
# ==================================================
print("→ Docker Remove ")
response = cli.remove_image(image="{}:{}".format(projectName, tag), force=True)
