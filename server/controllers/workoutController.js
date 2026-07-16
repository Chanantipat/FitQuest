const axios = require("axios");
const GAS_URL = "https://script.google.com/macros/s/AKfycbxzAfUZSwl17Rga2UyIXLro_ZlrFgjl2O8rm-nSKiuxHVQbXjhvEsWI7AB1lSbu2Oy1Rw/exec";
const getAllWorkouts = async (req, res) => {
    try {
        const response = await axios.get(
            `${GAS_URL}?action=getWorkouts`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving workouts"
        });
    }
};
const createWorkout = async (req, res) => {
    try {
        const workout = req.body;
        const response = await axios.post(
            GAS_URL,
            {
                action:"createWorkout",
                data:workout
            }
        );
        res.json({
            message:"Workout created successfully",
            data:response.data
        });
    } catch(error){
        res.status(500).json({
            message:"Error creating workout"
        });
    }
};
const updateWorkout = async (req,res)=>{
    try{
        const id = req.params.id;
        const workout = req.body;
        await axios.post(
            GAS_URL,
            {
                action:"updateWorkout",
                id:id,
                data:workout
            }
        );
        res.json({
            message:"Workout updated successfully"
        });
    }catch(error){
        res.status(500).json({
            message:"Error updating workout"
        });
    }
};
const deleteWorkout = async(req,res)=>{
    try{
        const id = req.params.id;
        await axios.post(
            GAS_URL,
            {
                action:"deleteWorkout",
                id:id
            }
        );
        res.json({
            message:"Workout deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            message:"Error deleting workout"
        });
    }
};
module.exports = {
    getAllWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout
};