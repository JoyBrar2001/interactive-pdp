# Use an official Node.js image as the base image for building the project
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the project
RUN npm run build

# Use an official Node.js image as the base image for serving the project
FROM node:18-alpine AS production

# Install a simple static file server
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app/dist ./dist

# Expose the port the app will run on
EXPOSE 3000

# Command to run the static file server
CMD ["serve", "-s", "dist", "-l", "3000"]
