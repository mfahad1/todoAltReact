var alt = require('../../alt');
class TodoAction {
  fetchTodos() {
    return [];
  }
  todoFailed(errorMessage) {
    return (errorMessage);
  }
  updateTodo(todos){
  	return (todos);
  }
  addTodo(newTodo){
  	return newTodo;
  }
  markAsDone(todo){
  	return todo;
  }
  markAll(flag){
  	return flag;
  }

  showTypeItem(flag){
  	return flag;
  }

  deleteTodo(todoIndex){
  	return todoIndex;
  }
}

module.exports = alt.createActions(TodoAction);