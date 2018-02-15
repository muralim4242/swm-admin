FROM node:8
MAINTAINER Arpit Narechania

COPY package.json package.json
RUN ["npm", "install"]
COPY public public
COPY src src

EXPOSE 3000
CMD ["npm", "start"]
