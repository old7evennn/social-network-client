import React from "react"
import { useGetAllPostsQuery } from "../../app/services/postsApi"
import { Card } from "../../components/card/Card"

export const PostsPage = () => {
  const { data } = useGetAllPostsQuery()
  console.log(data);
  
  return (
    <>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              authorId,
              id,
              likes,
              comments,
              likeByUser,
              createAt,
            }) => (
              <Card
                key={id}
                avatartUrl={author.avatartUrl ?? ""}
                content={content}
                name={author.name ?? ""}
                likesCount={likes.length}
                id={id}
                likeByUser={likeByUser}
                createAt={createAt}
                cardFor="post"
                authorId={authorId}
                commentsCount={comments.length}
              />
            ),
          )
        : null}
    </>
  )
}
