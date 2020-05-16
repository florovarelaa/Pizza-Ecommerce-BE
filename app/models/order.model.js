const sql = require('./db.js');
const user = require('./user.model.js');

//constructor
const order = function(order) {
    this.id_user = order.id_user,
    this.ship_address = order.ship_address
};

order.create = (newOrder, result) => {
    user.findById(newOrder.id_user, (err, data) => {
        if (err) {
            result(err, null);
        } else {
            sql.query('INSERT INTO orders SET ?', newOrder, (err, res) => {
                if (err) {
                    console.error('error', err);
                    result(err, null);
                    return;
                }
                result(null, {id_order: res.insertId, ...newOrder });
            })
        }
    });
}

  order.findAll = result => {
    sql.query("SELECT * FROM orders", (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(null, err);
        return;
      }
  
      result(null, res);
    });
  };

order.findById = (id_order, result) => {
    sql.query(`SELECT * FROM orders WHERE id_order = ${id_order}`, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
  
      // not found order with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  order.findByUserId = (id_user, result) => {
    sql.query(`SELECT * FROM orders WHERE id_user = ${id_user}`, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res);
        return;
      }
  
      // not found order with the passed id_user
      result({ kind: "not_found" }, null);
    });
  };
  
  order.remove = (id_order, result) => {
    sql.query("DELETE FROM orders WHERE id_order = ?", id_order, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found order with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      result(null, res);
    });
  };
  
  module.exports = order;