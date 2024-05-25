const { successResponse, failureResponse } = require('../../utils/response')
const BookModel = require('../book/bookModel')

const getAllBooks = async (req, res, next) => {
    try {
        const result = await BookModel.find()
        if (!result) throw new failureResponse({ code: 404, message: "Data tidak ditemukan", res })
        successResponse({ code: 200, res, data: result })

    } catch (error) {
        next(error)
    }
}

const createBook = async (req, res, next) => {
    try {
        const { code, title, author, stock } = req.body;
        const result = await BookModel.create({ code, title, author, stock })
        if (!result) throw new failureResponse({ code: 400, message: "Data gagal disimpan", res })

        successResponse({ code: 201, res, data: result })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllBooks,
    createBook
}