# Use an official Node.js runtime as a base image
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Set environment variables for Prisma
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Generate Prisma client
RUN npm run db:generate

# Expose application port
EXPOSE 3000

# Start application
CMD npm run db:init && npm run start
