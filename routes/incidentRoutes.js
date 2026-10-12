const express = require("express");

const router = express.Router();

const {
    createIncident,
    getAllIncidents,
    getIncidentById
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

module.exports = router;