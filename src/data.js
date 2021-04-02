'use strict';

const DataModel = require('./item-model.js');

const Data = { };

Data.addAnItem = async(req,res,next) => {
  try {
    const data = req.body;
    const item = new DataModel(data);
    res.status(200).json(item);
  } catch(e) {console.log(e.message); }
}

Data.getAllItems = async(req, res) => {
  const items = await DataModel.find({})
  .catch(error => console.error(error));
  res.status(200).json(items);
}

Data.getOneItem = async(req, res) => {
  const id = req.param.id;
  const items = await DataModel.find({_id:id}).catch(error => console.error(error));
  res.status(200).json(items[0]);

  // await DataModel.findById(id, function (err, hit){
      // if(err)return console.error(err)
      // res.status(200).json(hit)
  // })
}

Data.deleteOneItem = async(req, res) => {
  const id = req.param.id;
 await DataModel.findOneAndDelete({_id:id} , {new:true, useFindAndModify:false}, function (err, hit) {
  if (err) return console.error(err)
     res.status(200).json("DELETED", hit)
 }).catch(error => {console.error(error)});

}

Data.updateOneItem = async(req, res) => {
  const id = req.param.id;
  const data = req.query;
  DataModel.findOneAndUpdate({_id:id}, data, {new:true, useFindAndModify:false});
  res.status(200).json("UPDATED");
}

module.exports = Data;
