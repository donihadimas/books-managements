const paths = {
    "/book": {
        "get": {
            "tags": ["Book"],
            "summary": "Get all Books",
            "description": "Endpoint for Get All Books",
            "responses": {
                "200": {
                    "description": "Success get all book",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "success": {
                                        "type": "boolean"
                                    },
                                    "error_code": {
                                        "type": "string",
                                        "nullable": true
                                    },
                                    "message": {
                                        "type": "string"
                                    },
                                    "data": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/bookSchemas"
                                        }
                                    }
                                }
                            },
                            "examples": {
                                "success": {
                                    "description": "Example success get all book",
                                    "value": {
                                        "success": true,
                                        "error_code": null,
                                        "message": "Data berhasil ditampilkan",
                                        "data": [
                                            {
                                                "_id": "string",
                                                "code": "string",
                                                "title": "string",
                                                "author": "string",
                                                "stock": 0,
                                                "createdAt": "2024-03-13T13:51:26.130Z",
                                                "updatedAt": "2024-03-13T13:51:26.130Z",
                                                "__v": 0
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "post": {
            "tags": ["Book"],
            "summary": "Create new Book",
            "description": "Endpoint to Create Book",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/CreateOrUpdateBook"
                        },
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Success create book",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "success": {
                                        "type": "boolean"
                                    },
                                    "message": {
                                        "type": "string"
                                    },
                                    "data": {
                                        "$ref": "#/components/schemas/bookSchemas"
                                    }
                                }
                            },
                        }
                    }
                }
            }
        }
    },
}

const schemas = {
    "bookSchemas": {
        "type": "object",
        "properties": {
            "_id": {
                "type": "string"
            },
            "code": {
                "type": "string",
                "required": true,
            },
            "title": {
                "type": "String",
                "required": true,
            },
            "author": {
                "type": "String",
                "required": true,
            },
            "stock": {
                "type": "integer",
                "required": true,
            },
            "createdAt": {
                "type": "string"
            },
            "updatedAt": {
                "type": "string"
            },
            "__v": {
                "type": "integer"
            }
        }
    },
    "ArrayBook": {
        "type": "array",
        "items": {
            "$ref": "#/components/schemas/bookSchemas"
        }
    },
    "CreateOrUpdateBook": {
        "type": "object",
        "properties": {
            "code": {
                "type": "string",
                "required": true,
            },
            "title": {
                "type": "string",
                "required": true,
            },
            "author": {
                "type": "string",
                "required": true,
            },
            "stock": {
                "type": "integer",
                "required": true,
            },
        }
    },
}

module.exports = {
    paths,
    schemas
}