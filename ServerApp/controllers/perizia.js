const getTableData = (req, res, db) => {
  db.select('*').from('perizia')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json({ dataExists: 'false' })
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const postPerizia = (req, res, db) => {
  const { stato, anno, valore, uuid } = req.body
  db.select('*').from('perizia').where({ stato, anno, valore, uuid })
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json({ dataExists: 'false' })
      }
    })
    .catch(err => 
      res.status(400).json({ dbError: 'db error' })
      )
}

const postTableData = (req, res, db) => {
  const { stato, anno, uuid, valore, descrizione, periodo, valuta, zecca, lega_metallica, orientamento_asse, contorno, riferimento, data_perizia,
    peso, diametro, spessore, conservazione, rarita, variante, collegamento, note } = req.body
  const added = new Date()
  db('perizia').insert({
    stato, anno, uuid, valore, descrizione, periodo, valuta, zecca, lega_metallica, orientamento_asse, contorno, riferimento, data_perizia,
    peso, diametro, spessore, conservazione, rarita, variante, collegamento, note, added
  })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err =>
      res.status(400).json({ dbError: 'db error' }))
}

const putTableData = (req, res, db) => {
  const { id, stato, anno, uuid, valore, descrizione, periodo, valuta, zecca, lega_metallica, orientamento_asse, contorno, riferimento, data_perizia,
    peso, diametro, spessore, conservazione, rarita, variante, collegamento, note } = req.body
  db('perizia').where({ id }).update({
    stato, anno, uuid, valore, descrizione, periodo, valuta, zecca, lega_metallica, orientamento_asse, contorno, riferimento, data_perizia,
    peso, diametro, spessore, conservazione, rarita, variante, collegamento, note
  })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('perizia').where({ id }).del()
    .then(() => {
      res.json({ delete: 'true' })
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  postPerizia
}