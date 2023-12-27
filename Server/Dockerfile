FROM node:18 as builder

WORKDIR /server

COPY package*.json .
RUN npm install

COPY . .
CMD node index.js

FROM python:3.10-slim


# Install any additional system packages required for Python dependencies
RUN apt-get update && apt-get install -y \
    libsm6 \
    libxext6 \
    libxrender-dev

# Install Python dependencies
RUN pip install --upgrade pip





