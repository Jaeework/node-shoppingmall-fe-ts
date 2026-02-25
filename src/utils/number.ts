export const currencyFormat = (value: number): string => {
  const number = value !== undefined ? value : 0;
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export const cc_expires_format = (string: string): string => {
  return string
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
};

export const phone_format = (value: string): string => {
  const numbers = value.replace(/[^0-9]/g, "");

  if (numbers.length <= 3) {
    return numbers;
  }
  if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};
