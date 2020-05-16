const sql = require('./db.js');
const order = require('./order.model.js');
const product = require('./product.model.js');

//constructor
const order_detail = function(order_detail) {
    this.id_order = order_detail.id_order;
    this.id_product = order_detail.id_product;
    this.unit_price = order_detail.unit_price;
    this.quantity = order_detail.quantity;
};

order_detail.create = (newOrderDetail, result) => {
    order.findById(newOrderDetail.id_order, (err, data) => {
        if (err) {
            result(err, null);
          } else {
            product.findById(newOrderDetail.id_product, (err, data) => {
              if (err) {
                    result(err, null);
                } else {
                    sql.query('INSERT INTO order_detail SET ?', newOrderDetail, (err, res) => {
                        if (err) {
                            result(err, null);
                            return;
                        }
                        result(null, { id: res.insertId, ...newOrderDetail });
                    })
                }
            })
        }
    });
};

order_detail.createMultiple = (multipleNewOrderDetail, result) => {
  //multipleNewOrderDetail[0][0], first we select the first item of the array, and the order id is the first element of each order detail
  order.findById(multipleNewOrderDetail[0][0], (err, data) => {
    if (err) {
      result(err, null);
    } else {
      sql.query('INSERT INTO order_detail (id_order, id_product, unit_price, quantity) VALUES ?', [multipleNewOrderDetail], (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, { id: res.insertId, ...multipleNewOrderDetail });
      })
    }
  })
}

order_detail.findAll = result => {
  sql.query("SELECT * FROM order_detail", (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

order_detail.findById = (id_order_detail, result) => {
    sql.query(`SELECT * FROM order_detail WHERE id_order_detail = ${id_order_detail}`, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
  
      // not found order_detail with the passed id_order_detail
      result({ kind: "not_found" }, null);
    });
  };
  
  order_detail.findAllByOrderId = (id_order, result) => {
    sql.query(`SELECT * FROM order_detail WHERE id_order = ${id_order}`, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }
  
      // not found order_detail with the passed id_order
      result({ kind: "not_found" }, null);
    });
  };

  order_detail.findAllByProductId = (id_product, result) => {
    sql.query(`SELECT * FROM order_detail WHERE id_product = ${id_product}`, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }
  
      // not found order_detail with the passed id_product
      result({ kind: "not_found" }, null);
    });
  };
  
  order_detail.remove = (id_order_detail, result) => {
    sql.query("DELETE FROM order_detail WHERE id_order_detail = ?", id_order_detail, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found order_detail with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      result(null, res);
    });
  };
  
  module.exports = order_detail;