import React, { useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom";
import { useAsync } from "../src/hooks/useAsync";
import { getPost } from "../src/services/posts";


const Context = React.createContext()

export function usePost() {
  return useContext(Context)
}

export function PostProvider({ children }) {
  const { id } = useParams()
  const { loading, error, value: post } = useAsync(() => getPost(id), [id])

  const commentsByParentId = useMemo(() => {
    if (post?.comments == null) return [];
    const group = {};
    post.comments.forEach((comment) => {
      // * ||= if its falsy or undefined set it to empty array
      group[comment.parentId] ||= [];
      group[comment.parentId].push(comment);
    });

    return group;
  }, [post?.comments]);

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  console.log(commentsByParentId);

  return (
    <Context.Provider
      value={{
        post: { id, ...post },
        rootComments: commentsByParentId[null],
        getReplies,

      }}
    >
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider>
  )
}