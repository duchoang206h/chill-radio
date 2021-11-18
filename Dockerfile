From node:16
Workdir /app
Copy package.json /app
run npm install
Copy . /app
Cmd ["npm","start"]
