const successResponse = ({ code, message, res, data }) => {
    const response = res.status(code).json({
        success: true,
        message: message ? message : "Data berhasil ditampilkan",
        data: data || [],
    })
    return response;
}
const failureResponse = ({ code, message, res, data }) => {
    const response = res.status(code).json({
        success: false,
        message: message ? message : "Data gagal ditampilkan",
        data: data || [],
    })
    return response;
}

module.exports = { successResponse, failureResponse }