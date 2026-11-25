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


/*
========================================
UPDATE INCIDENT STATUS
========================================
*/

const updateIncidentStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body || {};

    const allowedStatuses = [
        "Open",
        "In Progress",
        "Resolved"
    ];

    if (
        !/^[1-9]\d*$/.test(id) ||
        !Number.isSafeInteger(Number(id))
    ) {

        return res.status(400).json({
            error: "Invalid incident ID"
        });

    }

    /*
    ========================================
    VALIDATE STATUS
    ========================================
    */

    if (!allowedStatuses.includes(status)) {

        return res.status(400).json({
            error:
                "Invalid status. Allowed values are Open, In Progress, and Resolved."
        });

    }

    /*
    ========================================
    UPDATE STATUS
    ========================================
    */

    incidentModel.updateIncidentStatus(
        id,
        status,
        (err, result) => {

            if (err) {

                console.error(err.message);

                return res.status(500).json({
                    error:
                        "Failed to update incident status"
                });

            }

            if (result.changes === 0) {

                return res.status(404).json({
                    error:
                        "Incident not found"
                });

            }

            res.json({
                message:
                    "Incident status updated successfully",
                incidentId: Number(id),
                status
            });

        }
    );

};

module.exports = {

    createIncident,
    getAllIncidents,
    getIncidentById,
    updateIncidentStatus

};