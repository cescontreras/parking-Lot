
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

var port = process.env.PORT || 3001
// Syncing all the models at once.

conn.sync({ force: false }).then(() => {
    server.listen(port, () => {
        console.log(`server listening at port ${port}`); // eslint-disable-line no-console
    });
});