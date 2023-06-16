# Backend
List content
- [Cloud Architecture](https://github.com/MenTion-Mental-Health-Education/backend#cloud-architecture)

- [Getting Started](https://github.com/MenTion-Mental-Health-Education/backend#getting-started)

- [How to Access Our API](https://github.com/MenTion-Mental-Health-Education/backend#how-to-access-our-api)

- [Server for ML_Model](https://github.com/MenTion-Mental-Health-Education/backend_modelML#backend_modelml)

## Cloud Architecture

![Screenshot_66](https://github.com/MenTion-Mental-Health-Education/backend/assets/125712423/bdd690d7-3d63-4179-b2ad-d21d918069f2)


## Getting Started

1. Clone Repository in Vscode https://github.com/MenTion-Mental-Health-Education/backend.git
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
5. Create database in Cloud SQL (**dont forget to allow network**, usually I use **0.0.0.0/0** from internet)
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
  12. Move project to Google Cloud and deploy on App Engine using `gcloud app deploy`


## How to Access Our API
### 1. Register ==>method `post`

`{{yourappenginelink}}/register`

JSON Body
```
{
    "email": "jd@gmail.com",
    "password": "12345",
    "fullname": "john doe",
    "phonenumber": "+628"
}
```
### 2. Login ==>method `post`

`{{yourappenginelink}}/login`

JSON Body
```
{
    "email": "jd@gmail.com",
    "password": "12345"
}
```
after login we get a `accessToken`

### 3. Posts in Forum ==>method `post`

`{{yourappenginelink}}/forum/posts`

Authorization Bearer Token `Token`

JSON Body
```
{
    "title": "Example how to feeling better",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}
```

### 4. Get all Posts in Forum ==>method `get`

`{{yourappenginelink}}/forum/posts`

Authorization Bearer Token `Token`

### 5. Delete Posts in Forum ==>method `delete`

`{{yourappenginelink}}/forum/posts/{{postId}}`

Authorization Bearer Token `Token`

### 6. Comments in Posts ==>method `post`

`{{yourappenginelink}}/forum/posts/{{postId}}/comments`

Authorization Bearer Token `Token`

JSON Body
```
{"comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
```

### 7. Get all Comments in Posts ==>method `get`

`{{yourappenginelink}}/forum/posts/{{postId}}/comments`

Authorization Bearer Token `Token`

### 8. Logout ==>method `get`

`{{yourappenginelink}}/logout`

Authorization Bearer Token `Token`
