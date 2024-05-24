require('dotenv').config();
const User = require('../models/user.model.js');
const SendOrders = require('../models/sendOrders.model.js');
const jwt = require('jsonwebtoken');

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

const addPhone = async (req, res) =>{
  try {
    const { phone } = req.body; 
    const existingUser = await User.findOne({phone}) ;

    if(existingUser){
      console.log(existingUser)
      return res.status(200).json({ message: "Ce numéro de téléphone est déjà utilisé." });
    }else{
      return res.status(200).json({ message: "Ce numéro de téléphone est disponible." });
    }

  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const addUser = async (req, res) =>{
  try {
    const { phone, name, password, confirmPassword } = req.body; 
    const existingUser = await User.create({
      phone,
      name,
      password,
      confirmPassword
    }) ;

    return res.status(200).json({ existingUser});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const login = async (req, res) =>{
  try {
    const { phone, password } = req.body; 
    const existingUser = await User.findOne({phone, password}) ;

    if (!existingUser) {
      console.log(existingUser)
      return res.status(200).json({ message: "Combinaison numéro de téléphone/mot de passe incorrecte." });
    }

    const token =  jwt.sign({userId: existingUser._id}, process.env.SECRET_JWT, {expiresIn: 60});

    existingUser.token = token+
    await existingUser.save();

    return res.status(200).json({existingUser});

  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getToken = async (req, res)=>{
  const { phone } = req.params
  try {
    const token = await User.findOne({phone});
    console.log(token.token);
  } catch (error) {
    
  }
};

const user = async (req, res)=>{
  try {
    const user = await User.find();
    return res.status(200).json({user});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const orders = async (req, res)=>{
  const {datasSend, datasReceve, details, code } = req.body
  try {
    const response = await SendOrders.create({
      send: datasSend,
      receive: datasReceve,
      features: details,
      code: code,
    });
    return res.status(200).json({response});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getOrders = async (req, res)=>{
  try {
    const response = await SendOrders.find({});
    return res.status(200).json({response});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const getOrdersId = async (req, res)=>{
  try {
    const {code} = req.params
    const response = await SendOrders.findOne({code});
    return res.status(200).json({response});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}



module.exports = {
  OTP,
  addPhone,
  addUser,
  login,
  getToken,
  user,
  orders,
  getOrders,
  getOrdersId,

};
