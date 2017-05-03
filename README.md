# bim-lab
Digital signage project for BIM Lab at EASJ-Naestved

## 4th Semester mandatory
This repo is an answer to a mandatory assignment at ZIBAT

## To use this
### With Docker
run "docker-compose up -d" in the root of the project, if no user exists in the mongo container, go to /admin/firstUser to create an admin/admin user

After project is up, webserver listens to \<hostname\>:10000

The port is defined in docker-compose.yml

### Without Docker
Change mongo settings in app.js:11 and start use "npm start" to start up the project