const getTableData = (req, res, db) => {
  db.select("*")
    .from("perizia")
    .orderBy("id")
    .then((items) => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch((err) => res.status(400).json({ dbError: "db error", err }));
};

const getTableDatap = (req, res, db) => {
  let page = req.query.page;
  let sizePerPage = req.query.sizePerPage;
  genericPagination(req, res, db, "perizia");
};

function genericPagination(req, res, db, tableName) {
  var reqData = req.body;
  var pagination = {};
  var per_page = reqData.sizePerPage;
  var page = reqData.page;
  var sortField = reqData.sortField;
  var sortOrder = reqData.sortOrder;
  var filters = reqData.filters;

  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;

  var query = db.select("*").from(tableName).offset(offset).limit(per_page);

  if (sortField != null) {
    query.orderBy(sortField, sortOrder);
  }

  if (filters != null) {
    var first = true;
    for (let key of Object.keys(filters)) {
      if (first) {
        first = false;
        if (filters[key].caseSensitive == true) {
          query.where(
            key,
            filters[key].comparator,
            "%" + filters[key].filterVal + "%"
          );
        } else {
          query.where(key, "ILIKE", "%" + filters[key].filterVal + "%");
        }
      } else {
        if (filters[key].caseSensitive == true) {
          query.orWhere(
            key,
            filters[key].comparator,
            "%" + filters[key].filterVal + "%"
          );
        } else {
          query.orWhere(key, "ILIKE", "%" + filters[key].filterVal + "%");
        }
      }
    }
  }

  return Promise.all([db.count("* as count").from(tableName).first(), query])
    .then(([total, rows]) => {
      var count = total.count;
      var rows = rows;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      res.json(pagination);
      // if (rows.length) {
      // } else {
      //   res.json({ dataExists: 'false' })
      // }
    })
    .catch((err) =>
      res.status(400).json({
        dbError: "db error",
        err,
      })
    );
}

const postPerizia = (req, res, db) => {
  const { stato, anno, valore, uuid } = req.body;
  db.select("*")
    .from("perizia")
    .where({ stato, anno, valore, uuid })
    .then((items) => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

const postTableData = (req, res, db) => {
  const added = new Date();
  db("perizia")
    .insert({
      added,
    })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: err }));
};

const postTableDataOld = (req, res, db) => {
  const {
    stato,
    anno,
    uuid,
    valore,
    descrizione,
    periodo,
    valuta,
    zecca,
    lega_metallica,
    orientamento_asse,
    contorno,
    riferimento,
    data_perizia,
    peso,
    diametro,
    spessore,
    conservazione,
    rarita,
    variante,
    collegamento,
    note,
  } = req.body;
  const added = new Date();
  db("perizia")
    .insert({
      stato,
      anno,
      uuid,
      valore,
      descrizione,
      periodo,
      valuta,
      zecca,
      lega_metallica,
      orientamento_asse,
      contorno,
      riferimento,
      data_perizia,
      peso,
      diametro,
      spessore,
      conservazione,
      rarita,
      variante,
      collegamento,
      note,
      added,
    })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

const putTableData = (req, res, db) => {
  const { rowId, dataField, newValue } = req.body;
  db("perizia")
    .where({ id: rowId })
    .update({ [dataField]: newValue })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

const deleteTableData = (req, res, db) => {
  const { id } = req.body;
  db("perizia")
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: true });
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  getTableData,
  getTableDatap,
  postTableData,
  putTableData,
  deleteTableData,
  postPerizia,
};
