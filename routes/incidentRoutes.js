const express = require("express");

const router = express.Router();

const {
    createIncident,
    getAllIncidents,
    getIncidentById,
    updateIncidentStatus
} = require("../controllers/incidentController");

/*
========================================
ROUTES
========================================
*/

router.post(
    "/",
    createIncident
);

router.get(
    "/",
    getAllIncidents
);

router.get(
    "/:id",
    getIncidentById
);

router.patch(
    "/:id/status",
    updateIncidentStatus
);

module.exports = router;