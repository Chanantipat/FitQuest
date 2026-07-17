const axios = require("axios");
const GAS_URL = "https://script.google.com/macros/s/AKfycbxzAfUZSwl17Rga2UyIXLro_ZlrFgjl2O8rm-nSKiuxHVQbXjhvEsWI7AB1lSbu2Oy1Rw/exec";
const getAllUsers = async (req, res) => {
    try {
        const response = await axios.get(`${GAS_URL}?action=getUsers`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving users"
        });
    }
};
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(
            `${GAS_URL}?action=getUser&id=${id}`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "Error getting user"
        });
    }
};
const createUser = async (req, res) => {
    try {
        const user = req.body;
        const response = await axios.post(
            GAS_URL,
            {
                action:"createUser",
                data:user
            }
        );
        res.status(201).json({
            message:"User created successfully",
            id: response.data.id
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message:"Error creating user"
        });
    }
};
const updateUser = async (req,res)=>{
    try{
        const id = req.params.id;
        const user = req.body;
        const response = await axios.post(
            GAS_URL,
            {
                action:"updateUser",
                id:id,
                data:user
            }
        );
        res.json({
            message:"User updated successfully"
        });
    }catch(error){
        res.status(500).json({
            message:"Error updating user"
        });
    }
};
const deleteUser = async(req,res)=>{
    try{
        const id = req.params.id;
        await axios.post(
            GAS_URL,
            {
                action:"deleteUser",
                id:id
            }
        );
        res.json({
            message:"User deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            message:"Error deleting user"
        });
    }
};
const getUserByUsername = async (req, res) => {
    try {
        const username = req.params.username;

        const response = await axios.get(
            `${GAS_URL}?action=getUserByUsername&username=${encodeURIComponent(username)}`
        );

        if (!response.data) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(response.data);

    } catch (error) {
        console.error(
            "GET USER BY USERNAME ERROR =",
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Cannot find user"
        });
    }
};
module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser
};