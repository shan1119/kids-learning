FROM ubuntu

RUN apt-get update
RUN apt-get install -y npm

COPY . /opt/kids-learning/
WORKDIR /opt/kids-learning/
RUN rm -r node_modules
RUN npm install
RUN npm install nodemon -g
