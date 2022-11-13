import { useEffect, useState, useRef } from "react";
import { TPost } from "./types";
import Post from "./components/Post";
import Pagination from "./components/Pagination";

import "./App.css";

function App() {
  const [post, setPost] = useState<TPost[]>([]);
  const totalPaqes = useRef<number>(0);
  const totalPosts = useRef<TPost[]>([]);
  const postPerPage: number = 9;

  const calculatePage = (res: TPost[]): void => {
    const toalPage: number = Math.ceil(res.length / postPerPage);
    totalPaqes.current = toalPage;
  };

  useEffect(() => {
    (async () => {
      const response: TPost[] = await (
        await fetch("https://jsonplaceholder.typicode.com/posts")
      ).json();
      calculatePage(response);
      totalPosts.current = response;
      handlePaginationClick();
    })();
  }, []);

  const handlePaginationClick = (val: number = 1): void => {
    const filteredPost: Array<TPost> = totalPosts?.current?.filter((i: TPost, idx: number) => {
      return i.id <= postPerPage * val && i.id >= (val - 1) * postPerPage;
    });
    setPost(filteredPost);
  };

  return (
    <div className='px-4 text-lg text-slate-600'>
      {post?.map((item: TPost) => {
        return <Post key={item.id} post={item} />;
      })}
      {!!post?.length && (
        <Pagination
          handleSetPage={handlePaginationClick}
          TotalPages={Math.ceil(totalPosts.current.length / 9)}
          totalPosts={totalPosts.current.length}
          postPerPage={postPerPage}
        />
      )}
    </div>
  );
}

export default App;
