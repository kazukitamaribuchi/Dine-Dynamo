ARG PYTHON_VERSION="3.9"
FROM mcr.microsoft.com/vscode/devcontainers/python:0-${PYTHON_VERSION}

ARG NODE_VERSION="18"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi

RUN curl -sSL -o /usr/local/bin/hadolint https://github.com/hadolint/hadolint/releases/download/v2.10.0/hadolint-Linux-x86_64 && \
  chmod 755 /usr/local/bin/hadolint

USER vscode
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN curl -sSL https://install.python-poetry.org | python3 - --version=1.3.2
ENV PATH "/home/vscode/.poetry/bin:$PATH"
