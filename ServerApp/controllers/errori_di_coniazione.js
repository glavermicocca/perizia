const getTableData = (req, res, db) => {
  db.select('*').from('errori_di_coniazione')
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
  const { stato, anno, valore, periodo, valuta, lega_metallica, orientamento_asse, contorno, riferimento,
    peso, diametro, spessore, conservazione, rarita, variante, note } = req.body
  const added = new Date()
  db('errori_di_coniazione').insert({
    stato, anno, valore, periodo, valuta, lega_metallica, orientamento_asse, contorno, riferimento,
    peso, diametro, spessore, conservazione, rarita, variante, note, added
  })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const putTableData = (req, res, db) => {
  const { id, stato, anno, valore, periodo, valuta, lega_metallica, orientamento_asse, contorno, riferimento,
    peso, diametro, spessore, conservazione, rarita, variante, note } = req.body
  db('errori_di_coniazione').where({ id }).update({
    stato, anno, valore, periodo, valuta, lega_metallica, orientamento_asse, contorno, riferimento,
    peso, diametro, spessore, conservazione, rarita, variante, note
  })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('errori_di_coniazione').where({ id }).del()
    .then(() => {
      res.json({ delete: 'true' })
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
}