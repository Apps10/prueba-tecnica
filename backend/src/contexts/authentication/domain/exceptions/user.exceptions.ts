import { createCustomException } from "src/contexts/shared/custom-exception/custom-exception";

export const UserNotFoundException = createCustomException('UserNotFoundException');
export const UnauthorizedException = createCustomException('Unauthorized');
