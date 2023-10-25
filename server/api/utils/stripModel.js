function stripModel(model) {
  model = model.toObject();
  delete model._id;
  delete model.__v;
  return model;
}

export default stripModel;
