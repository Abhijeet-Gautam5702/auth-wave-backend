import { ZEmail, ZPassword, ZUsername } from "./zod.schema";
import { ISignupInput, IValidateSignupInput } from "../types/types";

export const validateSignupInput = (
  input: ISignupInput
): IValidateSignupInput => {
  let isUsernameValid;
  if (input.username) {
    isUsernameValid = ZUsername.safeParse(input.username);
  }
  const isEmailValid = ZEmail.safeParse(input.email);
  const isPasswordValid = ZPassword.safeParse(input.password);

  let errors: any[] = [];

  if (!isEmailValid.success) {
    isEmailValid.error.errors.map((item) => {
      errors.push(item);
    });
  }
  // Admin Signup structure doesn't have username, hence it is an optional field
  if (!isUsernameValid?.success) {
    isUsernameValid?.error.errors.map((item) => {
      errors.push(item);
    });
  }
  if (!isPasswordValid.success) {
    isPasswordValid.error.errors.map((item) => {
      errors.push(item);
    });
  }

  return {
    success: errors.length > 0 ? false : true,
    errors,
  };
};
