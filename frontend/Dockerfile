# Use official Node image
FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Default command for development
CMD ["npm", "run", "dev"]
