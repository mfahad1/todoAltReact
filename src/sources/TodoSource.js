var TodoAction = require('../actions/TodoAction');

var mockData = [
  { id: 0, name: 'ToDo 1' , flag: false},
  { id: 1, name: 'ToDo 2' , flag: false},
  { id: 2, name: 'ToDo 3' , flag: false},
  { id: 3, name: 'ToDo 4' , flag: false}
];

var TodoSource = {
  fetchTodos() {
    return {
      remote() {
        return new Promise(function (resolve, reject) {
          // simulate an asynchronous flow where data is fetched on
          // a remote server somewhere.
          setTimeout(function () {

            // change this to `false` to see the error action being handled.
            if (true) {
              // resolve with some mock data
              resolve(mockData);
            } else {
              reject('Things have broken');
            }
          }, 250);
        });
      },

      local() {
        // Never check locally, always fetch remotely.
        return null;
      },

      success: TodoAction.updateTodo,
      error: TodoAction.todoFailed,
      loading: TodoAction.fetchTodos
    }
  }
};

module.exports = TodoSource;
  