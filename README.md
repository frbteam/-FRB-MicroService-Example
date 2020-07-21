# -FRB-MicroService-Example
sample Micro-service architecture with multiple dockerized node.js app with load balancer (haproxy)
The following is the explanation of Microservice architecture of multiple node.js using  docker container for federal reserve bank : 



Steps
1) First step is to move the application into the docker container 
2)  Please not that its an an express application, its takes up an environment variable and some rest endpoints that becomes the application ID
 3) Important value to know : Which Microservice we will target and the listining  port value 
That we are going to expose to the web traffic
 4)  After spinning up the docker container from the image that we have build from the docker container we can specify which host we can map to 
5) Point to note that every docker image is mapped to the host by specifying the port. In this example as  we are focusing  to built a micro service architecture it will get harder to debug 
to expose the port. 
 6)  To resolve the problem above we  will implement load balancing here that is "HA Proxy"
 7) The app ID becomes the port that we are going to listen to.
**********************************************************************************************
 In the example we will use port as 1111
Lets run the docker container use the command
 "docker  build -t nodeapp . "  ( Note the name of the app is nodeapp ) 
After you run the command the nodeapp imagine will be built 
************************************************************************************************8
8) The next  step is we are going to create a folder called as HA Proxy to add the configuration files Inside the folder we will create the configuration file ( In the text editor or any editor of preference  create the haproxy.cfg
haproxy.cfg 
a). frontend http
b) bind *:8080
c) mode http
d) timeout client 10s
e) use_backend all 
 ******************************************************************************************************   
 # ( // please note here we define the bank end - Important point to remember how many services we would want to spin up. The whole microservice architecture we will spin up in its own bubble it will have its own ip address its own host names , we will define the host names here and then we will build the actual micro services using docker compose .
Next steps below while defining the backend services we  the define multiple servers as follows
 first server we will called 
 server 1 as s1 we will say the host name as nodeapp1:11111. This will listen on the port 1111
 Server 2 as s2, host name as nodeapp2 , it will listen on port 2222
server 3 as host s3,  host name as nodeapp3 , it will listen on port 3333) ;
*******************************************************************************************
 9). backend all  
10      mode http
11 .  Server s1 nodeapp1:1111
12  Server s2 nodeapp2:2222
13   Server s3 nodeapp3:3333

********************************************************************************************************

#( Note in the container will be a host name called as nodeapp1 , node app2 and nodeapp3 - we will execute the step of making the above mentioned app into host using docker compose

 As we have HA proxy ready , we have  node.js image ready, now we will create a  docker compose

Now we will create a docker-compose.yml ( Given that docker is already installed , In this docker  yml file - it takes the file and spin up everything in its own bubble of its internal  network and we going to configure to expose it to certain port

docker-compose.yml file goes as follows
*****************************************************************************************************
14  version : '3'
15   services: 
16   lb :    # // lb : this is a first container it's a load balancer//;
*************************************************************************************************************
  
 # // lb : this is a first container it's a load balancer//;  image: haproxy    # //Here the load balancer is haproxy and we have to tell on what port its listening so that we can expose the port to everyone.
We use the listening ports as "8080:8080" .  
Note the first port 8080 We can change the port 8080 but here we will use 8080 to keep things simple. 
The second port 8080 this port has  to be the same in the haproxy that we are using hence here  we are also  using 8080 .
 In volumes:  We need to specify a path to map haproxy to the path to trigger the configuration  ( note it is a constant in the container. So we have -./haproxy:/usr/local/etc/haproxy. 
Node app requires an imagine so we will add image as follows 
Image: nodeapp 
node app requires Environment variables such as APPID
Therefore we input -APPID=1111. Similarly follow the same process of rest two apps



map a //;

 17  nodeapp1:
        Image: nodeapp
        environment: 
            -APPID=1111
  18 nodeapp2
        Image: nodeapp
        environment: 
            -APPID=2222

 19  nodeapp3 
        Image: nodeapp
        environment: 
            -APPID=3333

Now run the docker compose command make sure to be on the right folder
20 The command is docker-compose up

 21   Now go and hit localhost:8080

You will see the result as 
appid: 1111 home page: says FRB federal reserve bank !
If we refresh then it will send request to another haproxy and
it will take us to 
appid:2222 home page: says FRB federal reserve bank !

If we refresh Again  then it will send request to another haproxy and
it will take us to 
appid:3333 home page: says FRB federal reserve bank !

We have implemented round robin
we can  customize it by inputting IP hash or sticky sessions and so forth
22. Please refer to The following is the explanation of Microservice architecture of multiple node.js using  docker container for federal reserve bank : 



Steps
1) First step is to move the application into the docker container 
2)  Please not that its an an express application, its takes up an environment variable and some rest endpoints that becomes the application ID
 3) Important value to know : Which Microservice we will target and the listining  port value 
