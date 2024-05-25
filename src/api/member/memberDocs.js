const paths = {
    "/member": {
        "get": {
            "tags": ["Member"],
            "summary": "Get all members",
            "description": "Endpoint for Get All members",
            "responses": {
                "200": {
                    "description": "Success get all member",
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
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/memberSchemas"
                                        }
                                    }
                                }
                            },
                            "examples": {
                                "success": {
                                    "description": "Example success get all member",
                                    "value": {
                                        "success": true,
                                        "error_code": null,
                                        "message": "Data berhasil ditampilkan",
                                        "data": [
                                            {
                                                "_id": "string",
                                                "code": "string",
                                                "name": "string",
                                                "memberStatus": "string",
                                                "bookId": [],
                                                "totalBooksBorrowed": 0,
                                                "borrowDate": null,
                                                "dueDate": null,
                                                "returnDate": null,
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
            "tags": ["Member"],
            "summary": "Create new Member",
            "description": "Endpoint to Create Member",
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/CreateOrUpdateMember"
                        },
                    }
                }
            },
            "responses": {
                "201": {
                    "description": "Success create Member",
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
                                        "$ref": "#/components/schemas/memberSchemas"
                                    }
                                }
                            },
                        }
                    }
                }
            }
        }
    },
    "/borrow-books/{memberCode}": {
        "put": {
            "tags": ["Member"],
            "summary": "Update existing Member",
            "description": "Update existing Member in database",
            "parameters": [
                {
                    "name": "memberCode",
                    "in": "path",
                    "required": true,
                    "description": "Code Member",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "requestBody": {
                "required": true,
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/BorrowBooks"
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Success update Member",
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
                                        "$ref": "#/components/schemas/memberSchemas"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    },
    "/return-books/{memberCode}": {
        "put": {
            "tags": ["Member"],
            "summary": "Update existing Member",
            "description": "Update existing Member in database",
            "parameters": [
                {
                    "name": "memberCode",
                    "in": "path",
                    "required": true,
                    "description": "Code Member",
                    "schema": {
                        "type": "string"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Success update Member",
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
                                        "$ref": "#/components/schemas/memberSchemas"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
    }
}

const schemas = {
    "memberSchemas": {
        "type": "object",
        "properties": {
            "_id": {
                "type": "string"
            },
            "code": {
                "type": "string",
                "required": true,
            },
            "name": {
                "type": "String",
                "required": true,
            },
            "memberStatus": {
                "type": "String",
                "required": true,
            },
            "bookId": {
                "type": "Array",
                "items": {
                    "type": "string",
                },
                "default": []
            },
            "totalBooksBorrowed": {
                "type": "integer",
                "default": 0
            },
            "borrowDate": {
                "type": "Date",
                "default": null
            },
            "dueDate": {
                "type": "Date",
                "default": null
            },
            "returnDate": {
                "type": "Date",
                "default": null
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
    "ArrayMember": {
        "type": "array",
        "items": {
            "$ref": "#/components/schemas/memberSchemas"
        }
    },
    "CreateOrUpdateMember": {
        "type": "object",
        "properties": {
            "code": {
                "type": "string",
                "required": true,
            },
            "name": {
                "type": "string",
                "required": true,
            },
            "memberStatus": {
                "type": "string",
                "default": "active"
            },
            "bookId": {
                "type": "Array",
                "items": {
                    "type": "string",
                },
                "default": []
            },
            "totalBooksBorrowed": {
                "type": "integer",
                "default": 0
            },
            "borrowDate": {
                "type": "Date",
                "default": null
            },
            "dueDate": {
                "type": "Date",
                "default": null
            },
            "returnDate": {
                "type": "Date",
                "default": null
            },
        }
    },
    "BorrowBooks": {
        "type": "object",
        "properties": {
            "bookCode": {
                "type": "Array",
                "items": {
                    "type": "string",
                },
                "default": []
            },
            "dueDate": {
                "type": "Date",
                "default": null
            },
        }
    },
}

module.exports = {
    paths,
    schemas
}