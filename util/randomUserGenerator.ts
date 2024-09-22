export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function generateRandomEmail() {
  const domain = ["gmail.com", "yahoo.com", "example.com"];
  return `${generateRandomString(10)}@${
    domain[Math.floor(Math.random() * domain.length)]
  }`;
}

export function generateRandomUser() {
  return {
    name: generateRandomString(8),
    email: generateRandomEmail(),
    password: generateRandomString(12),
  };
}
