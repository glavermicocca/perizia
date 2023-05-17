const getTableData = (req, res, db) => {
    const { id_perizia } = req.body
    db.select('*')
        .from('errori_di_coniazione')
        .where({ id_perizia })
        .then((items) => {
            if (items.length) {
                res.json(items)
            } else {
                res.json({ dataExists: 'false' })
            }
        })
        .catch((err) => res.status(400).json({ dbError: err }))
}

const postTableData = async (req, res, db) => {
    const { id_perizia } = req.body

    db('errori_di_coniazione')
        .insert({ id_perizia })

        .then(async (item) => {
            if (item.length > 0) {
                const it = item[0]
                const row = await db('errori_di_coniazione')
                    .select('*')
                    .where('id', '=', it)
                res.json(row)
            }
        })
        .catch((err) => res.status(400).json({ dbError: err }))
}

const putTableData = (req, res, db) => {
    const { rowId, dataField, newValue } = req.body
    db('errori_di_coniazione')
        .where({ id: rowId })
        .update({ [dataField]: newValue })

        .then(async (item) => {
            const row = await db('errori_di_coniazione')
                .select('*')
                .where('id', '=', rowId)
            res.json(row)
        })
        .catch((err) => res.status(400).json({ dbError: err }))
}

const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('errori_di_coniazione')
        .where({ id })
        .del()
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch((err) => res.status(400).json({ dbError: err }))
}

const getTableDataQuery = (req, res, db) => {
    genericPagination(req, res, db, 'errori_di_coniazione')
}

function genericPagination(req, res, db, tableName) {
    var reqData = req.body
    var pagination = {}
    var per_page = reqData.sizePerPage
    var page = reqData.page
    var sortField = reqData.sortField
    var sortOrder = reqData.sortOrder
    var filters = reqData.filters
    var id_perizia = reqData.id_perizia

    if (page < 1) page = 1
    var offset = (page - 1) * per_page

    var query = db.select('*').from(tableName).where({ id_perizia })

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

module.exports = {
    getTableData,
    getTableDataQuery,
    postTableData,
    putTableData,
    deleteTableData,
}
