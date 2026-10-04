"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
class AbstractRepository {
    _model;
    constructor(_model) {
        this._model = _model;
    }
    /**
     *
     * @param item
     */
    async create(item) {
        const doc = new this._model(item);
        console.log("in the create method");
        const result = await doc.save();
        console.log("after save");
        console.log({ result });
        return result;
    }
    async getOne(filter, projection, options) {
        return this._model.findOne(filter, projection, options);
    }
    async getAll(filter, projection, options) {
        return this._model.find(filter, projection, options);
    }
    async updateOne(filter, update, options = {}) {
        options.returnDocument = "after";
        return this._model.findOneAndUpdate(filter, update, options);
    }
    async deleteOne(filter) {
        return this._model.findOneAndDelete(filter);
    }
}
exports.AbstractRepository = AbstractRepository;
