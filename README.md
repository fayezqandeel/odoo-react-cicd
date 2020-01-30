# Odoo React CI/CD Feature Branch Pipline
In this repo I'm tryin to implement feature branch deployment, along with odoo/react integration.

# Used applications
- Odoo
- ReactJS
- React Redux Store
- Jenkins
- Postgres
- Nginx Proxy
- Docker
- Amazon EC2

# Installation steps
1. Install Jenkins
2. Install these plugins for jenkins [SSH2 Easy Plugin, SSH Agent, Github plugin]
3. Add you Amazon EC2 credentials by going to jenkins -> credentials -> Stores scoped -> Add Credentials
4. Kind of credentials should be SSH Username with private key
6. Create SSH remote hosts by going to jenkins configuration -> SSH remote hosts section
4. Create free style Jenkins Project
5. Configure the project and connect it to your project repo and set Branches to build to */feature/*
6. Add build step "Execute shell script on remote host using ssh"
7. Paste the following bash script
```bash

branch=$(echo "$GIT_BRANCH" | sed 's/origin\///g')
tag=$(echo "$GIT_BRANCH" | sed 's/[^0-9]*//g')
echo "branch=$branch, tag=$tag"
git clone  -b $branch https://[GITHUB USERNAME]:[GITHUB PASSWORD]@github.com/[GITHUB REPO PATH URL] $tag
if [ $? -eq 0 ]; then
    cd $tag
    sudo touch .env
    sudo echo "tag=$tag" > .env
    cd frontend
    sudo touch .env
    sudo echo -e  "DANGEROUSLY_DISABLE_HOST_CHECK=true\nREACT_APP_TAG=$tag" > .env
    cd ..
    sudo docker container inspect proxy > /dev/null 2>&1 &&  sudo docker rm -f proxy
   [[ $(sudo docker ps -f "name=proxy" --format '{{.Names}}') == "proxy" ]] || sudo docker run --network='nginx-proxy' --name proxy -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy
   [[ $(sudo docker ps -f "name=db" --format '{{.Names}}') == "db" ]] || sudo docker run --network='nginx-proxy' --name db -d -e POSTGRES_PASSWORD=odoo -e POSTGRES_USER=odoo -e POSTGRES_DB=postgres postgres:10
    sudo docker-compose -f docker-compose.yml build
    sudo docker-compose -f docker-compose.yml up -d
else
    cd $tag
    git pull
    sudo docker-compose -f docker-compose.yml down
    sudo docker-compose -f docker-compose.yml build
    sudo docker container inspect proxy > /dev/null 2>&1 &&  sudo docker rm -f proxy
   [[ $(sudo docker ps -f "name=proxy" --format '{{.Names}}') == "proxy" ]] || sudo docker run --network='nginx-proxy' --name proxy -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy
   [[ $(sudo docker ps -f "name=db" --format '{{.Names}}') == "db" ]] || sudo docker run --network='nginx-proxy' --name db -d -e POSTGRES_PASSWORD=odoo -e POSTGRES_USER=odoo -e POSTGRES_DB=postgres postgres:10
    sudo docker-compose -f docker-compose.yml up -d
fi

```
8. Save
9. Login to your github repo settings -> webhooks-> add new webhook-> set hook Payload URL to http[s]://[JenkinsURL]/github-webhook/ and with preference Just the push event.

10. Login to your AWS EC2 instance 
11. install docker by running the following 
```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install docker-compose
```
12. create default network for our apps to allow container to communicate
```bash
sudo docker network create nginx-proxy
```

13. Create branch and push anything to it, please not that branch name should be in this pattern feature|hotfix|bugfix/[JIRA-TICKET-NUMBER] for example feature/LGR-675 or hotfix/LGR-754


