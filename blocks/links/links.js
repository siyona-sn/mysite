export default async function decorate(block) {
  const link = block.querySelector('a');

  if (!link) return;

  try {
    const response = await fetch(link.href);
    const json = await response.json();

    block.innerHTML = '';

    Object.entries(json).forEach(([sheetName, sheetData]) => {
      // Skip metadata entries
      if (sheetName.startsWith(':') || !sheetData.data) {
        return;
      }

      const heading = document.createElement('h2');
      heading.textContent = sheetName;
      block.appendChild(heading);

      const table = document.createElement('table');

      // Get column names
      const headers = Object.keys(sheetData.data[0]);

      // Header
      const thead = document.createElement('thead');
      const headRow = document.createElement('tr');

      headers.forEach((header) => {
        const th = document.createElement('th');
        th.textContent = header;
        headRow.appendChild(th);
      });

      thead.appendChild(headRow);
      table.appendChild(thead);

      // Body
      const tbody = document.createElement('tbody');
      // LIMIT = 1
      const rows = sheetData.data.slice(0, 1);

      rows.forEach((row) => {
        const tr = document.createElement('tr');

        headers.forEach((header) => {
          const td = document.createElement('td');
          td.textContent = row[header] || '';
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      block.appendChild(table);
    });
  } catch (error) {
    block.innerHTML = 'Failed to load data.';
  }
}
