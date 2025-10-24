# initial commits on clean PC to start development

## if you don't have docker
```
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release
# Add Docker’s official GPG key:
sudo mkdir -p /etc/apt/keyrings
# Add the Docker repository:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# Install Docker Engine and Docker Compose plugin:
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
# Verify Installation
docker --version
docker compose version
# Allow your user to run Docker
sudo usermod -aG docker $USER
newgrp docker
```

## Bring your project up
set up .env file in root direcotry

set up .env file in frontend direcotry

to run development env:
```
docker compose down
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# access backend on 
http://localhost:8010/api/

# server link
https://dobrydealer.pl/
```

to test production env:
```
docker compose down
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

## create superuser
in different terminal in root of aial project
```
docker compose exec backend bash
python manage.py createsuperuser
# set up
exit
```

open http://172.18.0.4:3000/