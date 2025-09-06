export function isValidEmail(email: string): boolean {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}
