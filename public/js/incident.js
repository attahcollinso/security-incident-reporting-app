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
        renderStatusUpdateForm(card, data);

    } catch (error) {

        console.error(error);

        container.textContent =
            "Unable to connect to the server. Please try again.";

    }

}


/*
========================================
RENDER INCIDENT STATUS UPDATE FORM
========================================
*/

function renderStatusUpdateForm(card, incident) {

    const form = document.createElement("form");
    form.id = "statusUpdateForm";

    const label = document.createElement("label");
    label.htmlFor = "incidentStatus";
    label.textContent = "Update Status";

    const select = document.createElement("select");
    select.id = "incidentStatus";
    select.name = "status";
    select.required = true;

    const statuses = [
        "Open",
        "In Progress",
        "Resolved"
    ];

    statuses.forEach((status) => {

        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        option.selected = status === (incident.status || "Open");

        select.appendChild(option);

    });

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Save Status";

    const message = document.createElement("p");
    message.id = "statusUpdateMessage";
    message.setAttribute("aria-live", "polite");

    form.append(label, select, button, message);

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        button.disabled = true;
        message.textContent = "Updating status...";

        try {

            const response = await fetch(
                `/api/incidents/${encodeURIComponent(incident.id)}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: select.value
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {

                message.textContent =
                    result.error || "Unable to update status.";

                return;

            }

            await loadIncidentDetails();

        } catch (error) {

            console.error(error);

            message.textContent =
                "Unable to connect to the server. Please try again.";

        } finally {

            button.disabled = false;

        }

    });

    card.appendChild(form);

}

loadIncidentDetails();