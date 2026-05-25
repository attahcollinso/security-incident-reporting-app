const express = require("express");
const cors = require("cors");
const path = require("path");

const incidentRoutes =
    require("./routes/incidentRoutes");

const app = express();

const PORT = 3000;

/*
========================================
MIDDLEWARE
========================================
*/

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

/*
========================================
STATIC FILES
========================================
*/

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

/*
========================================
HOME PAGE
========================================
*/

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );

});

/*
========================================
API ROUTES
========================================
*/

app.use(
    "/api/incidents",
    incidentRoutes
);

/*
========================================
START SERVER
========================================
*/

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});