# Use the specific version of Node.js as the base image
FROM node:20.15.0

# Set the working directory inside the container
WORKDIR /client 
 
# We bring the project dependencies into the working directory 
COPY package.json .

# Install all the project dependencies listed in package.json file
RUN npm install

# Now, if you were to copy all your application code before running npm install,
# any change in your code would force Docker to redo the npm install step, 
# even if your dependencies haven’t changed. 
# This is like having to rebake the entire cake just because you added a new decoration on top.


# Copy the rest of the application code to the working directory
# By copying the rest of your application code after running npm install, 
# you ensure that changes to your code don’t affect the cached layer with the dependencies. 
# This way, Docker only needs to add the new code layer,
# making the build process faster and more efficient.
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
 





#Why Two COPY Instructions?
#The two COPY instructions are used to optimize the Docker image build process:

#First COPY + npm install: By copying just the package.json and running npm install, you create a cached layer that won't need to be rebuilt unless package.json changes. This means that on subsequent builds, if you haven't added or removed any dependencies, Docker will skip the npm install step and use the cached layer instead, saving time.

#Second COPY: After dependencies are installed, the rest of the application files are copied. This ensures that any changes to your source code are reflected in the build, but without having to reinstall the dependencies unless they have changed.

#This pattern is a common Docker best practice to improve build efficiency.