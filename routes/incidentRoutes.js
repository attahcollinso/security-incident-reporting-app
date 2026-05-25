const express = require("express");

const router = express.Router();

const {
    createIncident,
    getAllIncidents
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

module.exports = router;