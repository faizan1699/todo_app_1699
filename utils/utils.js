export const generateOTP = (otpLength = 6) => {
  return String(Math.floor(Math.random() * 1000000)).padStart(otpLength, "0");
};

export const errorMessage = (res, error) => {
  return res.status(500).json({ message: error.message, status: false });
};
