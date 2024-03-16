FROM python:3.10

# Intall poetry
RUN pip install poetry

# Working directory
WORKDIR /api

# Copy source code
COPY ./src/ ./src/
COPY ./pyproject.toml .

# Poetry install
RUN poetry install

# # Create requirements
RUN poetry self add poetry-plugin-export
RUN poetry export --without-hashes --format=requirements.txt > requirements.txt

# # Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install mysql-connector-python

EXPOSE 8001
