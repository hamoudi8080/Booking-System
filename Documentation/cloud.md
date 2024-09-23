in this document, we would like to push our Mern full-stack applicaiton into the cloud.

preRequest: 

both frontend and backend must have dockerfiles locally.
Install Azure CLI on Windows from following link
https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli





because our app is docrized, we would like to make a ACR azure container registry and push out local image for frontend and backend.
follow this link to go throug the process.
https://learn.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli

so what I did
docker tag newproject-frontend mycontainerregistry1997.azurecr.io/newproject-frontend
docker push mycontainerregistry1997.azurecr.io/newproject-frontend


docker tag newproject-backend mycontainerregistry1997.azurecr.io/newproject-backend
docker push mycontainerregistry1997.azurecr.io/newproject-backend