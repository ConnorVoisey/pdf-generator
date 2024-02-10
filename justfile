default:
    just --list

dk_build:
    docker build -t ghcr.io/connorvoisey/pdf-generator .
