const db = require('../model');
const Employee = db.employee;
const Setting = db.setting

exports.findAll = (req, res) => {
    //try,catch --> Error detector
    try {
        Employee.findAll({
            attributes: ["id", "name", "position"],
            include: [{
                model: Setting,
                attributes: ["theme"]
            }]
        })
            .then(employee => {
                res.send(employee);
                //res.status(200).json(employee); //send status nubmer too
            })
            .catch(error => {
                console.log(error.massage);
            });
    } catch (e) {
        console.log(e);
    }
};

exports.create = (req, res) => {
    try {
        if (!req.body.name | !req.body.position) {
            res.status(400).json({ massage: "cannot empty" });
            return;
        }

        const employeeObj = {
            name: req.body.name,
            position: req.body.position
        }
        Employee.create(employeeObj)
            .then((data) => {
                // Insert to setting
                Setting.create({
                    theme: req.body.theme,
                    employeeId: data.id
                });
                res.status(200).json({ massage: "employee Created" });
            })
            .catch(error => {
                res.status(400).json({ massage: "Error occured!" });
            })

    } catch (error) {
        res.sendStatus(500)
    }
};

exports.findOne = (req, res) => {
    try {
        const id = req.params.Id
        Employee.findByPk(id)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                res.status(400).json({ massage: error.massage });
            })
    } catch (error) {
        console.log(error.massage);
    }
};

exports.update = (req, res) => {
    try {
        const id = req.params.id;
        const employeeObj = {
            name: req.body.name,
            position: req.body.position
        }

        Employee.update(employeeObj, {
            where: { id, id },
        })
            .then(data => {
                if (data == 1) {
                    res.status(200).json({ massage: "Update sucessfully!" })
                }
                res.status(200).json(data);
            })
            .catch(error => {
                res.status(500).json({ massage: error.massage });
            });
    } catch (error) {
        res.status(500).json({ massage: error.massage });
    }
};

exports.delete = (req, res) => {
    try {
        Employee.destroy({ where: { id: req.params.id } })
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                res.status(400).json({ massage: error.massage });
            })
    } catch (error) {
        res.status(500).json({ massage: error.massage });
    }
};