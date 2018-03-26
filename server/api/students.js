const router = require('express').Router()
const {Student} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.json(students))
    .catch(next)
})

router.get('/:studentId', (req, res, next) => {
    Student.findById(req.params.studentId)
      .then(student => res.json(student))
      .catch(next)
  })

  router.post('/',(req, res, next) => {
    Student.create(req.body)
      .then(student => {
        res.status(204).json(student)
      })
      .catch(next)
  })
  
  router.put('/:id',(req, res, next) => {
    Student.update(req.body, { where: { id: req.params.id}, returning: true })
      .then(([num, updated]) => res.json(updated[0]))
      .catch(next)
  })
  
  router.delete('/:id',(req, res, next) => {
    Student.destroy({ where: { id: req.params.id }})
      .then(() => res.sendStatus(204))
      .catch(next)
  })