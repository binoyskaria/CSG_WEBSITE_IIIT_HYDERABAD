steps to run
===============
1: RUN MONGODB SERVER (steps)
    a: In terminal , type "sudo systemctl start mongod" <br>
    b: press enter <br>
       (run at any location its fine, mongodb community server should be installed to run this)

2: START BACKEND SERVER (steps)
    a: In terminal , go to ./backend folder of the project
    b: type "node index.js"
    c: press enter
       (eg: binoy-skaria@ubuntu:~/Downloads/5_CSG_LAB-main/backend$ node index.js)

3: ACCESS FRONTEND
    a: open ./frontend/home/landingpage.html in browser


NOTES
===============
1. In case of any MongoDB error , Check in line 12 of ./backend/index.js, make sure that the connection string is correct
    
