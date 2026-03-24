export const truncateMiddle = (
  input: string,
  startChars = 6,
  endChars = 4,
): string => {
  if (input.length === 0) return input;

  if (input.length <= startChars + endChars) return input;

  const startPart = input.slice(0, startChars);
  const endPart = input.slice(input.length - endChars);

  return `${startPart}...${endPart}`;
};

export const truncate = (input: string, length = 10): string => {
  if (input.length <= length) return input;

  return `${input.slice(0, length)}...`;
};
