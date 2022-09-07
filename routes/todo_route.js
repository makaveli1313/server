const {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require('../controllers/todo_controller.js');
const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.route('/').get(getTodos).post(addTodo);
router.route('/:id').delete(deleteTodo).put(updateTodo);

module.exports = router;
