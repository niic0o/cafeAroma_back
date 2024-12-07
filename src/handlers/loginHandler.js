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

const loginHandler = {
    login
};

module.exports = loginHandler;