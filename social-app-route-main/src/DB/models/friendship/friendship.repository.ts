import {AbstractRepository} from "../../abstract.repository";
import {IFriendship} from "../../../common/interfaces/friend.interface";
import {Friendship} from "./friendship.model";

export class FriendshipRepository extends AbstractRepository<IFriendship> {
    constructor() {
        super(Friendship);
    }
}

export const friendshipRepo = new FriendshipRepository();
