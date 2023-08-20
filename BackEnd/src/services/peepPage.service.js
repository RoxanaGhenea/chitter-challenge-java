import PeepDetails from "../models/peep.model.js";
import mongoose from "mongoose";


export const addPeep = async newPeepData => {
    try {
        const newPeep = new PeepDetails(newPeepData);
        return await newPeep.save();
    } catch (e) {
        throw e
    }
}

export const editPeep = async editedPeepData => {
    try {
        const currentPeep = await PeepDetails.findById(editedPeepData._id);
        return await currentPeep.updateOne(editedPeepData);
    } catch (e) {
        throw e
    }
}

export const deletePeep = async peepDataId => {
    try {
        const currentPeep = await PeepDetails.findById(peepDataId);
        return await currentPeep.deleteOne();
    } catch (e) {
        throw e
    }
}

export const getAllPeeps = async () => {
    try {
        return await PeepDetails.find({});
    } catch (e) {
        throw e;
    }
}