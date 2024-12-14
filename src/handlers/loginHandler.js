const loginController = require("../controllers/loginController");
const validateUser = require("../middlewares/validateUser");

const sendErrorResponse = (res, error, statusCode) => {
  res.status(statusCode).send({ Error: error.message });
};

const login = async (req, res) => {
  const toValidate = ({
    email,
    password
  } = req.body);
  const { error } = validateUser.loginValidation.validate(toValidate);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  try {
    const response = await loginController.login(email, password);
    res.send(response);
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode);
  }
};

const changePasswordHandler = async (req, res) => {
  try {
    const { id: userId, password: oldPassword, newPassword } = req.body;

    const { error } = validateUser.changePasswordValidation.validate({ userId, oldPassword, newPassword });
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    };

    const response = await loginController.changePassword({ userId, oldPassword, newPassword });
    res.status(200).send(response);  
  } catch (error) {
    sendErrorResponse(res, error, error.statusCode || 500);
  }
};

const loginHandler = {
    login,
    changePasswordHandler,   
};

module.exports = loginHandler;