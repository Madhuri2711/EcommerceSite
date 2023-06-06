import CommentModel from '../models/comment.js';
import UserModel from '../models/users.js';

class CommentService {
    add = (data) => {
        return CommentModel.create(data);
    };

    update = (id, data) => {
        return CommentModel.findByIdAndUpdate(id, data, { new: true })
    };

    getUserInfo = (_id) => {
        return UserModel.findOne({
            _id
        });
    };
}

export default CommentService;
