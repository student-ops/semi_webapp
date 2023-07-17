FROM nginx:alpine
RUN mkdir -p /var/www/myapp
COPY ./next_app/out/ /var/www/myapp