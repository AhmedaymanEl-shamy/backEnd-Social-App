import {AbstractRepository} from "../../abstract.repository";
import {IComment} from "../../../common";
import {Comment} from "./comment.model";

export class CommentRepository extends AbstractRepository<IComment> {
    constructor() {
        super(Comment);
    }
}


export const commentRepo = new CommentRepository();