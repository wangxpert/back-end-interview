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

# Generate Prisma client
RUN npx prisma generate

# Build the app
# RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the app
# CMD npm run prisma:seed && npm run start
CMD npm run dev
