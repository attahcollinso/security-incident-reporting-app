const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
    "./database/incidents.db",
    (err) => {

        if (err) {
            console.error(err.message);
        } else {
            console.log("Connected to SQLite database.");
        }

    }
);

db.serialize(() => {

    /*
    ========================================
    CREATE INCIDENTS TABLE
    ========================================
    */

    db.run(`
        CREATE TABLE IF NOT EXISTS incidents (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            title TEXT NOT NULL,

            location TEXT NOT NULL,

            description TEXT NOT NULL,

            category TEXT DEFAULT 'Other',

            severity TEXT DEFAULT 'Medium',

            status TEXT DEFAULT 'Open',

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    /*
    ========================================
    DATABASE MIGRATION
    ========================================
    */

    db.all(
        `PRAGMA table_info(incidents)`,
        [],
        (err, columns) => {

            if (err) {

                console.error(
                    "Unable to inspect database:",
                    err.message
                );

                return;
            }

            const columnNames =
                columns.map(
                    column => column.name
                );

            /*
            Add category if it does not exist
            */

            if (!columnNames.includes("category")) {

                db.run(`
                    ALTER TABLE incidents
                    ADD COLUMN category TEXT
                    DEFAULT 'Other'
                `);

            }

            /*
            Add severity if it does not exist
            */

            if (!columnNames.includes("severity")) {

                db.run(`
                    ALTER TABLE incidents
                    ADD COLUMN severity TEXT
                    DEFAULT 'Medium'
                `);

            }

            /*
            Add status if it does not exist
            */

            if (!columnNames.includes("status")) {

                db.run(`
                    ALTER TABLE incidents
                    ADD COLUMN status TEXT
                    DEFAULT 'Open'
                `);

            }

        }
    );

});

module.exports = db;