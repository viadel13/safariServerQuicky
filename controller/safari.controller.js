const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


const generateNumericId = () => {
  let numericId = '';
  for (let i = 0; i < 4; i++) {
    numericId += Math.floor(Math.random() * 10); // Génère un chiffre aléatoire entre 0 et 9
  }
  return numericId;
};

const OTP = async (req, res) => {
  const numericId = generateNumericId();
  res.json({ numericId: numericId });
};

const token = async (req, res) => {
  res.json({ jeton: uuidv4() });
};

module.exports = {
  OTP,
  token
};
