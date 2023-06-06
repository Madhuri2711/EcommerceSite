import UserModel from "../models/website/users";
class AdminService {

  login = async (email, password) => {
    return await UserModel.findOne({
      $or: [
        {
          email,
        },
        {
          userName: email,
        },
      ],
      password,
      isActive: true,
    });
  };

  getAdmin = async () => {
    return await UserModel.find({
      is_admin: true,
    });
  };

  update = async (id, data) => {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  };

  forgotPassword = (email) => {
    return UserModel.findOne({
      email,
      isActive: true,
      is_admin: true,
    });
  };

  forgotPasswordChange = (token, password) => {
    return UserModel.findOneAndUpdate(
      {
        token,
      },
      {
        password,
      },

      { new: true }
    );
  };

  verifyToken = async (email,password) => {
  
    return await UserModel.findOne({
      $or: [
        {
          email,
        },
        {
          userName: email,
        },
      ],
      password,
      isActive: true,
    });
  };

   
}

export default AdminService;
