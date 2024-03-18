# BCS1600 Postcode API

This is an API for Project 1-2 (BCS1600) at Maastricht University. This API is used to get the latitude and longitude of Maastricht postcodes.

## Setup Instructions

`data.csv` should have `Zip,Lat,Lon` as the first row.

### Docker

1. Pull the Docker image: `docker pull ghcr.io/macluxhd/bcs1600-postcode-api:latest`
2. Create a volume for data: `docker volume create postcode-data`
3. Run the Docker container: `docker run -p 3000:3000 -e loglevel=INFO -v postcode-data:/app/data ghcr.io/macluxhd/bcs1600-postcode-api:latest`

The data.csv file should be placed in the `/app/data` directory inside the Docker container. So edit the volume path `postcode-data` to the desired path on your system.

#### environment variables

None of the environment variables are required as they all have default values.

- `LOG_LEVEL` is used to set the log level choices are `trace`, `info`. Default is `info`.

- `PORT` sets the port of the application. Default is `3000`.

- `BASE_URL` adds a custom subdirectory to the server URL. For example `http://example.com<BASE_URL>/get_coordinates`. Default is empty.

### ts-node / tsc

Place your data.csv file in the `data` directory.

1. Install dependencies: `yarn`
2. Compile TypeScript to JavaScript: `yarn build`
3. Run the application: `yarn start`

or with ts-node:
1. Install dependencies: `yarn`
2. Install ts-node if not already installed: `yarn global add ts-node`
3. Run the application: `yarn ts-node index.ts`

