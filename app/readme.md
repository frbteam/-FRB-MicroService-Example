The following is the explanation of Microservice architecture of multiple node.js using  docker container for federal reserve bank : 




Steps: 

1) First step is to move the application into the docker container 

2)  Please note that the  Rest endpoints that becomes the application ID 

3) Important point to note down. a) Microservice app that we will map to b) In order to route the web traffic, we need to know the numerical value of the port that we will map to.

 4) Next step is to  spin the docker container  from the image that we have built. Now we can specify which host we can map the docker container to.

5) Every docker image is mapped to the host by specifying the port. In micro service architecture design we have to be mindful of load balancing protocol to route client requests across all servers we have design. 


 6)  We  will implement load balancing here we will use load balancing as  "HA Proxy"

 7) The following step explains how  app ID becomes the port that we are going to listen to.

**********************************************************************************************

 In the example we will use port as 1111

Lets run the docker container use the command

 "docker  build -t nodeapp . "  ( Note the name of the app is nodeapp ) 

After you run the command the nodeapp imagine will be built 

************************************************************************************************

8) The next  step is we are going to create a folder called as HA Proxy 
We will  add the configuration files inside the folder 

haproxy.cfg 

a). frontend http

b) bind *:8080

c) mode http

d) timeout client 10s

e) use_backend all 

 ******************************************************************************************************   

 # ( // please note here we define the backend - 
Important point to remember how many services we would want to spin up. 
The whole microservice architecture we will spin up in its own bubble it will have its own ip address and its own host names.
we will define the host names here and then we will build the actual micro services using docker compose .
Next steps below while defining the backend services and multiple servers as follows

 We will name the first server as

 server 1 as s1 we will say the host name as nodeapp1:11111. This will listen on the port 1111

 Server 2 as s2, host name as nodeapp2 , it will listen on port 2222

server 3 as host s3,  host name as nodeapp3 , it will listen on port 3333) ;

*******************************************************************************************

 9)     backend all  

10      mode http

11 .  Server s1 nodeapp1:1111

12  Server s2 nodeapp2:2222

13   Server s3 nodeapp3:3333


********************************************************************************************************


#( Note in the container will be a host name called as nodeapp1 , node app2 and nodeapp3 - we will execute the step of making the above mentioned app into host using docker compose


 As we have HA proxy ready , we have  node.js image ready, now we will create a  docker compose


Now we will create a docker-compose.yml ( Given that docker is already installed. In this docker  yml file - it takes the file and spin up everything in its own bubble of its internal  network and we going to configure to expose it to certain port


docker-compose.yml file goes as follows

*****************************************************************************************************

14   version : '3'

15   services: 

16  lb :    # // lb : this is a first container it's a load balancer//;

*************************************************************************************************************

  

 # // lb : this is a first container it's a load balancer//;  image: haproxy    # //Here the load balancer is haproxy. We have to tell what port it's listening to so that we can expose the port to everyone.

We use the listening ports as "8080:8080" .  

Note the first port 8080 We can change the port 8080 but here we will use 8080 to keep things simple. 

The second port 8080 this port has  to be the same in the haproxy that we are using hence here  we are also  using 8080 .

17 In volumes:  We need to specify a path to map haproxy to the path to trigger the configuration  ( note it is a constant in the container. So we have -./haproxy:/usr/local/etc/haproxy. 

Node app requires an imagine so we will add image as follows 

Image: nodeapp 

node app requires Environment variables such as APPID

Therefore we input -APPID=1111. Similarly follow the same process of rest two apps




map a //;


 18  nodeapp1:

        Image: nodeapp

        environment: 

            -APPID=1111

  19 nodeapp2

        Image: nodeapp

        environment: 

            -APPID=2222


20  nodeapp3 

        Image: nodeapp

        environment: 

            -APPID=3333


Now run the docker compose command make sure to be on the right path when running the docker compose

21   The command is docker-compose up


22   Now go and hit localhost:8080


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




Explanation of attached  Document FRB-1 - that explains how to deploy nodejs using Docker container 

Step : 1  On the left you have nodejs App , on the right we have a
Docker Image
Step : 2 To install the nodejs application inside the docker image ( We need the nodejs binary to run our application
Step : 3 Next we have to install npm ( this will help us to install the dependency of the nodejs project
step :  4 copy source code meaning we will add the nodejs app code into the copy source code section
Step : 5 now we will install the npm modules
Step   6  we will expose the pose so that outside world can interact with docker container on the port
Step   7 Next step is to make the docker container file executable
Step   8 We will get a new docker image ( In this we will have nodejs application plus the other configuration changes we made



