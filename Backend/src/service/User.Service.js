const UserModel = require("./../Model/User.Model");

async function CreateNewUserInDBServices(name, email, encryptPassword) {
  try {
    const result = await UserModel.create({
      name,
      email,
      password: encryptPassword,
    });

    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      throw new Error("CreateNewUserInDBServices unable to create user");
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

module.exports = { CreateNewUserInDBServices };
