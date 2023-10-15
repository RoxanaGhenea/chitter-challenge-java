import { addPeep, editPeep, deletePeep, getAllPeeps } from "../services/peepPage.service.js";

export const addPeepController = async (req, res) => {
    try {
        const { content } = req.body;

        const newPeepData = {
            user: req.body.user,
            content,
        };
        const newPeep = await addPeep(newPeepData);
        res.status(201).json(newPeep);
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error adding peep.`);
    }
}

export const editPeepController = async (req, res) => {
    try {
        const { _id, user, content } = req.body;

        const editedPeepData = {
            _id,
            user,
            content,
        };
        const editedPeep = await editPeep(editedPeepData);
        res.status(201).json(editedPeep);
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error editing peep.`);
    }
}

export const deletePeepController = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(req.body)

        await deletePeep(id);
        res.status(201).send('Deleted successfully.');
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error editing peep.`);
    }
}

export const getAllPeepController = async (req, res) => {
    try {
        const result = await getAllPeeps();
        const sortedResult = result.sort((a, b) => (new Date(a.date) < new Date(b.date)) ? 1 : -1);
        res.status(201).json(sortedResult);
    } catch (e) {
        console.log(e);
        res.status(500).send(`Error editing peep.`);
    }
}