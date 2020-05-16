const sql = require('./db.js');

//constructor
const user = function(user) {
    this.username = user.username,
    this.pass = user.pass,
    this.firstname = user.firstname,
    this.lastname = user.lastname,
    this.email = user.email
};

user.create = (newUser, result) => {
    //Since we are only receiveing email we only update that field if it exists... This logic should be improved
    sql.query(`INSERT INTO users SET ?
              ON DUPLICATE KEY UPDATE
                id_user = LAST_INSERT_ID(id_user),
                username = username,
                pass = pass,
                firstname = firstname,
                lastname = lastname,
                email = VALUES(email);`, newUser, (err, res) => {
        if (err) {
            console.error('error', err);
            result(err, null);
            return;
        }
        result(null, {id_user: res.insertId, ...newUser });
    })
}

user.findById = (id_user, result) => {
    sql.query(`SELECT * FROM users WHERE id_user = ${id_user}`, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
  
      // not found user with the id
      result({ kind: "not_found" }, null);
    });
  };

user.findByUsername = (username, result) => {
    sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
  
      // not found user with the provided username
      result({ kind: "not_found" }, null);
    });
  };
  
  user.findAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(null, err);
        return;
      }
  
      result(null, res);
    });
  };
  
  user.updateById = (id, user, result) => {
    sql.query(
      `UPDATE users 
      SET
        firstname = ?,
        lastname = ?,
        email = ?
      WHERE id_user = ${id}
      `,
      [user.firstname, user.lastname, user.email],
      (err, res, fields) => {
        if (err) {
          console.error("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found user with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        result(null, { id: id, ...user });
      }
    );
  };
  
  user.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id_user = ?", id, (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      result(null, res);
    });
  };
  
  module.exports = user;