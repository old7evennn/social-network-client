import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/services/postsApi'
import { Card } from '../../components/card/Card'
import { GoBack } from '../../components/go-back/GoBack'
import { CreatePostOrComment } from '../../components/create-post-or-comment/CreatePostOrComment'

export const CurrentPostPage = () => {
  const params = useParams<{id: string}>()
  const {data} = useGetPostByIdQuery(params?.id ?? '')
  console.log('fds');
  
  console.log(data);
  

  if (!data) return <h2>post not found</h2>
  
  const {
    content, 
    id, 
    authorId,
    comments,
    likes,
    author,
    likeByUser,
    createAt
  } = data
  
  return (
    <>
      <GoBack/>
      <Card 
        cardFor='current-post'
        avatartUrl={author.avatartUrl ?? ''}
        content={content}
        name={author.name ?? ''}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likeByUser={likeByUser}
        createAt={createAt}
      />
        <CreatePostOrComment forCreate='comment'/>
      <div className="mt-10">
        {
          data.comments ? data.comments.map((comment) => (
            <Card
              cardFor='comment'
              key={comment.id}
              avatartUrl={comment.user.avatartUrl ?? ''}
              content={comment.content}
              name={comment.user.name ?? ''}
              authorId={comment.userId}
              commentId={comment.id}
              id={id}
            />
          )) : null
        }
      </div>
    </>
  )
}
