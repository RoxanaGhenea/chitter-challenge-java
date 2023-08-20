import UserDetails from "../models/user.model.js";

export const addUser = async newUserData => {
    try {
        const newUser = new UserDetails(newUserData);
        return await newUser.save();
    } catch (e) {
        throw e
    }
}

export const editUser = async editedUserData => {
    try {
        const currentUser = await UserDetails.findById(editedUserData._id);
        return await currentUser.updateOne(editedUserData);
    } catch (e) {
        throw e
    }
}

export const deleteUser = async userDataId => {
    try {
        const currentUser = await UserDetails.findById(userDataId);
        return await currentUser.deleteOne();
    } catch (e) {
        throw e
    }
}

export const getAllUsers = async () => {
    try {
        return await UserDetails.find({});
    } catch (e) {
        throw e;
    }
}

export const getUsersByQuery = async (query) => {
    try {
        return await UserDetails.find(query);
    } catch (e) {
        throw e;
    }
}