import {
	useDeleteSavedPost,
	useGetCurrentUser,
	useLikePost,
	useSavePost,
} from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils';
import { Models } from 'appwrite';
import { MouseEvent, useState } from 'react';

type PostStatsProps = {
	post: Models.Document;
	userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
	const likesList = post.likes.map(
		(user: Models.Document) => user.$id
	);

	const [likes, setLikes] = useState(likesList);
	const [isSaved, setIsSaved] = useState(false);

	const { mutate: likePost } = useLikePost();
	const { mutate: savePost } = useSavePost();
	const { mutate: deleteSavedPost } = useDeleteSavedPost();

	const { data: currentUser } = useGetCurrentUser();

	const handleLikePost = (e: MouseEvent) => {
		e.stopPropagation();

		let newLikes = [...likes];

		if (checkIsLiked(likes, userId)) {
			newLikes = likes.filter(
				(id: string) => id !== userId
			);
		} else {
			newLikes.push(userId);
		}

		setLikes(newLikes);

		likePost({
			postId: post.$id,
			likesArray: newLikes,
		});
	};

	const handleSavePost = (e: MouseEvent) => {
		e.stopPropagation();

		const savedPostRecord = currentUser?.save.find(
			(savedPost: Models.Document) =>
				savedPost.$id === post.$id
		);

		if (savedPostRecord) {
			setIsSaved(false);
			deleteSavedPost(savedPostRecord.$id);
		} else {
			savePost({
				postId: post.$id,
				userId: currentUser?.id,
			});
			setIsSaved(true);
		}
	};

	return (
		<div className='flex justify-between items-center z-20'>
			<div className='flex gap-2 mr-5'>
				<img
					src={`${
						checkIsLiked(likes, userId)
							? '/assets/icons/liked.svg'
							: '/assets/icons/like.svg'
					}`}
					alt='like'
					width={20}
					height={20}
					onClick={handleLikePost}
					className='cursor-pointer'
				/>
				<p className='small-medium lg:base-medium'>
					{likes.length}
				</p>
			</div>

			<div className='flex gap-2'>
				<img
					src={`${
						isSaved
							? '/assets/icons/saved.svg'
							: '/assets/icons/save.svg'
					}`}
					alt='like'
					width={20}
					height={20}
					onClick={handleSavePost}
					className='cursor-pointer'
				/>
			</div>
		</div>
	);
};

export default PostStats;