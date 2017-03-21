var alt = require('../../alt');
var TodoAction = require('../actions/TodoAction');
var TodoSource = require('../sources/TodoSource');

class TodoStore {
  constructor() {
  	this.todos = [];
  	this.typeFlag = null;
    this.bindListeners({
      handleFetchTodos: TodoAction.FETCH_TODOS,
      handleUpdateTodos: TodoAction.UPDATE_TODO,
      handleAddTodo:TodoAction.ADD_TODO,
      handleMarkAsDone : TodoAction.MARK_AS_DONE,
      handleMarkAll : TodoAction.MARK_ALL,
      handleShowTypeItem : TodoAction.SHOW_TYPE_ITEM,
      handleDeleteTodo : TodoAction.DELETE_TODO
     });

   
   this.exportAsync(TodoSource) ;
  }

  handleFetchTodos(arr) {
  	console.log('handleFetchTodos');
    this.todos = arr;
  }

  handleUpdateTodos(todos) {
    this.todos = todos;
    console.log("handleUpdateTodos", this.todos);
  }

  handleAddTodo(newTodo){
  	this.todos.push({
  		id: this.todos.length,
  		name : newTodo
  	})
  }



  handleMarkAsDone(todo){
  		console.log("at todo handler",todo);

  	  for (var i = 0; i < this.todos.length; i += 1) {

        // set has_favorite to true
        if (this.todos[i].id === todo.id) {
          if(this.todos[i].flag )
          	this.todos[i].flag = false;
          else
          	this.todos[i].flag =true;
          break;
        }
      }


  }

  handleMarkAll(flag){
  		let alteredTodo = [];
  		
  			alteredTodo = this.todos.map(function(val,i){
				 val.flag = flag;
				 return val;
			})

		this.todos = alteredTodo;
  }

  handleShowTypeItem(flag){
  	
		this.typeFlag = flag;
  }

  handleDeleteTodo(index){
  	this.todos.splice(index,1);
  }

}

module.exports = alt.createStore(TodoStore, 'TodoStore');