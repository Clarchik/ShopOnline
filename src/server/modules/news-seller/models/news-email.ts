import mongoose from 'mongoose';

const NewsEmailSchema = new mongoose.Schema({
    email: String
});

const NewsEmail = mongoose.model('NewsEmails', NewsEmailSchema);
export default NewsEmail;
