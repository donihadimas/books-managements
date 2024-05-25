const errorHandler = require('../../middleware/error-handler')
const { successResponse, failureResponse } = require('../../utils/response')
const MemberModel = require('../member/memberModel')
const BookModel = require('../book/bookModel')

const getAllMembers = async (req, res, next) => {
    try {
        const result = await MemberModel.find()
            .populate({
                path: 'bookId',
                select: 'code title author',
            })
        if (!result) throw errorHandler({ message: 'Data not found', code: 404 })
        successResponse({ code: 200, res, data: result })

    } catch (error) {
        next(error)
    }
}
const createMember = async (req, res, next) => {
    try {
        const { code, name, memberStatus, bookId, totalBooksBorrowed, borrowDate, dueDate, returnDate } = req.body;
        const result = await MemberModel.create({ code, name, memberStatus, bookId, borrowDate, dueDate, returnDate })
        if (!result) throw new failureResponse({ code: 400, message: "Data gagal disimpan", res })

        successResponse({ code: 201, res, data: result })
    } catch (error) {
        next(error)
    }
}

const borrowBooks = async (req, res, next) => {
    try {
        const { memberCode } = req.params;
        const { bookCode, dueDate } = req.body;
        const currentDate = new Date();
        // cari dan cek data member
        const member = await MemberModel.findOne({ code: memberCode });
        if (!member) {
            throw failureResponse({ code: 404, message: "Member tidak Ditemukan", res });
        }

        // cek member status tidak dalam banned atau penalized
        if (member.memberStatus !== "active") {
            throw failureResponse({ code: 400, message: "Member sedang dalam hukuman, tidak bisa meminjam buku", res });
        }
        if (member.bookId.length > 2) {
            throw failureResponse({ code: 400, message: "Member sudah meminjam 2 buku, tidak bisa meminjam", res });
        }
        if (new Date(member.penaltyDueDate).getTime() > currentDate.getTime()) {
            throw failureResponse({ code: 400, message: `Status Member masih dalam hukuman sampai ${member.penaltyDueDate}, Tidak Dapat Meminjam Buku`, res });
        }
        // cek kode buku jika tidak ada return
        if (!bookCode || bookCode.length === 0) {
            throw failureResponse({ code: 400, message: "Kode buku tidak boleh kosong", res });
        }
        if (bookCode.length > 2) {
            throw failureResponse({ code: 400, message: "Buku yang di pinjam tidak boleh lebih dari 2 buku", res });
        }

        // cari buku berdasarkan code buku dan cek stock buku
        const books = await Promise.all(bookCode.map(async (code) => {
            const book = await BookModel.findOne({ code });
            if (!book) {
                throw failureResponse({ code: 404, message: "Buku tidak Ditemukan", res });
            }
            if (book.stock <= 0) {
                throw failureResponse({ code: 400, message: `Stok buku ${book.title} habis, Sedang dipinjam`, res });
            }
            return book;
        }));

        // Update data member
        const result = await MemberModel.findOneAndUpdate(
            { code: memberCode },
            { $push: { bookId: { $each: books.map(book => book._id) } }, totalBooksBorrowed: books.length, borrowDate: Date.now(), dueDate },
            { new: true, runValidators: true }
        );

        // Update stok buku
        await Promise.all(books.map(async (book) => {
            await BookModel.findOneAndUpdate(
                { _id: book._id },
                { $inc: { stock: -1 } }
            );
        }));

        successResponse({ code: 201, res, message: "Data buku berhasil dipinjam", data: result });
    } catch (error) {
        next(error);
    }
};

const returnBooks = async (req, res, next) => {
    try {
        const { memberCode } = req.params;

        // cari dan cek data member
        const member = await MemberModel.findOne({ code: memberCode });
        const bookIds = member.bookId;
        if (!member) {
            throw failureResponse({ code: 404, message: "Member tidak Ditemukan", res });
        }

        // Cek apakah member memiliki buku yang dipinjam
        if (member.bookId.length === 0) {
            throw failureResponse({ code: 400, message: "Member tidak memiliki buku yang dipinjam", res });
        }

        const currentDate = new Date();
        const dueDate = new Date(member.dueDate);
        const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        const ThreeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;
        const penaltyDueDate = currentDate.getTime() > (dueDate.getTime() + sevenDaysInMilliseconds) ? new Date(Date.now() + ThreeDaysInMilliseconds) : null

        const result = await MemberModel.findOneAndUpdate(
            { code: memberCode },
            { $set: { bookId: [], totalBooksBorrowed: 0, borrowDate: null, dueDate: null, returnDate: Date.now(), penaltyDueDate } },
            { new: true, runValidators: true }
        );

        // Perbarui stok buku yang dikembalikan
        await BookModel.updateMany(
            { _id: { $in: bookIds } },
            { $inc: { stock: 1 } }
        );



        if (currentDate.getTime() > (dueDate.getTime() + sevenDaysInMilliseconds)) {
            successResponse({ code: 201, res, message: "Pengembalian Terlambat, Member Terkena Denda dan Penalty 3 hari tidak dapat meminjam buku" });
        } else {
            successResponse({ code: 201, res, message: "Data buku berhasil dikembalikan", data: result });
        }
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getAllMembers,
    createMember,
    borrowBooks,
    returnBooks
}