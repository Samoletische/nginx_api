FROM node:14-slim

WORKDIR /usr/src/app

# install openresty
RUN apt-get update
RUN apt-get -y install wget
RUN apt-get -y install --no-install-recommends wget gnupg ca-certificates
RUN wget -O - https://openresty.org/package/pubkey.gpg | apt-key add -
#RUN codename=`grep -Po 'VERSION="[0-9]+ \(\K[^)]+' /etc/os-release`
#RUN echo $codename
RUN echo "deb http://openresty.org/package/debian stretch openresty" | tee /etc/apt/sources.list.d/openresty.list
#RUN cat /etc/apt/sources.list.d/openresty.list
RUN apt-get update
RUN apt-get -y install --no-install-recommends openresty
RUN apt-get -y install htop

ENV PATH=/usr/local/openresty/nginx/sbin:$PATH

COPY ./nginx/conf/* /usr/local/openresty/nginx/conf/
COPY ./nginx/logs/* /usr/local/openresty/nginx/logs/

# install api-server
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000 8080

CMD nginx ; npm run start
