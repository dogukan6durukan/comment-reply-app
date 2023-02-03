import { makeRequest } from "./makeRequest";

export default function createComment({ postId, message, parentId }) {
    return makeRequest(`posts/${postId}/comments`, {
      method: "POST",
      data: { message, parentId },
    })
  }