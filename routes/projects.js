const express = require('express');

module.exports = (db) => {
  const project = require('../models/project')(db);
  const router = new express.Router();

  // GET /projects - Projects Index
  router.get('/', (req, res) => {
    project.all()
      .then(projects => {
        res.render('projects/index', { projects });
      })
      .catch(err => {
        res.send(err);
      });
  });

  // GET /projects/:id - Projects show
  router.get('/:id', (req, res) => {
    project.find(1);

    project.findWithTasks(req.params.id)
      .then(project => {
        console.log(project);
        if (!project) {
          res.status(404).send('Not found');
        }
        res.render('projects/show', { project });
      })
      .catch(err => {
        res.send(err);
      });
  });

  // POST /projects - Projects create
  router.post('/', (req, res) => {
    // Validate params
    const { name } = req.body;
    if (!name) {
      res.status(422).send('Invalid value for name');
    }

    // Create project
    project.create(name)
      .then(project => {
        // Redirect to show page
        res.redirect(`/projects/${project.id}`);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  return router;
};
