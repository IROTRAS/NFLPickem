# Create image based on official Node 8 image from dockerhub
FROM node:8

# Create new directory to place app
RUN mkdir -p /app

# Change directory so our commands run inside the newly created directory
WORKDIR /app

# Copy dependecy definitions
COPY package*.json ./
# Install dependecies
RUN npm install

# Copy all the other files in directory needed to run the app
COPY . /app

# Expose the port for app
EXPOSE 4200

# Use the Start script to serve the app
CMD ["npm", "start"]
