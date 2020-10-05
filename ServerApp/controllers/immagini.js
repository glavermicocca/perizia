const uuid = require("uuid");
const fs = require("fs");
const path = require("path");

const getTableData = (req, res, db) => {
  const { id } = req.query;
  db.select("*")
    .from("immagini")
    .where({ id })
    .then((items) => {
      res.json(items);
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

const postTableData = (req, res, db) => {
  const { originalname } = req.file;
  const ext = path.extname(originalname);
  const filename = uuid.v4() + ext;
  const id = req.headers["id"];



  var serverLocation = path.join(__dirname, "..", "img");
  if (!fs.existsSync(serverLocation)) {
    fs.mkdirSync(serverLocation);
  }

  serverLocation = path.join(serverLocation, filename)

  db("immagini")
    .insert({ id, originalname, filename })
    .returning("*")
    .then((item) => {
      fs.writeFileSync(serverLocation, req.file.buffer);
      fs.chmodSync(serverLocation, 4);
      res.json(item);
      //res.json({ success: true })
    })
    .catch((err) => res.status(400).json({ dbError: err }));
};

const deleteTableData = (req, res, db) => {
  const { filename } = req.body;
  db("immagini")
    .where({ filename })
    .del()
    .then(() => {
      const pathFilename = path.join(__dirname, "..", "img", filename);
      fs.unlinkSync(pathFilename);
      res.json({ delete: true });
    })
    .catch((err) => res.status(400).json({ dbError: err }));
};

module.exports = {
  getTableData,
  postTableData,
  deleteTableData,
};
