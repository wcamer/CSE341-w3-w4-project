const swaggerAutoGen = require('swagger-autogen')
const doc = {
    info: {
        title: "Project 2 API",
        description: "This is the api for Cars and Games"
    },
    host:'cse341-w3-w4-project.onrender.com',
    schemes:['https']
    // host: ['localhost:5500'],
    // schemes: ['http','https']
    
}

const outputFile = './project2-swagger-output.json'
const routes = ['./routes/index']

swaggerAutoGen(outputFile,routes,doc)