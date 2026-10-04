import {AbstractRepository} from "../../abstract.repository";
import {IFriendRequest} from "../../../common/interfaces/friend.interface";
import {FriendRequest} from "./friend-request.model";

export class FriendRequestRepository extends AbstractRepository<IFriendRequest> {
    constructor() {
        super(FriendRequest);
    }
}

export const friendRequestRepo = new FriendRequestRepository();
