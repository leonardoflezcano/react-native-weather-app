import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const saltRounds = 10; // El número de veces que bcrypt ejecutará el algoritmo de hash
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  };