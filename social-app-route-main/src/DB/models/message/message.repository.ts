import { AbstractRepository } from "../../abstract.repository";
import { IMessage } from "../../../common/interfaces/message.interface";
import { Message } from "./message.model";

export class MessageRepository extends AbstractRepository<IMessage> {
    constructor() {
       super(Message); 
    }
}
