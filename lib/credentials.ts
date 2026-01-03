export function generateLoginId(email: string) {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return email.split("@")[0] + rand;
}

export function generatePassword() {
  return Math.random().toString(36).slice(-8);
}
