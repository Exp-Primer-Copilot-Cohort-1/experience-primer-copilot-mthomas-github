// Create web server 
// Create a route that returns all comments
// Create a route that returns a single comment by id
// Create a route that creates a new comment
// Create a route that updates a comment by id
// Create a route that deletes a comment by id

// Create a route that returns all comments
router.get('/', (req, res) => {
  res.json(comments);
})

// Create a route that returns a single comment by id
router.get('/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found');
  res.json(comment);
})

// Create a route that creates a new comment
router.post('/', (req, res) => {
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    comment: req.body.comment
  }
  comments.push(comment);
  res.json(comment);
})

// Create a route that updates a comment by id
router.put('/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found');

  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  comment.name = req.body.name;
  comment.comment = req.body.comment;
  res.json(comment);
})

// Create a route that deletes a comment by id
router.delete('/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found');

  const index = comments.indexOf(comment);
  comments.splice(index, 1);
  res.json(comment);
})

// Create a function to validate a comment
function validateComment(comment) {
  const schema = {
    name: Joi.string().min(3).required(),
    comment: Joi.string().min(10).required()
  }
  return Joi.validate(comment, schema);
}

// Export the router
module.exports
