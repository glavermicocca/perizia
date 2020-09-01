const uuid = require('uuid')
const fs = require('fs')

const getTableData = (req, res, db) => {
  const { id } = req.query
  db.select('*').from('immagini').where({ id })
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json({ dataExists: 'false' })
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const postTableData = (req, res, db) => {
  const { originalname } = req.file
  const path = 'img/' + uuid.v4()
  const id = req.headers['id']
  db('immagini').insert({ id, file_name: originalname, path })
    .returning('*')
    .then(item => {
      console.log(__dirname)
      fs.writeFileSync(__dirname + '/../' + path, req.file.buffer);
      fs.chmodSync(__dirname + '/../' + path, 4)
      res.json(item)
      //res.json({ success: true })
    })
    .catch(err =>
      res.status(400).json({ dbError: 'db error' })
    )
}

const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('immagini').where({ id }).del()
    .then(() => {
      res.json({ delete: 'true' })
    })
    .catch(err =>
      res.status(400).json({ dbError: 'db error' })
    )
}

module.exports = {
  getTableData,
  postTableData,
  deleteTableData
}