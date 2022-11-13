import React, { useState } from "react";
import { TPost } from "../types";

interface Props {
  currPage?: number;
  TotalPages: number;
  handleSetPage: (val: number) => void;
  totalPosts: number;
  postPerPage: number;
}

function Pagination({ TotalPages, handleSetPage, totalPosts, postPerPage }: Props) {
  const [currPage, setCurrPage] = useState<number>(1);

  const totalPageArr: Array<number> = new Array(TotalPages)
    .fill("")
    .map((_: string, i: number) => i + 1)
    .reduce((a: number[], b: number) => {
      if (b + 1 === currPage) {
        a.push(b);
      } else if (b === currPage && ![1, TotalPages].includes(b)) {
        a.push(b);
      } else if (b - 1 === currPage) {
        a.push(b);
      } else if (b === currPage && [1, TotalPages].includes(b)) {
        if (b === 1) {
          a.push(b);
          a.push(b + 2);
        } else if (b === TotalPages) {
          a.push(b - 2);
          a.push(b);
        }
      }
      return a.sort((a, b) => a - b);
    }, []);

  const handleClick = (val: number) => {
    if (!!val && val <= TotalPages) {
      handleSetPage(val);
      return setCurrPage(val);
    }
    return;
  };

  return (
    <div>
      <ButtonPage prev={true} currPage={currPage} handleClick={handleClick} />
      {totalPageArr.map((i: number) => {
        return (
          <span
            className={`border mx-1 cursor-pointer hover:bg-blue-400 duration-75 px-2 py-0.5 border-slate-400 rounded-full ${
              i === currPage && "bg-blue-500 text-white "
            }`}
            key={i}
            onClick={handleClick.bind(null, i)}
          >
            {i}
          </span>
        );
      })}
      <ButtonPage prev={false} currPage={currPage} handleClick={handleClick.bind(currPage + 1)} />
      <div className="mx-2 inline-block">
        Showing {(currPage - 1) * postPerPage === 0 ? 1 : (currPage - 1) * postPerPage} -{" "}
        {currPage * postPerPage > totalPosts ? totalPosts : currPage * postPerPage} out of{" "}
        {totalPosts}
      </div>
    </div>
  );
}

const ButtonPage = ({
  prev,
  handleClick,
  currPage,
}: {
  prev: boolean;
  handleClick: (n: number) => void;
  currPage: number;
}) => {
  if (prev) {
    return (
      <button
        className='border border-slate-400 px-1 py-0.5 rounded-full'
        onClick={handleClick.bind(null, currPage - 1)}
      >
        prev
      </button>
    );
  } else {
    return (
      <button
        className='border border-slate-400 px-1 py-0.5 rounded-full'
        onClick={handleClick.bind(null, currPage + 1)}
      >
        next
      </button>
    );
  }
};

export default Pagination;
