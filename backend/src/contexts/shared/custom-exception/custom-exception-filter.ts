import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { UserAlreadyExistException, UserNotFoundException, UserUnauthorizedException } from 'src/contexts/authentication/domain/exceptions/user.exceptions';
import { OrderNotFoundException, OrderShouldHaveItemsException } from 'src/contexts/order/domain/exceptions/order.exception';
import { ProductNotFoundException, ProductWithoutStockException } from 'src/contexts/products/domain/exceptions/product.exceptions';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();


    const handledErrors = [
      UserAlreadyExistException,
      UserNotFoundException,
      UserUnauthorizedException,
      ProductNotFoundException,
      ProductWithoutStockException,
      OrderNotFoundException,
      OrderShouldHaveItemsException, 
    ];

    if (handledErrors.some(errType => exception instanceof errType)) {
      return response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        message: exception.messageError,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }



    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
