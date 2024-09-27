import { Post } from "../interfaces/post.moldel";

export const buildUserId = (posts: Post[]) => {

    const ids = posts.map(( post ) => post.id);

    const maxId = ids.sort((a, b) => b - a)[0];

    return maxId;

}