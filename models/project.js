module.exports = (db) => {

  const all = () =>
    db.query('SELECT * FROM projects;')
      .then(result => result.rows);

  const find = (id) =>
    db.query('SELECT * FROM projects WHERE id = $1 LIMIT 1', [id])
      .then(result => result.rows[0]);

  const findWithTasks = (id) =>
    db.query(`SELECT projects.id as project_id, projects.name as project_name, tasks.id as task_id, tasks.title as task_title, tasks.completed as task_completed
      FROM projects
      LEFT JOIN tasks on projects.id = tasks.project_id
      WHERE projects.id = $1;`, [id])
      .then(result => result.rows)
      .then(rows => {
        const project = {
          id: rows[0].project_id,
          name: rows[0].project_name,
          tasks: []
        };

        rows.forEach(row => {
          if (!row.task_id) {
            return;
          }
          const task = {
            id: row.task_id,
            title: row.task_title,
            completed: row.task_completed
          };
          project.tasks.push(task);
        });

        return project;
      });

  const create = (name) =>
    db.query('INSERT INTO projects (name) VALUES ($1) RETURNING *;', [name])
      .then(result => result.rows[0]);

  const update = (id, name) =>
    db.query('UPDATE projects SET name = $1 WHERE id = $2;', [name, id]);

  const destroy = (id) =>
    db.query('DELETE FROM projects WHERE id = $1;', [id]);

  return { all, find, findWithTasks, create, update, destroy };
};
