import {AbstractRepository} from "../../abstract.repository";
import {IUserReaction} from "../../../common";
import {UserReaction} from "./user-reaction.model";

export class UserReactionRepository extends AbstractRepository<IUserReaction> {
    constructor() {
        super(UserReaction);

    }
}