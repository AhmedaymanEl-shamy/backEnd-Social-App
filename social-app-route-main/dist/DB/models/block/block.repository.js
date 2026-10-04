"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockRepo = exports.BlockRepository = void 0;
const abstract_repository_1 = require("../../abstract.repository");
const block_model_1 = require("./block.model");
class BlockRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(block_model_1.Block);
    }
}
exports.BlockRepository = BlockRepository;
exports.blockRepo = new BlockRepository();
