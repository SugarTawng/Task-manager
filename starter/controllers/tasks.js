const taskModel = require('../model/task');
const asyncWrapper = require('../middlewares/async');
 require('../middlewares/async');
const {createCustomError} = require('../errors/custom-error');

console.log(createCustomError);

const getAllTasks = asyncWrapper(async (req, res)=>{
    const tasks = await taskModel.find({})
    res.status(200).json({ tasks })
});

const createTask =asyncWrapper( async (req, res) => {
        const task = await taskModel.create(req.body);
        res.json(task);
});

const getTask = asyncWrapper( async (req, res, next) => {
        const { id: taskID } = req.params
        console.log({id: taskID});
        const task = await taskModel.findOne({ _id: taskID })
        if (!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404));
        }
        res.status(200).json({ task })
});

const deleteTask = asyncWrapper( async (req, res) => {
        const { id: taskID } = req.params
        const task = await taskModel.findOneAndDelete({ _id: taskID })
        if (!task) {
            return res.status(404).json(`No task with id : ${taskID}`);
        }
        res.status(200).json({ task })
});

const updateTask =  asyncWrapper( async (req, res) => {
        const { id: taskID } = req.params
        const task = await taskModel.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
            overwrite: true
        })

        if (!task) {
            return res.status(200).json(`No task with id : ${taskID}`);
        }

        res.status(200).json({ task })
});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}

