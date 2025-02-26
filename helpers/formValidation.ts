export const validateEmail = (email: string) => {
  if (!email) {
    return "Email cannot be empty.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email address.";
  }
  return false;
};

export const validateName = (name: string) => {
  console.log("why not", name);

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!name) {
    return "name cannot be empty.";
  }

  if (!nameRegex.test(name)) {
    return "Name must contain only letters and spaces.";
  }
  return false;
};

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must include at least 1 lowercase letter.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include at least 1 uppercase letter.";
  }
  if (!/\d/.test(password)) {
    return "Password must include at least 1 number.";
  }
  if (!/[!@#$%^&*()_\-+=<>?{}[\]~]/.test(password)) {
    return "Password must include at least 1 special character.";
  }
  return false;
};
