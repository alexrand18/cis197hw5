/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-bootstrap'
import s from 'styled-components'
import { changeHeader } from '../actions'

const ButtonGroup = s.div`
    display: flex;
`

const ButtonSave = s.button`
    background-color : green;
    color: white;
    font-size: 20px
    padding : 10px 50px;
    border-radius: 10px;
    margin 10px;
    cursor: pointer;
`

const ButtonCancel = s.button`
    background-color : blue;
    color: white;
    font-size: 20px
    padding : 10px 20px;
    border-radius: 10px;
    margin 10px;
    cursor: pointer;
`

const TitleText = s.h1`
    font-weight: 500;
`

const TitlePostText = s.h2`
font-weight: 200;
font-color: dark-gray;
`

const Header = ({ dispatchChangeHeader }) => {
  const [isEditing, changeIsEditing] = useState(false)
  const [imageInput, changeImageInput] = useState('')
  const [postInput, changePostInput] = useState('')
  const [postContent, changePostContent] = useState('')
  const [image, changeImage] = useState('')
  const [hasPosted, changeHasPosted] = useState(false)

  const updatePost = e => {
    e.preventDefault()
    changeImage(imageInput)
    changePostContent(postInput)
    const post = { image: imageInput, info: postInput }
    dispatchChangeHeader(post)
    changeIsEditing(false)
    changeHasPosted(true)
  }

  const revert = e => {
    e.preventDefault()
    changePostInput(postContent)
    changeImageInput(image)
    changeIsEditing(false)
  }

  return (
    <div className="header" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="row d-flex">
        <div className="title mr-auto p-2"><TitleText>Hey this is me!</TitleText></div>
        {!isEditing && (<div className="buttonDiv ml-auto p-2"><button type="button" className="btn btn-warning editButton" onClick={() => changeIsEditing(!isEditing)}> Edit </button></div>)}
      </div>
      <div>
        <div className="middleForm">
          {isEditing && (
            <Form>
              <Form.Group controlId="formImageTop">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" value={imageInput} onChange={e => changeImageInput(e.target.value)} placeholder="Enter image URL" />
              </Form.Group>
              <Form.Group controlId="formDescriptionTop">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={postInput} onChange={e => changePostInput(e.target.value)} placeholder="Enter Description" />
              </Form.Group>
              <ButtonGroup>
                <ButtonSave onClick={e => updatePost(e)}> Save </ButtonSave>
                <ButtonCancel onClick={e => revert(e)}> Cancel </ButtonCancel>
              </ButtonGroup>
            </Form>
          )}
        </div>
        {!isEditing && hasPosted && (
        <div className="aboutMe">
          <img id="aboutMeImg" src={image} alt="profile" />
          <div className="post">
            <h3 style={{ fontWeight: 400, color: 'darkslategray' }}>
              {postContent}
            </h3>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  dispatchChangeHeader: ({ image, info }) => dispatch(changeHeader({ image, info })),
})

export default connect(null, mapDispatchToProps)(Header)
