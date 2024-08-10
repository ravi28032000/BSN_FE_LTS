#FROM node:14.20.0 as angular

#WORKDIR /ATM-FE-main/src/app

#COPY package.json package-lock.json ./

#RUN npm install  @angular/cli@9.1.1
#COPY . .
#RUN npm install
#RUN ng build --prod


#FROM httpd:alpine

#WORKDIR /var/www/html/index.html

#COPY --from=angular /app/dist/blog  /var/www/html/index.html


#EXPOSE 801

# Stage 1: Build the Angular application
FROM node:14.20.0 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
ARG GIT_USER_EMAIL
ARG GIT_USER_NAME
RUN git config --global user.email "${GIT_USER_EMAIL}" \
    && git config --global user.name "${GIT_USER_NAME}"
RUN npm run build --prod

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/blog /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

