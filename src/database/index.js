const mongoose = require('mongoose');

const urlDb = 'mongodb://localhost:27017/book-management';
const connectToDB = async () => {
    try {
        await mongoose.connect(urlDb);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectToDB;