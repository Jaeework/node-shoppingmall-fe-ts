import { type FocusEvent, type ChangeEvent } from "react";
import type { CardValue } from "../../../types";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Input from "../../../components/ui/atoms/input/Input";

interface PaymentFormProps {
  handleInputFocus: (e: FocusEvent<HTMLInputElement>) => void;
  cardValue: CardValue;
  handlePaymentInfoChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PaymentForm = ({
  handleInputFocus,
  cardValue,
  handlePaymentInfoChange,
}: PaymentFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div className="flex items-center justify-center">
        <Cards
          cvc={cardValue.cvc}
          expiry={cardValue.expiry}
          focused={cardValue.focus}
          name={cardValue.name}
          number={cardValue.number}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          type="tel"
          name="number"
          placeholder="Card Number"
          onChange={handlePaymentInfoChange}
          onFocus={handleInputFocus}
          required
          maxLength={16}
          value={cardValue.number}
        />
        <Input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handlePaymentInfoChange}
          onFocus={handleInputFocus}
          required
          value={cardValue.name}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="text"
            name="expiry"
            placeholder="MM/DD"
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            value={cardValue.expiry}
            maxLength={7}
          />
          <Input
            type="text"
            name="cvc"
            placeholder="CVC"
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            maxLength={3}
            value={cardValue.cvc}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
