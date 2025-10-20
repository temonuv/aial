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
```
# set up .env file
docker compose down

docker compose up -d --build
```