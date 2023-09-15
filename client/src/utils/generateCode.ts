function generateRandomCode() {
  const min = 100000; // Minimum 6-digit number (100000)
  const max = 999999; // Maximum 6-digit number (999999)

  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomCode.toString(); // Convert to string if needed
}

export { generateRandomCode };
