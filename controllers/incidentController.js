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
        description,
        category,
        severity
    } = req.body;

    /*
    ========================================
    VALIDATION
    ========================================
    */

    if (
        !title ||
        !location ||
        !description ||
        !category ||
        !severity
    ) {

        return res.status(400).json({

            error:
                "All fields are required"

        });

    }

    /*
    ========================================
    SYSTEM CONTROLLED STATUS
    ========================================
    */

    const status = "Open";

    /*
    ========================================
    CREATE INCIDENT
    ========================================
    */

    incidentModel.createIncident(

        title,
        location,
        description,
        category,
        severity,
        status,

        (err, result) => {

            if (err) {

                console.error(
                    err.message
                );

                return res.status(500).json({

                    error:
                        "Failed to report incident"

                });

            }

            res.status(201).json({

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

                console.error(
                    err.message
                );

                return res.status(500).json({

                    error:
                        "Failed to retrieve incidents"

                });

            }

            res.json(rows);

        }

    );

};

/*
========================================
GET INCIDENT BY ID
========================================
*/

const getIncidentById = (req, res) => {

    const { id } = req.params;

    incidentModel.getIncidentById(

        id,

        (err, incident) => {

            if (err) {

                console.error(
                    err.message
                );

                return res.status(500).json({

                    error:
                        "Failed to retrieve incident"

                });

            }

            if (!incident) {

                return res.status(404).json({

                    error:
                        "Incident not found"

                });

            }

            res.json(incident);

        }

    );

};

module.exports = {

    createIncident,
    getAllIncidents,
    getIncidentById

};