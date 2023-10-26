const db = require("../../../database/databaseconfig");

const GetCredencial = async (username) => {
  return (
    await db.query(
      "select username, password " +
        "from usuarios where username = $1 and deleted = false",
      [username]
    )
  ).rows;
};

module.exports = {
  GetCredencial,
};
