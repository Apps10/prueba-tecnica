import { createCustomException } from "src/contexts/shared/custom-exception/custom-exception";

export const ProductNotFoundException = createCustomException('ProductNotFoundException', 404, `Product Not Found`);
export const ProductWithoutStock = createCustomException('ProductWithoutStock', 400, `Product Without Stock`);
