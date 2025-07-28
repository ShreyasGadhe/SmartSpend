export const Currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "INR", label: "₹ Rupee", locale: "en-IN" },
  { value: "JPY", label: "¥ Yen", locale: "ja-JP" },
];

export type Currency = (typeof Currencies)[0];
