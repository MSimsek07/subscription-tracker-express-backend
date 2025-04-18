1 - npx express-generator --no-view --git ./

2 - npm install --save-dev nodemon
    Configure name, verion, type ("type": "module", for ES6 import export syntax) scripts in packge.json

3 - npx eslint --init
    √ What do you want to lint? · javascript
    √ How would you like to use ESLint? · problems and ..
    √ What type of modules does your project use? · esm
    √ Which framework does your project use? · none
    √ Does your project use TypeScript? · no
    √ Where does your code run? · node
        The config that you've selected requires the following dependencies:  eslint, @eslint/js, globals
    √ Would you like to install them now? Yes
    √ Which package manager do you want to use? · npm

4 - npm install dotenv
    Set config folder and put env.js, 
    Create .env.development.local and .env.production.local

5 - Define dev port in .env.development.local (PORT=5500)

6 - Use config in app.js by importing the PORT

7 - Make sure you added .en.*.local to the .gitignore

8 - Now lets set our routes(endpoints)
    Create a folder named routes,
    Define your routes inside here(eg. auth.routes.js)
    After creating your routes make sure you import them in app.js

9 - Now its time to choose a data base for the application. We are going with MongoDB Atlas. Go and create your db on the web (make sure you dont put special characters to password), grab your connection string and install required packages (npm install mongodb mongoose)

10 - Put the connection string to .env.development.local and export it in the env.js file

11 - Then create a new directory for database connection and create mongodb.js file. After you configure connection call it in the app.js file when you listen the port.

12 - Now its time to create models(blue prints of our datas, its name is changing for every tech stack but I call tem blueprints). Example model = user.model.js 

13 - After creating your models, we need to create a centrilazed error handling system to track errors. (Error handling middleware). This will help us to identify some bugs and improve our debugging journey. There are some built-in middlewares are coming from express too(cookieParser, urlencoded, json parser etc.). Make sure you imported your error handling middleware in the app.js and use them.

14 - Now its time to set up our authentication. Lets install some packeges: npm install jsonwebtoken bcryptjs. After installation move on to the .env.development.loacal to set new variables JWT_SECRET and JWT_EXPIRES_IN

15- After all of those stuff now we can finally write our logic, I mean controllers... Create a new directory called controllers and put your controllers in it(exp auth.controller.js)



