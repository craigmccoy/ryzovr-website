# Ryzovr Website

Static website for Ryzovr, containerized with Docker and NGINX.

## Running with Docker

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The website will be available at: http://localhost:8080

### Using Docker CLI

```bash
# Build the image
docker build -t ryzovr-website .

# Run the container
docker run -d -p 8080:80 --name ryzovr-website ryzovr-website

# Stop the container
docker stop ryzovr-website

# Remove the container
docker rm ryzovr-website
```

## Development

The website files are located in the `public/` directory:
- `index.html` - Main HTML file
- `css/styles.css` - Stylesheet
- `js/script.js` - JavaScript functionality
- `img/` - Images directory

After making changes, rebuild and restart the container to see the updates.
