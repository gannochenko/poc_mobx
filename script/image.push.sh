#!/usr/bin/env bash

VENDOR=""
APPLICATION_NAME="mobx"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
VERSION="${1:-latest}"
TAG=${VENDOR}/${APPLICATION_NAME}:${VERSION}

echo Pushing ${TAG} image;

docker push ${TAG}
