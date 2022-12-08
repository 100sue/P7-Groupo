// création de la documentation avec swagger.
// Partage de la logique afin que le code ne soit pas surchargé, compréhensible, lisible (en cas de multiples get/post/put).
// Donc, création de user.doc.js.


const userRouteDoc = require("../routes/user.doc");

const swaggerDocumentation = {
    openapi: "3.0.0",

    info: {
        title: "Scoreur App",
        version: "0.0.3",
        description: " In the third iteration of the Scoreur App, we've switched to the design first approach! You can now help us improve the API whether it's by making changes to the definition itself or to the code. That way, with time, we can improve the API in general, and expose some of the new features in OAS3.",  
    },

    servers: [
        {
            url: "http://localhost:27107",
            description: "Local dev",
        },
        {
            url: "http://localhost:27107",
            description: "Production dev",
        }
    ],

    tags: [
        {
            name: "Users",
            description: "User routes",
        },
    ],

    paths: {
        ...userRouteDoc,
    } 
};

module.exports = swaggerDocumentation;