/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import s from 'styled-components'
import { Modal, Form } from 'react-bootstrap'
import { addPost } from '../actions'

const BlogText = s.h1`
    font-weight: 500;
    color: #00EDC6;
    font-style: bolder;
`

const BlogRow = ({ dispatchAddPost }) => {
  const [isAddingPost, setIsAddingPost] = useState(false)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')

  const revert = e => {
    e.preventDefault()
    setTitle('')
    setImage('')
    setDescription('')
    setIsAddingPost(false)
  }

  const submitPost = e => {
    e.preventDefault()
    dispatchAddPost({ title, image, description })
    setTitle('')
    setImage('')
    setDescription('')
    setIsAddingPost(false)
  }

  return (
    <>
      <div className="row d-flex">
        <div className="title mr-auto p-2"><BlogText>Blog Posts</BlogText></div>
        <div className="ml-auto" style={{ marginRight: 100, marginTop: 20 }}><button type="button" className="btn btn-primary addButton" onClick={() => setIsAddingPost(true)}> Add Post </button></div>
      </div>
      <Modal show={isAddingPost} onHide={() => setIsAddingPost(false)}>
        <Modal.Header><Modal.Title>New Post</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitleModal">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title of the post" />
            </Form.Group>
            <Form.Group controlId="formImageModal">
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="Enter url of image" />
            </Form.Group>
            <Form.Group controlId="formDescriptionModal">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter description" />
            </Form.Group>
          </Form>
          <div className="buttonRow">
            <button type="submit" style={{ marginRight : 15 }} className="btn btn-success" onClick={e => submitPost(e)}>Submit</button>
            <button type="submit" className="btn btn-info" onClick={e => revert(e)}> Cancel </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatchAddPost: ({ image, description, title }) => dispatch(addPost({
    image, description, title, deleted: false,
  })),
})

export default connect(null, mapDispatchToProps)(BlogRow)
