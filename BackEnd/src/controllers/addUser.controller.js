import { addUser, editUser, deleteUser, getAllUsers, getUsersByQuery } from "../services/userPage.service.js";

export const addUserController = async (req, res) => {
    try {
        const { email, password, name, username } = req.body;

        const newUserData = {
            email,
            password,
            name,
            username,
        };
        const newUser = await addUser(newUserData);
        res.status(200).json(newUser);
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error adding peep.`);
    }
}

export const editUserController = async (req, res) => {
    try {
        const { _id, email, password, name, username } = req.body;

        const editedUserData = {
            _id,
            email,
            password,
            name,
            username,
        };
        const editedUser = await editUser(editedUserData);
        res.status(201).json(editedUser);
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error editing peep.`);
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.body;

        await deleteUser(id);
        res.status(201).send('Deleted successfully.');
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error editing peep.`);
    }
}

export const getAllUsersController = async (req, res) => {
    try {
        const result = await getAllUsers();
        res.status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error editing peep.`);
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await getUsersByQuery({email: email, password: password});
        if (result.length == 1) {
            res.status(201).json(result[0]);
        } else {
            res.status(500).send(`Error editing peep.`);
        }
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error editing peep.`);
    }
}