const getTableData = (req, res, db) => {
    db.select('*')
        .from('perizia')
        .orderBy('id')
        .then(async (perizie) => {
            if (perizie.length) {
                var id_perizia = perizie[0].id
                var errori_di_coniazione = await db
                    .select('*')
                    .from('errori_di_coniazione')
                    .where({ id_perizia })
                    .orderBy('id')

                var immagini = await db
                    .select('*')
                    .from('immagini')
                    .where({ id: id_perizia })
                    .orderBy('id')

                res.json({
                    perizia: perizie[0],
                    errori_di_coniazione: errori_di_coniazione,
                    immagini: immagini,
                })
            } else {
                res.json({ dataExists: 'false' })
            }
        })
        .catch((err) => res.status(400).json({ dbError: 'db error', err }))
}

const getTableDataQuery = (req, res, db) => {
    genericPagination(req, res, db, 'perizia')
}

function genericPagination(req, res, db, tableName) {
    var reqData = req.body
    var pagination = {}
    var per_page = reqData.sizePerPage
    var page = reqData.page
    var sortField = reqData.sortField
    var sortOrder = reqData.sortOrder
    var filters = reqData.filters

    if (page < 1) page = 1
    var offset = (page - 1) * per_page

    var query = db.select('*').from(tableName)

    if (sortField != null) {
        query.orderBy(sortField, sortOrder)
    }

    if (filters != null) {
        var first = true
        for (let key of Object.keys(filters)) {
            if (first) {
                first = false
                if (filters[key].caseSensitive == true) {
                    query.where(
                        key,
                        filters[key].comparator,
                        '%' + filters[key].filterVal + '%'
                    )
                } else {
                    query.where(key, 'LIKE', '%' + filters[key].filterVal + '%')
                }
            } else {
                if (filters[key].caseSensitive == true) {
                    query.orWhere(
                        key,
                        filters[key].comparator,
                        '%' + filters[key].filterVal + '%'
                    )
                } else {
                    query.orWhere(
                        key,
                        'LIKE',
                        '%' + filters[key].filterVal + '%'
                    )
                }
            }
        }
    }

    var queryPagination = query.clone().offset(offset).limit(per_page)

    return Promise.all([query, queryPagination])
        .then(([total, rows]) => {
            var count = total.length
            var rows = rows
            pagination.total = count
            pagination.per_page = per_page
            pagination.offset = offset
            pagination.to = offset + rows.length
            pagination.last_page = Math.ceil(count / per_page)
            pagination.current_page = page
            pagination.from = offset
            pagination.data = rows
            res.json(pagination)
        })
        .catch((err) =>
            res.status(400).json({
                dbError: 'db error',
                err,
            })
        )
}

const postPerizia = (req, res, db) => {
    const { stato, anno, valore, uuid } = req.body
    db.select('*')
        .from('perizia')
        .where({ stato, anno, valore, uuid })
        .then(async (perizie) => {
            if (perizie.length) {
                var id_perizia = perizie[0].id
                var errori_di_coniazione = await db
                    .select('*')
                    .from('errori_di_coniazione')
                    .where({ id_perizia })
                    .orderBy('id')

                var immagini = await db
                    .select('*')
                    .from('immagini')
                    .where({ id: id_perizia })
                    .orderBy('id')

                immagini.forEach((item) => {
                    item.filename = 'static/' + item.filename
                })

                res.json({
                    perizia: perizie[0],
                    errori_di_coniazione: errori_di_coniazione,
                    immagini: immagini,
                })
            } else {
                res.json({ dataExists: 'false' })
            }
        })
        .catch((err) => res.status(400).json({ dbError: err }))
}

const postTableData = async (req, res, db) => {
    const added = new Date()

    var resp = await db('perizia').max('id')

    if (resp[0].max == null) {
        resp[0].max = 0
    }

    db('perizia')
        .insert({ added /*, id: resp[0].max*/ })

        .then(async (item, items) => {
            if (item.length > 0) {
                const it = item[0]
                const row = await db('perizia').select('*').where('id', '=', it)
                res.json(row)
            }
        })
        .catch((err) => res.status(400).json({ dbError: err }))
}

const postCloneTableData = async (req, res, db) => {
    const added = new Date()

    var resp = await db('perizia').max('id')

    if (resp[0].max == null) {
        resp[0].max = 0
    }

    db('perizia')
        .insert({ added, ...req.body })

        .then(async (item) => {
            if (item.length > 0) {
                const it = item[0]
                const row = await db('perizia').select('*').where('id', '=', it)
                res.json(row)
            }
        })
        .catch((err) => res.status(400).json({ dbError: err }))
}

const putTableData = (req, res, db) => {
    const { rowId, dataField, newValue } = req.body
    db('perizia')
        .where({ id: rowId })
        .update({ [dataField]: newValue })

        .then(async (item, items) => {
            const row = await db('perizia').select('*').where('id', '=', rowId)
            res.json(row)
        })
        .catch((err) => res.status(400).json({ dbError: err }))
}

const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('perizia')
        .where({ id })
        .del()
        .then(() => {
            res.json({ delete: true })
        })
        .catch((err) => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
    getTableData,
    getTableDataQuery,
    postTableData,
    postCloneTableData,
    putTableData,
    deleteTableData,
    postPerizia,
}
