import type { Comment } from "../types";
import { api } from "./api";



export const commentApi = api.injectEndpoints({
  endpoints: builder => ({
    craeteComment: builder.mutation<Comment, Partial<Comment>>({
      query: newComment => ({
        url: `/comment/${newComment.postId}`,
        method: "POST",
        body: newComment
      }),
    }),
    deleteComment: builder.mutation<void, string>({
      query: id => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})


export const {
  useCraeteCommentMutation,
  useDeleteCommentMutation
} = commentApi

export const {
  endpoints: {craeteComment, deleteComment}
} = commentApi