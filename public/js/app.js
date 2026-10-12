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

        if (!response.ok) {
            throw new Error(
                "Failed to retrieve incidents"
            );
        }

        const incidents =
            await response.json();

        list.innerHTML = "";

        if (incidents.length === 0) {

            const emptyMessage =
                document.createElement("p");

            emptyMessage.textContent =
                "No incidents reported yet.";

            list.appendChild(emptyMessage);

            return;

        }

        incidents.forEach((incident) => {

            const card =
                document.createElement("div");

            card.classList.add("card");

            const title =
                document.createElement("h2");

            title.textContent =
                incident.title;

            card.appendChild(title);

            const fields = [
                ["Location", incident.location],
                ["Category", incident.category || "Other"],
                ["Severity", incident.severity || "Medium"],
                ["Status", incident.status || "Open"],
                ["Description", incident.description],
                ["Date", incident.created_at]
            ];

            fields.forEach(([label, value]) => {

                const paragraph =
                    document.createElement("p");

                const strong =
                    document.createElement("strong");

                strong.textContent = `${label}: `;

                paragraph.appendChild(strong);

                paragraph.appendChild(
                    document.createTextNode(value ?? "")
                );

                card.appendChild(paragraph);

            });

            const detailsLink =
                document.createElement("a");

            detailsLink.href =
                `incident.html?id=${encodeURIComponent(incident.id)}`;

            detailsLink.textContent =
                "View Details";

            detailsLink.classList.add(
                "details-link"
            );

            card.appendChild(detailsLink);

            list.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        list.innerHTML =
            "<p>Unable to load incidents. Please try again.</p>";

    }

}

loadIncidents();