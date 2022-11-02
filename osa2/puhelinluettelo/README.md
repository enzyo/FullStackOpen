RUN
npm install

INSTALL JSON-SERVER (-g for global install)
npm install -g json-server

RUN
json-server --port 3001 --watch db.json

OR RUN FROM APP ROOT
npx json-server --port 3001 --watch db.json

RUN
npm start