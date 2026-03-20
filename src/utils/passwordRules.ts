export const isPasswordStrong = (pwd: string) => {
  if (!pwd) return false;
  const length = pwd.length >= 8;
  const lower = /[a-z]/.test(pwd);
  const upper = /[A-Z]/.test(pwd);
  const digit = /[0-9]/.test(pwd);
  const special = /[^A-Za-z0-9]/.test(pwd);
  return length && lower && upper && digit && special;
};