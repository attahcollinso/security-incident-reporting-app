/*
========================================
SUBMIT INCIDENT
========================================
*/

const form =
    document.getElementById(
        "incidentForm"
    );

if (form) {

    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            const title =
                document.getElementById(
                    "title"
                ).value.trim();

            const location =
                document.getElementById(
                    "location"
                ).value.trim();

            const category =
                document.getElementById(
                    "category"
                ).value;

            const severity =
                document.getElementById(
                    "severity"
                ).value;

            const description =
                document.getElementById(
                    "description"
                ).value.trim();

            const message =
                document.getElementById(
                    "message"
                );

            try {

                const response =
                    await fetch(
                        "/api/incidents",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                title,
                                location,
                                category,
                                severity,
                                description

                            })

                        }
                    );

                const data =
                    await response.json();

                /*
                ========================================
                HANDLE SERVER ERRORS
                ========================================
                */

                if (!response.ok) {

                    message.innerText =
                        data.error ||
                        "Failed to report incident";

                    return;

                }

                /*
                ========================================
                SUCCESS MESSAGE
                ========================================
                */

                message.innerText =
                    data.message;

                form.reset();

            } catch (error) {

                console.error(error);

                message.innerText =
                    "Unable to connect to the server.";

            }

        }
    );

}

/*
========================================
LOAD INCIDENTS
========================================
*/

async function loadIncidents() {

    const list =
        document.getElementById(
            "incidentList"
        );

    if (!list) return;

    try {

        const response =
            await fetch(
                "/api/incidents"
            );

        const incidents =
            await response.json();

        list.innerHTML = "";

        if (
            incidents.length === 0
        ) {

            list.innerHTML =
                "<p>No incidents reported yet.</p>";

            return;

        }

        incidents.forEach(
            (incident) => {

                const card =
                    document.createElement(
                        "div"
                    );

                card.classList.add(
                    "card"
                );

                card.innerHTML = `

                    <h2>
                        ${incident.title}
                    </h2>

                    <p>
                        <strong>Location:</strong>
                        ${incident.location}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${incident.category}
                    </p>

                    <p>
                        <strong>Severity:</strong>
                        ${incident.severity}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        ${incident.status}
                    </p>

                    <p>
                        ${incident.description}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        ${incident.created_at}
                    </p>

                `;

                list.appendChild(card);

            }
        );

    } catch(error) {

        console.log(error);

    }

}

loadIncidents();