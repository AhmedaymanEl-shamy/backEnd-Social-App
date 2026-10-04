import { AbstractRepository } from "../../abstract.repository";
import { IChat } from "../../../common/interfaces/chat.interface";
import { Chat } from "./chat.model";

export class ChatRepository extends AbstractRepository<IChat> {
    constructor() {
       super(Chat); 
    }
}
