# Backend
## Getting Started

1. Clone Repository https://github.com/MenTion-Mental-Health-Education/backend.git
2. Install dependensi with `npm install`
3. Create file .env
```.env
DB_USERNAME= //change yourusername
DB_PASSWORD= //change yourpassword
DB_HOSTNAME= //change yourhost/ip
DB_NAME= //change yourdatabasename
DB_DIALECT=mysql

JWT_SECRET=//change yoursecretkey
```
5. Create database in Cloud SQL
6. Save username password IP address and databasename from cloud SQL to .env
8. Migrate database using `npx sequelize-cli db:migrate` 
9. Change script start in package.json to `"start": "node index.js"`
10. Change to port 8080 in file index.js
11. Create app.yaml

```app.yaml
runtime: nodejs16

env_variables:
  DB_USERNAME: //change yourusername
  DB_PASSWORD: //change yourpassword
  DB_HOSTNAME: //change yourhost/ip
  DB_NAME: //change yourdatabasename
  DB_DIALECT: mysql
  JWT_SECRET: //change yoursecretkey

automatic_scaling:
  target_cpu_utilization: 0.65
  min_instances: 1
  max_instances: 5
  ```
  12. Move project to Google Cloud and deploy on App Engine
