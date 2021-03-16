/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import s from 'styled-components'
import { Form, Card } from 'react-bootstrap'
import { changePost, deletePost } from '../actions'
import './App.css'

const Post = ({
  image, description, title, id, dispatchChangePost, dispatchDeletePost,
}) => {
  const [isEditing, changeIsEditing] = useState(false)
  const [newImage, setNewImage] = useState(image)
  const [newDescription, setNewDescription] = useState(description)
  const [newTitle, setNewTitle] = useState(title)

  const cancel = e => {
    e.preventDefault()
    changeIsEditing(false)
    setNewImage(image)
    setNewDescription(description)
    setNewTitle(title)
  }

  const changePostContent = e => {
    e.preventDefault()
    changeIsEditing(false)
    const newPost = {
      image: newImage, description: newDescription, title: newTitle, id,
    }
    dispatchChangePost(newPost)
  }

  const deletePostContent = e => {
    e.preventDefault()
    changeIsEditing(false)
    dispatchDeletePost(id)
  }

  return (
    <div>
      <Card border = {'primary'}>
        <Card.Body>
          {!isEditing
            && (
            <>
              <Card.Title>{`Post #${id}: ${title}`}</Card.Title>
              <div style={{
                width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}><Card.Img src={image} style = {{width: 200, height: 200}}/></div>
              <Card.Text>{description}</Card.Text>
              <button type="button" className="btn btn-warning" onClick={() => changeIsEditing(true)}>Edit Post</button>
            </>
            )}
          {isEditing && (
          <>
            <Form>
              <Form.Group controlId="formTitleModal">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Enter title of the post" />
              </Form.Group>
              <Form.Group controlId="formImageModal">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" value={newImage} onChange={e => setNewImage(e.target.value)} placeholder="Enter url of image" />
              </Form.Group>
              <Form.Group controlId="formDescriptionModal">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Enter description" />
              </Form.Group>
              <div className="buttonRow">
                <button type="button" style={{ marginRight : 15 }} className="btn btn-success" onClick={e => changePostContent(e)}>Save</button>
                <button type="button" className="btn btn-info" onClick={e => cancel(e)}>Cancel</button>
              </div>
              <div style={{
                width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px',
              }}
              >
                <button type="button" className="btn btn-danger" style={{ width: '100%', margin: 'auto' }} onClick={e => deletePostContent(e)}>DELETE POST</button>
              </div>
            </Form>
          </>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

const filterPosts = posts => posts.filter(post => !post.deleted)

const PostList = ({ posts, dispatchChangePost, dispatchDeletePost }) => (
  <div className="postContainer">
    {filterPosts(posts).map(post => (
      <Post
        key={post.id}
        dispatchChangePost={dispatchChangePost}
        dispatchDeletePost={dispatchDeletePost}
        image={post.image}
        description={post.description}
        title={post.title}
        id={post.id}
        deleted={post.deleted}
      />
    ))}
  </div>
)

const mapDispatchToProps = dispatch => ({
  dispatchChangePost: post => dispatch(changePost(post)),
  dispatchDeletePost: id => dispatch(deletePost({ id })),
})

const mapStateToProps = state => ({
  posts: state.posts,
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
