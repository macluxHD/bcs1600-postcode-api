FROM node:20-alpine

# Create app directory
WORKDIR /app

# Bundle app source
COPY . .

VOLUME [ "/app/data" ]

# Expose a port
EXPOSE 3000

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

CMD [ "npm", "start" ]