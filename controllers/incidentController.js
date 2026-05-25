const incidentModel =
    require("../models/incidentModel");

/*
========================================
CREATE INCIDENT
========================================
*/

const createIncident = (req, res) => {

    const {
        title,
        location,
        description
    } = req.body;

    if (
        !title ||
        !location ||
        !description
    ) {

        return res.status(400).json({
            error: "All fields are required"
        });

    }

    incidentModel.createIncident(

        title,
        location,
        description,

        (err, result) => {

            if (err) {

                console.error(err.message);

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json({

                message:
                    "Incident reported successfully",

                incidentId:
                    result.lastID

            });

        }

    );

};

/*
========================================
GET ALL INCIDENTS
========================================
*/

const getAllIncidents = (req, res) => {

    incidentModel.getAllIncidents(

        (err, rows) => {

            if (err) {

                console.error(err.message);

                return res.status(500).json({
                    error: err.message
                });

            }

            res.json(rows);

        }

    );

};

module.exports = {

    createIncident,
    getAllIncidents

};