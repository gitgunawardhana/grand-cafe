import express from "express";
import Unreg from "../models/Unreg.js";


export const view = async (req, res, next) => {
    try {
      // Extract the userId from the URL parameters
      const { userCode } = req.params;
      console.log(userCode);
      // Query the database to find the address for the provided userId
      const Address = await Unreg.findOne({ userCode });
        console.log(Address);
      if (!Address) {
        console.log(Address);
        // If no address is found for the given userId, return an appropriate response
        return res.status(404).json({ error: "Address not found" });
      }
  
      // If an address is found, return it in the response
      res.status(200).json({ data: Address.address, message: "Success" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

export const addUserDetails = async (req, res, next) => {
    try {
        // Get user details from the request body
        const { address } = req.body;
    
        // Create a new User document with the provided address
        const user = new Unreg({ address });
    
        // Save the user to the database, which will automatically generate the userCode
        await user.save();
    
        // Respond with the newly created user document
        res.status(201).json({ user, userCode: user.userCode });

      } catch (error) {
        // Handle any errors and send an error response
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
  };

  export const getAddressByID = async (req, res) => {
    try {
      const { userCode } = req.body;
      console.log("cham",userCode);
      const user = await Unreg.findOne({ userCode : userCode });
  
      if (!user) {
        res.status(404).json({ message: "Address not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }; 