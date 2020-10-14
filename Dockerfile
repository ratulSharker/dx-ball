FROM node:10-slim

# make directory inside `opt`
RUN mkdir /opt/dx-ball

# copy projectfiles
COPY . /opt/dx-ball

# change working directory
WORKDIR /opt/dx-ball

# run the depedency installed
RUN npm ci

# exposing the port 8080
EXPOSE 8000

# now start the program
ENTRYPOINT [ "npm", "start" ]