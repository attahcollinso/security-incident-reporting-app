const db = require("../database/db");

/*
========================================
CREATE INCIDENT
========================================
*/

const createIncident = (
    title,
    location,
    description,
    category,
    severity,
    status,
    callback
) => {

    const sql = `
        INSERT INTO incidents
        (
            title,
            location,
            description,
            category,
            severity,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            title,
            location,
            description,
            category,
            severity,
            status
        ],
        function(err) {

            callback(err, this);

        }
    );

};

/*
========================================
GET ALL INCIDENTS
========================================
*/

const getAllIncidents = (callback) => {

    const sql = `
        SELECT *
        FROM incidents
        ORDER BY created_at DESC
    `;

    db.all(
        sql,
        [],
        (err, rows) => {

            callback(err, rows);

        }
    );

};

module.exports = {

    createIncident,
    getAllIncidents

};