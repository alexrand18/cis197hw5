const defaultState = { image: '', info: '' }

const header = (state = defaultState, action) => {
  const { type, image, info } = action
  if (type === 'CHANGE_HEADER') {
    return { image, info }
  }
  return state
}

export default header
