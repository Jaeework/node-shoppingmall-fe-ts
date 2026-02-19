declare module "react-credit-cards-2" {
  import type { FC } from "react";

  interface CardProps {
    cvc: string;
    expiry: string;
    focused?: string;
    name: string;
    number: string;
  }

  const Cards: FC<CardProps>;
  export default Cards;
}
