import Passcode from "../models/Passcode.js";

export const createPasscode = async (req, res, next) => {
  const { passcode, expiresInMinutes } = req.body;
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + expiresInMinutes);

  try {
    const newPasscode = new Passcode({
      passcode,
      expiresAt: expirationDate,
    });
    await newPasscode.save();
    res.status(201).json(newPasscode);
  } catch (error) {
    res.status(500).json({ error: "Error creating passcode" });
  }
};

export const checkExpiration = async (req, res, next) => {
  const passcodeId = req.params.passcodeId;

  try {
    const passcode = await Passcode.findOne({ passcode: passcodeId });
    if (!passcode) {
      return res.status(404).json({ error: "Passcode not found" });
    }
    console.log(passcode);

    const currentTime = new Date();
    console.log(currentTime);
    console.log(passcode.expiresAt);

    if (passcode.expiresAt <= currentTime) {
      res.status(200).json({ expired: true });
    } else {
      res.status(200).json({ expired: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking passcode expiration" });
  }
};
