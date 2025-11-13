# Use NGINX with Debian Trixie base
FROM nginx:trixie

# Copy the website files to NGINX html directory
COPY public/ /usr/share/nginx/html/

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
