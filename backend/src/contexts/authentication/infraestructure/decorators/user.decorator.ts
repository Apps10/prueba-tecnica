import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    if (!request.userId) {
      throw new InternalServerErrorException("User Not found in request (AuthGuard called?)")
    }

    return request.userId;
  }
)