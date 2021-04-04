'use strict'
const DataModel = require('./item-model.js');
// const client = supergoose(app.server);
const Data = { };

Data.addAnItem = async(req,res,next) => {
  try {
    const data = req.body
    const item = new DataModel(data);
    await item.save();
    res.status(200).send(item);
  }catch (error) {
    res.status(500).send( error)
   
  }
}

Data.getAllItems = async(req, res) => {

  const items = await DataModel.find({});
  res.status(200).send(items)
 

}

Data.getOneItem = async(req, res) => {

  const id = req.params.id;
  const target = await DataModel.find({_id: id})
  res.status(200).send(target[0])
}

Data.deleteOneItem = async(req, res) => {
 const id = req.params.id;
 await DataModel.deleteOne({_id:id})
 res.status(500).send( 'deleted')

}

Data.updateOneItem = async(req, res) => {
  const id = req.params.id;
  console.log('id to be updated', id)
  const data = req.body;
  const item = await DataModel.findByIdAndUpdate({_id:id}, data, {new:true, useFindAndModify: false})
  // item.save()
  res.status(200).json(item)

  }


module.exports = Data;
