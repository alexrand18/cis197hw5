/* eslint-disable no-return-assign */
let counter = 0

export const addPost = ({ image, title, description }) => ({
  type: 'ADD_POST',
  id: counter += 1,
  image,
  title,
  description,
})

export const changePost = ({
  image, title, description, id,
}) => ({
  type: 'CHANGE_POST',
  id,
  image,
  title,
  description,
})

export const deletePost = ({ id }) => ({
  type: 'DELETE_POST',
  id,
})

export const changeHeader = ({ image, info }) => ({
  type: 'CHANGE_HEADER',
  image,
  info,
})
