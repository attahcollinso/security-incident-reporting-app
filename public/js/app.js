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
                ).value;

            const location =
                document.getElementById(
                    "location"
                ).value;

            const description =
                document.getElementById(
                    "description"
                ).value;

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
                            description

                        })

                    }
                );

            const data =
                await response.json();

            document.getElementById(
                "message"
            ).innerText =
                data.message;

            form.reset();

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