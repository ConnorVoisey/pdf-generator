default:
    just --list

dk_build:
    docker build -t ghcr.io/connorvoisey/pdf-generator:latest -f docker/prod.dockerfile .

dk_push:
    docker push ghcr.io/connorvoisey/pdf-generator:latest
