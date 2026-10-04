import {Types} from "mongoose"
import {ICloudProvider} from "../../common/cloud/cloud.interface";
import {s3CloudProvider} from "../../common/cloud/s3/init";
import {UserRepository} from "../../DB/models/user/user.repository";
import {FriendshipRepository} from "../../DB/models/friendship/friendship.repository";

class UserService {
    constructor(
        private readonly cloudProvider: ICloudProvider,
        private readonly userRepository: UserRepository,
        private readonly friendshipRepository: FriendshipRepository
    ) {
    }

    async uploadProfilePic(file: Express.Multer.File, userId: Types.ObjectId) {
        return await this.cloudProvider.uploadFile(file, `users/${userId.toString()}`)
    }

    async profile(userId: string) {
        const user = await this.userRepository.getOne({_id: userId});
        const friends = await this.friendshipRepository.getAll(
            {$or: [{user1: userId}, {user2: userId}]},
            {},
            {populate: [{path: "user1"}, {path: "user2"}]}
        );
        return {user, friends};
    }
}

export default new UserService(s3CloudProvider, new UserRepository(), new FriendshipRepository())