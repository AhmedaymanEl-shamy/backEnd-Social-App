import {AddReactionDTO, CreatePostDTO} from "./post.dto";
import {Types} from "mongoose";
import {PostRepository, UserReactionRepository} from "../../DB/models";
import {NotFoundException, ON_MODEL} from "../../common";

export class PostService {
    constructor(private readonly postRepository: PostRepository, private readonly userReactionRepository: UserReactionRepository) {
    }

    async create(createPostDTO: CreatePostDTO, userId: Types.ObjectId) {
        // create post in repo
        return await this.postRepository.create({
            commentsCount: 0,
            reactsCount: 0,
            sharesCount: 0, ...createPostDTO, userId
        })
    }

    async addReaction(addReactionDTO: AddReactionDTO, userId: Types.ObjectId) {
        // check post exist
        const postExist = await this.postRepository.getOne({_id: addReactionDTO.postId})
        if (!postExist) {
            throw new NotFoundException("Post not found");
        }
        // check user reaction
        const userReact = await this.userReactionRepository.getOne({
            onModel: ON_MODEL.Post,
            userId: userId,
            refId: addReactionDTO.postId
        })
        // if no create new
        if (!userReact) {
            await this.userReactionRepository.create({
                onModel: ON_MODEL.Post,
                refId: addReactionDTO.postId, reaction: addReactionDTO.reaction, userId: userId
            })
            // update react count
            await this.postRepository.updateOne({_id: addReactionDTO.postId}, {$inc: {reactsCount: 1}})
            return;
        }
        //if same remove reaction
        if (userReact.reaction == addReactionDTO.reaction) {
            await this.userReactionRepository.deleteOne({_id: userReact._id})
            // update count
            await this.postRepository.updateOne({_id: addReactionDTO.postId}, {$inc: {reactsCount: -1}})
            return;

        }
        // if different react
        await this.userReactionRepository.updateOne({_id: userReact._id}, {reaction: addReactionDTO.reaction})
        return

    }

    async getSinglePost(postId: string) {
        const post = await this.postRepository.getOne({ _id: new Types.ObjectId(postId) });
        if (!post) {
            throw new NotFoundException("Post not found");
        }
        return post;
    }

    async deletePost(postId: string, userId: string) {
        const post = await this.postRepository.getOne({ _id: new Types.ObjectId(postId) });
        if (!post) {
            throw new NotFoundException("Post not found");
        }
        if (post.userId.toString() !== userId.toString()) {
            throw new NotFoundException("Unauthorized to delete this post");
        }
        await this.postRepository.deleteOne({ _id: new Types.ObjectId(postId) });
        return { message: "Post deleted successfully" };
    }

    async getProfilePosts(targetUserId: string) {
        // Fetch posts for a specific user profile
        return await this.postRepository.getAll({ userId: new Types.ObjectId(targetUserId) });
    }

    async getNewsFeed(userId: string) {
        // Fetch posts from everyone (since following mechanism isn't fully robust here, we'll fetch all posts, 
        // ideally we would filter by friend/following IDs)
        // We will fetch all posts sorted by creation date descending as a placeholder for dashboard feed
        // return await this.postRepository.getAll({}, { sort: { createdAt: -1 }, limit: 20 });
        
        // Since getAll is defined in repo we can just use the repository
        // To be safer and keep it simple:
        return await this.postRepository.getAll({});
    }
}


export default new PostService(new PostRepository(), new UserReactionRepository());