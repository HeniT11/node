const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course not found");
  else res.send(course);
});

router.post("/", (req, res) => {
  const result = validateCourse(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  if (!req.body.name || req.body.name.length < 3) {
    res.status(400).send("Name is required and should be minimum 3 characters");
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course not found");
  const result = validateCourse(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(course, schema);
  return result;
}

module.exports = router;
