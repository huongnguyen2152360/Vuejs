const Model = require('../../models')

exports.createBoard = function (req, res) {
    Model.Board.create({ title: req.body.title }).then(data => {
        return res.status(200).json(data.dataValues)
    }).catch(err => {
        handleError(res, err);
    });
}

exports.getBoardList = function (req, res) {
    Model.Board.findAll().then(data => {
        return res.status(200).json(data)
    }).catch(err => {
        handleError(res, err);
    });
}