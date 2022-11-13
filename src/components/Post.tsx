import React from "react";
import { TPost } from "../types";

interface Props {
  post: TPost;
}

function Post({ post }: Props) {
  return <div className='text-lg'>{post.id}. {post.title}</div>;
}

export default Post;