That we are going to expose to the web traffic
 4)  After spinning up the docker container from the image that we have build from the docker container we can specify which host we can map to 
5) Point to note that every docker image is mapped to the host by specifying the port. In this example as  we are focusing  to built a micro service architecture it will get harder to debug 
to expose the port. 
 6)  To resolve the problem above we  will implement load balancing here that is "HA Proxy"
 7) The app ID becomes the port that we are going to listen to.
**********************************************************************************************
 In the example we will use port as 1111
Lets run the docker container use the command
 "docker  build -t nodeapp . "  ( Note the name of the app is nodeapp ) 
After you run the command the nodeapp imagine will be built 
************************************************************************************************8
8) The next  step is we are going to create a folder called as HA Proxy to add the configuration files Inside the folder we will create the configuration file ( In the text editor or any editor of preference  create the haproxy.cfg
haproxy.cfg 
a). frontend http
b) bind *:8080
c) mode http
d) timeout client 10s
e) use_backend all 
 ******************************************************************************************************   
 # ( // please note here we define the bank end - Important point to remember how many services we would want to spin up. The whole microservice architecture we will spin up in its own bubble it will have its own ip address its own host names , we will define the host names here and then we will build the actual micro services using docker compose .
Next steps below while defining the backend services we  the define multiple servers as follows
 first server we will called 
 server 1 as s1 we will say the host name as nodeapp1:11111. This will listen on the port 1111
 Server 2 as s2, host name as nodeapp2 , it will listen on port 2222
server 3 as host s3,  host name as nodeapp3 , it will listen on port 3333) ;
*******************************************************************************************
 9). backend all  
10      mode http
11 .  Server s1 nodeapp1:1111
12  Server s2 nodeapp2:2222
13   Server s3 nodeapp3:3333

********************************************************************************************************

#( Note in the container will be a host name called as nodeapp1 , node app2 and nodeapp3 - we will execute the step of making the above mentioned app into host using docker compose

 As we have HA proxy ready , we have  node.js image ready, now we will create a  docker compose

Now we will create a docker-compose.yml ( Given that docker is already installed , In this docker  yml file - it takes the file and spin up everything in its own bubble of its internal  network and we going to configure to expose it to certain port

docker-compose.yml file goes as follows
*****************************************************************************************************
14  version : '3'
15   services: 
16   lb :    # // lb : this is a first container it's a load balancer//;
*************************************************************************************************************
  
 # // lb : this is a first container it's a load balancer//;  image: haproxy    # //Here the load balancer is haproxy and we have to tell on what port its listening so that we can expose the port to everyone.
We use the listening ports as "8080:8080" .  
Note the first port 8080 We can change the port 8080 but here we will use 8080 to keep things simple. 
The second port 8080 this port has  to be the same in the haproxy that we are using hence here  we are also  using 8080 .
 In volumes:  We need to specify a path to map haproxy to the path to trigger the configuration  ( note it is a constant in the container. So we have -./haproxy:/usr/local/etc/haproxy. 
Node app requires an imagine so we will add image as follows 
Image: nodeapp 
node app requires Environment variables such as APPID
Therefore we input -APPID=1111. Similarly follow the same process of rest two apps



map a //;

 17  nodeapp1:
        Image: nodeapp
        environment: 
            -APPID=1111
  18 nodeapp2
        Image: nodeapp
        environment: 
            -APPID=2222

 19  nodeapp3 
        Image: nodeapp
        environment: 
            -APPID=3333

Now run the docker compose command make sure to be on the right folder
20 The command is docker-compose up

 21   Now go and hit localhost:8080

You will see the result as 
appid: 1111 home page: says FRB federal reserve bank !
If we refresh then it will send request to another haproxy and
it will take us to 
appid:2222 home page: says FRB federal reserve bank !

If we refresh Again  then it will send request to another haproxy and
it will take us to 
appid:3333 home page: says FRB federal reserve bank !

We have implemented round robin
we can  customize it by inputting IP hash or sticky sessions and so forth


22. Please refer to attached documents 


