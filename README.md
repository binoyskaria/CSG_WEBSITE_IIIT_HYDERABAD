steps to run <br>
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// <br>
1: RUN MONGODB SERVER (steps) <br>
    a: In terminal , type "sudo systemctl start mongod" <br>
    b: press enter <br>
       (run at any location its fine, mongodb community server should be installed to run this) <br>

2: START BACKEND SERVER (steps) <br>
    a: In terminal , go to ./backend folder of the project <br>
    b: type "node index.js" <br>
    c: press enter <br>
       (eg: binoy-skaria@ubuntu:~/Downloads/5_CSG_LAB-main/backend$ node index.js) <br>

3: ACCESS FRONTEND <br>
    a: open ./frontend/home/landingpage.html in browser <br>


NOTES <br>
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// <br>
1. In case of any MongoDB error , Check in line 12 of ./backend/index.js, make sure that the connection string is correct <br>
    
