1. Installing mongodb
    - https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04 
    - https://www.liquidweb.com/kb/how-to-install-mongodb-on-ubuntu-14-04/

2. Start mongodb
    - sudo mongod //For starting mongod service
    - mongo //For interactive terminal
    
3. Setting up workspace
    - npm init //Initiating workspace
    - npm install --save express mongodb body-parser
    - npm install --save-dev nodemon //For automatically restarting when a file is change
    - npm install mongoose --save //For interacting mongoDB
    - npm install --save mongoose-timestamp
    - npm install --save mongoose-unique-validator
    - npm install --save morgan jsonwebtoken bcrypt



============== MongoDB Command =================
1. show dbs //To show all database
2. use database //To switch/create database

==================== APIs ======================
1. /addUser
2. /addDevice
3. /removeDevice  //to remove from user list
4. /getDeviceStatus
5. /updateDeviceStatus
6. /fetchDetails