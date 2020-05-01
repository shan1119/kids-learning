# kids-learning
training


2020.04.06 
1. create new instance
2. reuse old instance
3. view history

2020.04.08
1. create schema for template/instance/history
2. use controller to separate process
3. initial template if there is no record.

* collection's name is plural. eg: templates/instances/histories

2020.04.10
1. add timer for test.
2. set font color on point and cost in history page.

2020.04.17
1. add draft 3d chart

2020.04.18
1. add guess number
2. change init for adding new template

2020.04.28
1. add unit conversion case as template:4
2. move latest instance to top

2020.05.02
1. add Dockerfile
  1.1. prepare images.
    docker build -t training-img .
    docker pull mongo
    docker pull mongo-express
  1.2. create containers
    docker run -itd --name mongo mongo 
    docker run -itd --name my -p 3001:3000 --link mongo:mongo training-img nodemon
    docker run -itd --name mongo-express -p 8081:8081 --link mongo:mongo mongo-express
  1.3. services
    http://localhost:3001/
    http://localhost:8081/
2. add docker-compose.yml
  2.1. docker-compose up -d
  2.2. docker-compose down



