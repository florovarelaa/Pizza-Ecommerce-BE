const sql = require('./db.js');

//constructor
const product = function(product) {
    this.product_name = product.product_name,
    this.unit_price = product.unit_price,
    this.description = product.description,
    this.product_imgUrl = product.product_imgUrl
};

product.create = (newProduct, result) => {
    sql.query('INSERT INTO products SET ?', newProduct, (err, res) => {
        if (err) {
            console.error('error', err);
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newProduct });
    })
}

product.findById = (id_product, result) => {
    sql.query(`SELECT * FROM products WHERE id_product = ${id_product}`, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }
  
      // not found product with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  product.findAll = result => {
    sql.query("SELECT * FROM products", (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    });
  };
  
  product.updateById = (id, product, result) => {
    sql.query(
      `UPDATE products 
      SET
        product_name = ?,
        unit_price = ?
      WHERE id_product = ${id}
      `,
      [product.product_name, product.unit_price ? product.unit_price : 0],
      (err, res, fields) => {
        if (err) {
          console.error("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found product with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        result(null, { id: id, ...product });
      }
    );
  };
  
  product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id_product = ?", id, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found product with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      result(null, res);
    });
  };
  
  module.exports = product;