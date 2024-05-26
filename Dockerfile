# Use an official node runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy only necessary files
COPY . .

# Make port 8081 available to the world outside this container
EXPOSE 8081

# Run app when the container launches
CMD ["npm", "start"]
