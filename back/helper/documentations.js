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
        }
    ] 
};

module.exports = swaggerDocumentation;