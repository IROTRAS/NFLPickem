####################
### build client ###
####################

# Create image based on official Node 8 image from dockerhub
FROM node:8 AS builder

# Create new directory to place app
RUN mkdir -p /app

# Change directory so our commands run inside the newly created directory
WORKDIR /app

# Copy dependecy definitions
COPY NFL-Pickem /app

# Install dependecies
RUN npm install

# generate build
RUN npm run build
# RUN ng build --prod --configuration=producton output-path=dist

####################
### server       ###
####################

# Create image based on official Node 8 image from dockerhub
FROM node:8

# Create new directory to place app and public for the client dist
RUN mkdir -p /usr/src/app/public

# Change directory so our commands run inside the newly created directory
WORKDIR /usr/src/app

# Copy dependecy definitions
COPY NFL-Pickem-server /usr/src/app

# Install dependecies
RUN npm install

# copy from the build
COPY --from=builder /app/dist /usr/src/app/public

# Expose the port for app
EXPOSE 3200

# Use the Start script to serve the app
CMD ["npm", "start"]
