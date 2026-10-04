import {AbstractRepository} from "../../abstract.repository";
import {IBlock} from "../../../common/interfaces/friend.interface";
import {Block} from "./block.model";

export class BlockRepository extends AbstractRepository<IBlock> {
    constructor() {
        super(Block);
    }
}

export const blockRepo = new BlockRepository();
