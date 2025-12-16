document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     QUOTE TRACKING (EXISTING)
  =============================== */

  const tableBody = document.getElementById("quotesTableBody");
  const quotes = JSON.parse(localStorage.getItem("quotes")) || [];

  if (tableBody) {
    if (quotes.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6">No quotes submitted yet.</td></tr>`;
    } else {
      quotes.forEach((quote) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${quote.date}</td>
          <td>${quote.name}</td>
          <td>${quote.email}</td>
          <td>${quote.service}</td>
          <td>${quote.urgency}</td>
          <td>${quote.details}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  }

  /* ===============================
     CALL TRACKING (NEW – ADDITIVE)
  =============================== */

  const callTableBody = document.querySelector("#callTable tbody");
  const adminLogs = JSON.parse(localStorage.getItem("adminLogs")) || [];

  if (callTableBody) {
    const callLogs = adminLogs.filter(log => log.type === "call");

    if (callLogs.length === 0) {
      callTableBody.innerHTML = `
        <tr><td colspan="3">No call activity yet.</td></tr>
      `;
    } else {
      callLogs.forEach(log => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${log.type}</td>
          <td>${log.status}</td>
          <td>${log.time}</td>
        `;
        callTableBody.appendChild(row);
      });
    }
  }
});
