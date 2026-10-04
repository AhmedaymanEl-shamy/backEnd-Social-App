import type {NextFunction, Request, Response} from "express";
import friendService from "./friend.service";

export const sendRequest = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId as string;
    const senderId = ((req as any).user._id || (req as any).user.id) as string;
    await friendService.sendRequest(senderId, userId);
    res.status(201).json({ success: true, message: "Friend request sent successfully" });
};

export const acceptRequest = async (req: Request, res: Response, next: NextFunction) => {
    const requestId = req.params.requestId as string;
    const userId = ((req as any).user._id || (req as any).user.id) as string;
    await friendService.acceptRequest(requestId, userId);
    res.status(200).json({ success: true, message: "Friend request accepted successfully" });
};

export const cancelRequest = async (req: Request, res: Response, next: NextFunction) => {
    const requestId = req.params.requestId as string;
    const userId = ((req as any).user._id || (req as any).user.id) as string;
    await friendService.cancelRequest(requestId, userId);
    res.status(200).json({ success: true, message: "Friend request cancelled successfully" });
};

export const rejectRequest = async (req: Request, res: Response, next: NextFunction) => {
    const requestId = req.params.requestId as string;
    const userId = ((req as any).user._id || (req as any).user.id) as string;
    await friendService.rejectRequest(requestId, userId);
    res.status(200).json({ success: true, message: "Friend request rejected successfully" });
};

export const removeFriend = async (req: Request, res: Response, next: NextFunction) => {
    const targetUserId = req.params.userId as string;
    const userId = ((req as any).user._id || (req as any).user.id) as string;
    await friendService.removeFriend(userId, targetUserId);
    res.status(200).json({ success: true, message: "Friend removed successfully" });
};

export const blockUser = async (req: Request, res: Response, next: NextFunction) => {
    const blockedId = req.params.userId as string;
    const blockerId = ((req as any).user._id || (req as any).user.id) as string;
    await friendService.blockUser(blockerId, blockedId);
    res.status(200).json({ success: true, message: "User blocked successfully" });
};

export const unblockUser = async (req: Request, res: Response, next: NextFunction) => {
    const blockedId = req.params.userId as string;
    const blockerId = ((req as any).user._id || (req as any).user.id) as string;
    await friendService.unblockUser(blockerId, blockedId);
    res.status(200).json({ success: true, message: "User unblocked successfully" });
};
