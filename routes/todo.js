var express = require('express');
const passport = require('passport');
var router = express.Router();

let todoController = require('../controllers/todo');

// Helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if (req.isAuthenticated()) { return next(); }
    return res.redirect('/users/signin')  
}

/* GET list of items */
router.get('/list', todoController.todoList);

// Route for Details
router.get('/details/:id', todoController.details);

// Routers for edit
router.get('/edit/:id', requireAuth, todoController.displayEditPage);
router.post('/edit/:id', requireAuth, todoController.processEditPage);

// Delete
router.get('/delete/:id', requireAuth, todoController.performDelete);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, todoController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, todoController.processAddPage);

module.exports = router;
