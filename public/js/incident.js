/*
========================================
LOAD INCIDENT DETAILS
========================================
*/

async function loadIncidentDetails() {

    const container =
        document.getElementById(
            "incidentDetails"
        );

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        params.get("id");

    /*
    ========================================
    VALIDATE INCIDENT ID
    ========================================
    */

    if (
        !id ||
        !/^[1-9]\d*$/.test(id)
    ) {

        container.textContent =
            "Invalid incident ID. Please return to the reports list.";

        return;

    }

    try {

        const response =
            await fetch(
                `/api/incidents/${encodeURIComponent(id)}`
            );

        const data =
            await response.json();

        /*
        ========================================
        HANDLE API ERRORS
        ========================================
        */

        if (!response.ok) {

            container.textContent =
                data.error ||
                "Unable to retrieve incident details.";

            return;

        }

        /*
        ========================================
        BUILD INCIDENT DETAILS
        ========================================
        */

        container.innerHTML = "";

        const card =
            document.createElement("div");

        card.classList.add("card");

        const title =
            document.createElement("h2");

        title.textContent =
            data.title;

        card.appendChild(title);

        const fields = [
            ["Incident ID", data.id],
            ["Location", data.location],
            ["Category", data.category || "Other"],
            ["Severity", data.severity || "Medium"],
            ["Status", data.status || "Open"],
            ["Description", data.description],
            ["Date Reported", data.created_at]
        ];

        fields.forEach(([label, value]) => {

            const paragraph =
                document.createElement("p");

            const strong =
                document.createElement("strong");

            strong.textContent =
                `${label}: `;

            paragraph.appendChild(strong);

            paragraph.appendChild(
                document.createTextNode(
                    value ?? ""
                )
            );

            card.appendChild(paragraph);

        });

        container.appendChild(card);

    } catch (error) {

        console.error(error);

        container.textContent =
            "Unable to connect to the server. Please try again.";

    }

}

loadIncidentDetails();