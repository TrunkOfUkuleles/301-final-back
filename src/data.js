'use strict';

const DataModel = require('./item-model.js');

const Data = { };

Data.addAnItem = async(req,res,next) => {
  try {
    const data = req.body;
    const item = new DataModel(data);
    res.status(200).json(item);
  } catch (error) { 
  res.status(500).send(error)}
}

Data.getAllItems = async(req, res) => {
  try {
  const items = await DataModel.find({})
  res.status(200).json(items);
  }  catch (error) {
  res.status(500).send("Bad Get", error)}
}

Data.getOneItem = async(req, res) => {
  const id = req.param.id;
  await DataModel.find({_id:id}, function (err, hit){
      if(err)return console.error(err)
      res.status(200).json(hit[0])
  }).catch(error => {console.error(error)});
}

Data.deleteOneItem = async(req, res) => {
  const id = req.param.id;
 await DataModel.findOneAndDelete({_id:id} , { useFindAndModify:false}, function (err, hit) {
  if (err) return console.error(err)
     res.status(200).json(hit)
 }).catch(error => {console.error(error)});

}

Data.updateOneItem = async(req, res) => {
  const id = req.param._id;
  const data = req.body;
  await DataModel.findOneAndUpdate({_id:id}, data, { useFindAndModify:false}, function(err,hit){
    if (err) return console.error(err)
    res.status(200).json(hit)
  }).catch(error => {console.error(error)});
}
module.exports = Data;
