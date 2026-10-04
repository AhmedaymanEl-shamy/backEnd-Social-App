import {AbstractRepository} from "../../abstract.repository";
import {IPost} from "../../../common";
import {Post} from "./post.model";

export class PostRepository extends AbstractRepository<IPost> {
    constructor() {
        super(Post);
    }
}