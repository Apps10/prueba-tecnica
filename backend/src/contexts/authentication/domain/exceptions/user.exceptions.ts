import { createCustomException } from "src/contexts/shared/custom-exception/custom-exception";

export const UserNotFoundException = createCustomException('UserNotFoundException', 400);
export const UserUnauthorizedException = createCustomException('Unauthorized', 401);
export const UserAlreadyExistException = createCustomException('UserAlreadyExist', 400);
