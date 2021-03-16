const defaultState = []

const posts = (state = defaultState, action) => {
  const {
    type, id, image, description, title,
  } = action
  switch (type) {
    case 'ADD_POST':
      return [
        ...state, {
          id, image, title, description, deleted: false,
        },
      ]
    case 'CHANGE_POST':
      return state.map(post => {
        if (post.id === id) {
          return {
            ...post, image, title, description,
          }
        }
        return post
      })
    case 'DELETE_POST':
      return state.map(post => {
        if (post.id === id) {
          return { ...post, deleted: true }
        }
        return post
      })
    default:
      return state
  }
}

export default posts
