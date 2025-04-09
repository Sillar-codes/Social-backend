import validator from "validator";
import { LoginType, RegisterType } from "../../types/user";

export const validateLoginInput = (data: LoginType) => {
  const error: Partial<LoginType> = {};
  if (!validator.isEmail(data.email)) error.email = "This email is invalid";
  if (validator.isEmpty(data.password)) error.password = "Password is required";
  return {
    isValid: Object.keys(error).length === 0,
    error: error,
  };
};

export const validateRegisterInput = (data: RegisterType) => {
  const error: Partial<RegisterType> = {};
  if (validator.isEmpty(data.name)) error.name = "Name is required";
  if (!validator.isEmail(data.email)) error.email = "Email is invalid";
  if (!validator.isLength(data.password, { min: 6 }))
    error.password = "Password should be longer than 6 letters";
  if (data.password !== data.confirmPassword)
    error.confirmPassword = "Reconfirm password";
  return {
    isValid: Object.keys(error).length === 0,
    error: error,
  };
};
