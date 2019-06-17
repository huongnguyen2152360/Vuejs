const Model = require('../../models')

exports.createBoard = function (req, res) {
    Model.Board.create({ title: req.body.title }).then(data => {
        return res.status(200).json(data.dataValues)
    }).catch(err => {
        handleError(res, err);
    });
}

exports.getBoardList = function (req, res) {
    Model.Board.findAll({
        where: {
            deleted: false
        }
    }).then(data => {
        return res.status(200).json(data)
    }).catch(err => {
        handleError(res, err);
    });
}

exports.updateBoard = function (req, res) {
    if (req.body.deleted) {
        Model.Board.update({ deleted: true },
            {
                where: {
                    id: req.params.id
                }
            })
    }
    Model.Board.update(
        { title: req.body.title }
        , {
            where: {
                id: req.params.id
            }
        }).then(data => {
            return res.status(200).json(data)
        })
}