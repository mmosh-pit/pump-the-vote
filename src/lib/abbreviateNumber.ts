export function abbreviateNumber(number: number) {
  if (number === 0) return number.toString();

  const abbreviations = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(Math.abs(number)) / 3);

  if (tier === 0) {
    return number.toString();
  }

  const scaledNumber = number / Math.pow(10, tier * 3);
  const abbreviation = abbreviations[tier];

  return scaledNumber.toFixed(2) + abbreviation;
}
