const httpstatus = require("http-status");
const bcrypt = require("bcrypt");

const { CreateNewUserInDBServices } = require("./../service/User.Service");

async function CreateNewUserController(request, response) {
  try {
    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      response.status(httpstatus.BAD_REQUEST).json({
        success: false,
        message: "Email, Name and Password are required",
      });
      return;
    }

    const SALT = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, SALT);

    const result = await CreateNewUserInDBServices(
      name,
      email,
      encryptedPassword
    );
    if (!result.success) {
      throw new Error(
        "CreateNewUserInDBServices failed to return result of created user"
      );
    }

    response.status(httpstatus.CREATED).json({
      success: true,
      message: "Successfully user created",
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      succes: false,
      message: "Something went wrong when adding user",
    });
  }
}

module.exports = { CreateNewUserController };
