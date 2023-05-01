FROM node:lts-buster-slim as builder

WORKDIR /home/app
RUN apt-get update && apt-get install -y --no-install-recommends \
  net-tools \
  sudo \
  bzip2 \
  curl \
  gcc \
  git \
  vim

USER root
EXPOSE 8000
