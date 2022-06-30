export const checkCorrect = (value) => {
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) >= 21 && value.charCodeAt(i) < 48) return false;
    if (value.charCodeAt(i) >= 58 && value.charCodeAt(i) < 65) return false;
    if (value.charCodeAt(i) >= 91 && value.charCodeAt(i) < 97) return false;
    if (value.charCodeAt(i) >= 123 && value.charCodeAt(i) < 127) return false;
  }
  return true;
};
