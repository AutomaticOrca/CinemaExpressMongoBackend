# Use Node.js base image
FROM node:alpine3.18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application's port
EXPOSE 5005

# Start the application using the built JavaScript files
CMD ["node", "dist/app.js"]
