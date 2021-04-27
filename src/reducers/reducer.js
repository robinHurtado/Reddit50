
const state = (state = { view: false, indexes: [-1] }, action) => {
    switch (action.type) {
      case 'ITEM_OPENED':
        return { view: true, indexes: [...state.indexes, action.index] }
      default:
        return state
    }
  }

  export default state;