import type { Like } from "../types"
import { api } from "./api"

export const likesApi = api.injectEndpoints({
  endpoints: builder => ({
    likePost: builder.mutation<Like, Partial<Like>>({
      query: body => ({
        url: `/like/${body.postId}`,
        method: "POST",
        body
      }),
    }),
    unlikePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/like/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useLikePostMutation, 
  useUnlikePostMutation
} = likesApi

export const {
  endpoints: {likePost, unlikePost },
} = likesApi
