var React = require('react');
var TodoStore = require('../stores/TodoStore');
var AltContainer = require('alt-container');
var TodoSource = require('../sources/TodoSource');
var TodoAction = require('../actions/TodoAction');



var AddNewTodo = React.createClass({

  addTodo(){
    console.log(document.getElementById('inputAddTodo').value);
    if(document.getElementById('inputAddTodo').value)
     TodoAction.addTodo(document.getElementById('inputAddTodo').value);
    document.getElementById('inputAddTodo').value = "";
  },

  render() {
    return (
        <div>
          <input id="inputAddTodo"/>
          <button onClick={this.addTodo}>ADD MORE</button>
        </div>
    )
  }

});

var MarkOrUnmark = React.createClass({

  markAll(flag){
    TodoAction.markAll(flag);
  },

  render() {
    return (
        <div>
          <input type="radio" name="markAll" onChange={this.markAll.bind(this,true)} /> MarkAll<br/>
          <input type="radio" name="markAll" onChange={this.markAll.bind(this,false)} /> Unmark All<br/>
        </div>
    )
  }

})


var SortTodo = React.createClass({

  showTypeItem(flag){
    console.log("SortTodoSortTodoSortTodo",flag);
    TodoAction.showTypeItem(flag);
  },

  render() {
    return (
        <div>
          <input type="radio" name="showType" onChange={this.showTypeItem.bind(this,null)} /> Show All<br/>
          <input type="radio" name="showType" onChange={this.showTypeItem.bind(this,true)} /> Done<br/>
          <input type="radio" name="showType" onChange={this.showTypeItem.bind(this,false)} /> Not DOne<br/>
        </div>
    )
  }

})


var AllTodos = React.createClass({
  todosAll:[],
  
  
  chk(){
    console.log("at allTodos");
  },

  componentWillReceiveProps(nextProps) {
    this.todosAll = nextProps;
    console.log('all todos: componentWillReceiveProps', this.todosAll);

  },


  markAsDone(todo){
      console.log("done todo",todo);
      TodoAction.markAsDone(todo);
  },

  deleteTodo(todoIndex){
    TodoAction.deleteTodo(todoIndex);
  },

  render() {
    

    let markAsDoneBtn;
    let deleteBtn;
    return (
      <ul>
        {this.props.todos.map((todo, i) => {
          if(this.props.typeFlag === null || this.props.typeFlag === todo.flag){
            markAsDoneBtn = (
                <input type="checkbox" checked={todo.flag} onChange={this.markAsDone.bind(this,todo)}/>
            );
            deleteBtn =(
                <button onClick={this.deleteTodo.bind(this,i)}>Delete Me</button>
            )
            return (
              <div>
                     <li key={i}> {markAsDoneBtn}{todo.name} {deleteBtn}</li>
              </div>
            );
          }
        })}
      </ul>
    );
  }
});

var TodoComponent = React.createClass({
 

  componentDidMount() {
    TodoStore.fetchTodos();
    // console.log("did mount::",this.props);
  },
 

  render() {
    return (
      <div>
      <ul>
        <h1>Here Todo</h1>
      </ul>
      <AddNewTodo/>
       <AltContainer store={TodoStore}>
        <AllTodos/>
        <MarkOrUnmark/>
        <hr />
        <SortTodo/>
      </AltContainer>
      
      </div>
    );
  }
});

module.exports = TodoComponent;