export const validateInput = (inputValue: string, minLength: number = 1): boolean => {
    return inputValue.length >= minLength;
  };