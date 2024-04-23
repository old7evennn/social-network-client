import type { Follows } from "../types"
import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation<void, { followingId: string }>({
      query: body => ({
        url: `/follow/${body.followingId}`,
        method: "POST",
        body,
      }),
    }),
    unfollowUser: builder.mutation<void, string>({
      query: id => ({
        url: `/follow/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnfollowUserMutation } = followApi

export const {
  endpoints: { followUser, unfollowUser },
} = followApi
