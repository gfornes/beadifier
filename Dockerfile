#############################################################################
### Credit goes to : https://mherman.org/blog/dockerizing-an-angular-app/ ###
#############################################################################

# base image
FROM node:12.6.0 AS build

# set working directory
WORKDIR /app

# install app dependencies
RUN npm install -g yarn
COPY package.json yarn.lock ./
RUN yarn install

# add app
COPY . .

EXPOSE 4200

# start app and make it accessible from outside
CMD ["yarn", "start", "--host", "0.0.0.0"]
