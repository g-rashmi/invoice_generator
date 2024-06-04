# Use the Puppeteer image from GitHub Container Registry
FROM ghcr.io/puppeteer/puppeteer:22.10.0

# Set the working directory to /app
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure Puppeteer installs the browser binaries
RUN npx puppeteer install

# Copy the rest of the backend code to the working directory
COPY . .

# Expose the port your app runs on (adjust if necessary)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
