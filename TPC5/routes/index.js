var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.list()
    .then(tasks => {
      res.render('index', { slist: tasks, d: data })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});

router.post("/", function(req, res, next) {
  Task
    .updateTask(req.body)
    .then(tasks => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("error", { error: err });
    });
});

module.exports = router;
