const booksDoc = require('../api/book/bookDocs')
const memberDoc = require('../api/member/memberDocs')

const documentations = {
    "openapi": "3.1.0",
    "info": {
        "title": "Books Management RESTful API Documentations v1",
        "version": "1.0.0",
        "description": "RESTful API Documentations for Books Management SuperApps",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "Doni Hadimas",
            "email": "donihadimas.dev@gmail.com"
        },
        "license": {
            "name": "APACHE 2.0",
            "url": "https://www.apache.org/licenses/LICENSE-2.0"
        }
    },
    "servers": [
        {
            "url": "http://localhost:3000/api/v1",
            "description": `The Book Management API server`,
            "variables": {
                "basePath": {
                    "default": "api/v1"
                }
            }
        }
    ],
    "paths": {
        ...booksDoc.paths,
        ...memberDoc.paths,
    },
    "components": {
        "parameters": {
            "Id": {
                "name": "id",
                "in": "path",
                "required": true,
                "description": "id for updated",
                "schema": {
                    "type": "string"
                }
            },
        },
        "schemas": {
            ...booksDoc.schemas,
            ...memberDoc.schemas,
        }
    }
}

module.exports = {
    documentations
}