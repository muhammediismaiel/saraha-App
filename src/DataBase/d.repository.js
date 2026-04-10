class DBRepository {
  nModel;
  constructor(model) {
    this.nModel = model;
  }
  async creat(item) {
    const doc = new this.nModel(item);
    return await doc.save();
  }
  async update(filter, update, options = {}) {
    return await this.nModel.findOneAndUpdate(filter, update, options);
  }
  async getOne(filter, projection = {}, options = {}) {
    return await this.nModel.findOne(filter, projection, options);
  }
  async getAll(filter, projection = {}, options = {}) {
    return await this.nModel.find(filter, projection, options);
  }
  delete() {}
}
