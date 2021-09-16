const express = require('express');
const Data = require('../model/dataModel');
const router = express.Router();

const saveController = async (req, res, next) => {
  try {
    const newData = await Data.create(req.body);
    res.status(201).json({
      newData
    })
  }
  catch (err) {
    res.status(400).josn({
      err
    })
  }
  next();
};

const getResult = async (req, res) => {
  try {
    const value = req.query.value * 1;
    const method = String(req.query.method);
    let result = [];

    if (method === 'greater') {
      result = await Data.aggregate([
        {
          $match: { letter: String(req.query.letter), numeric: { $gt: value } }
        }
      ]);
    } else {
      result = await Data.aggregate([
        {
          $match: { letter: String(req.query.letter), numeric: { $lt: value } }
        }
      ]);
    }
    res.status(200).json({
      ...result
    })
  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

const getController = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json({
      ...data
    })

  } catch (err) {
    res.status(400).json({
      err
    })
  }
}

router.route('/result').get(getResult)
router.route('/data').post(saveController).get(getController);

module.exports = router;