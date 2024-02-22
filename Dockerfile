FROM node:latest as production
WORKDIR /home/app 
COPY . .
RUN npm install --verbose
RUN npm run build --verbose

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=production /home/app/dist /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"] 


