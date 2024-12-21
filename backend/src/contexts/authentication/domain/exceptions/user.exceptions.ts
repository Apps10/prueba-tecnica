import { createCustomException } from "src/contexts/shared/custom-exception/custom-exception";

export const UserNotFoundException = createCustomException('UserNotFoundException', 400, "User Not Found");
export const UserUnauthorizedException = createCustomException('Unauthorized', 401, "Unauthorized");
export const UserAlreadyExistException = createCustomException('UserAlreadyExist', 400, "User Already Register");
