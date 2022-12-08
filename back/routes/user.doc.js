// Informations envoyées à documentations dans helper :
// Ceci est réalisé dans le but de partager le code afin que documentations ne soit pas surchargé et de separer la logique.



const listUsers = {

    tags: ["Users"],
    description: "List of users",

    responses: {
        200: {
             description: "OK",
             content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example : {
                            user: [],
                        },
                    },
                },
            },
        },
    },
    
}





// Exemple de réponse renvoyée (que l'on va intégrer ds resp-user) :

const user = [{
    id: "8d7f4g1ad1-2584-5r85g-h545-456fd454ze545",
    name: "franck",
}];


const getUserById = {

    tags: ["Users"],
    summary: "Find user by id",
    description: "Return a single user",
    operationId: "getUserById",
    parameters: [
        {
            name: "id",
            in: "params",
            description: "id of the user",
            type: "string",
            example: "8d7f4g1ad1-2584-5r85g-h545-456fd454ze545",
        }
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example : {
                            user: [user],
                        }
                    }
                }
            }
        },
        400: {
            description: "User not"
        }
    }
}


const CreateUser = {

    tags: ["Users"],
    description: "create a user",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        firstname: {
                            type: "string",
                            description: "Firstame of the user",
                            example: "Obama",
                        },
                        lastname: {
                            type: "string",
                            description: "Lastname of the user",
                            example: "Barack",
                        },
                        email: {
                            type: "string",
                            description: "Email of the user",
                            example: "obama@usagvt.com",
                        },
                        password: {
                            type: "string",
                            description: "Password of the user",
                            example: "Wecan2023",
                        }

                    }
                }
            }

        }
    },
    
    responses: {

        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example : {
                            user: [6],
                        }
                    }
                }
            }
        }


    }

};


const getUserByPathId = {
    tags: ["Users"],
    summary: "Find user by path id",
    description: "getUserById",
    parameters: [
        {
            name: "id",
            in: "path",
            description: "id of the user",
            type: "string",
            example: "8d7f4g1ad1-2584-5r85g-h545-456fd454ze545",
        }
    ],
    responses: {
        200: {
            description: "OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example : {
                            user: [user],
                        }
                    }
                }
            }
        },
        400: {
            description: "User not"
        }
    }
}


// Envoi des differentes routes a Helper/documentations :

const userRouteDoc = {
    "/Users": {
        get: listUsers,
        post: CreateUser,
    },

    "/users/:id": {
    get: getUserById,
    },

    "/users/{id}": {
        get: getUserByPathId,
    },

};

module.exports = userRouteDoc;