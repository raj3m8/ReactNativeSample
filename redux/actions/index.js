export const setNavigator = text => {
  return {
    type: 'SET_NAVIGATOR',
    id: nextTodoId++,
    text
  }
}