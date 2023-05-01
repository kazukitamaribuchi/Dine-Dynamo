FROM python:3.9.16-slim-buster
ENV PYTHONUNBUFFERED=1

WORKDIR /home/api

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
  net-tools \
  sudo \
  bzip2 \
  curl \
  gcc \
  git \
  python3-dev \
  vim
RUN apt-get clean

COPY ./requirements.txt .
RUN pip install -r requirements.txt
