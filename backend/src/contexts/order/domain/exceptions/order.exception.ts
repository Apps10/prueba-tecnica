import { createCustomException } from "src/contexts/shared/custom-exception/custom-exception";

export const OrderNotFoundException = createCustomException('OrderNotFoundException', 400, "Order Not Found");
export const OrderShouldHaveItemsException = createCustomException('OrderShouldHaveItemsException', 400, "The order must have at least one item");
export const OrderAlreadyProcessedException = createCustomException('OrderAlreadyProcessedException', 400, "The order already processed");
