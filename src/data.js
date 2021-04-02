'use strict';

const DataModel = require('./item-model.js');

const Data = { };

Data.addAnItem = async(req,res,next) => {
  try {
    const data = req.body;
    const item = new DataModel(data);
    res.status(200).json(item);
  } catch (error) {
  console.error(error.message); 
  res.status(500).json(error)}
}

Data.getAllItems = async(req, res) => {
  try {
  const items = await DataModel.find({})
  res.status(200).json(items);
  }  catch (error) {
  console.error(error.message); 
  res.status(500).json("Bad Get")}
}

Data.getOneItem = async(req, res) => {
  const id = req.param.id;
  const items = await DataModel.find({_id:id})
  res.status(200).json(items[0]);

  // await DataModel.findById(id, function (err, hit){
      // if(err)return console.error(err)
      // res.status(200).json(hit)
  // })
}

Data.deleteOneItem = async(req, res) => {
  const id = req.param.id;
 await DataModel.findOneAndDelete({_id:id} , {new:true, useFindAndModify:true}, function (err, hit) {
  if (err) return console.error(err)
     res.status(200).json(hit)
 }).catch(error => {console.error(error)});

}

Data.updateOneItem = async(req, res) => {
  const id = req.param.id;
  const data = req.query;
  await DataModel.findOneAndUpdate({_id:id}, data, { useFindAndModify:false}, function(err,hit){
    if (err) return console.error(err)
    res.status(200).json(hit)
  }).catch(error => {console.error(error)});
}
module.exports = Data;
