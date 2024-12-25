import { createCustomException } from "src/contexts/shared/custom-exception/custom-exception";

export const PaymentErrorException = createCustomException('PaymentErrorException', 400, "we have a trouble with your pay");
