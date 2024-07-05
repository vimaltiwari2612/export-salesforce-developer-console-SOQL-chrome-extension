var tab;
let border = 'style ="border : 2px Solid black; border-collapse: collapse;"';
formTable = (csv) => {
    var downloadCSV = "data:text/csv;charset=utf-8,filename=download.csv,";
    downloadCSV += csv.join('\r\n');
    let tableHTML = '<a href="' + encodeURI(downloadCSV) + '" download="Sf_export.csv">Download CSV</a><br><br><table ' + border + '">';
    let headerFound = false;
    for (i in csv) {
        if (!headerFound) {
            let header = csv[i];
            let headerItems = header.substring(header.toLowerCase().indexOf('select ') + 7, header.indexOf('from')).split(',');
            tableHTML += '<tr ' + border + '><thead>';
            headerItems.forEach(item => {
                tableHTML += '<td ' + border + '><b>' + item.trim() + '</b></td>';
            });
            tableHTML += '</thead></tr>';
            headerFound = true;
        } else {
            let cols = csv[i];
            if (cols) {
                tableHTML += '<tr ' + border + '>';
                cols.split("\"").filter(item => item.trim() != '' && item.trim() != ',').forEach(item => {
                    tableHTML += '<td ' + border + '>' + item.trim() + '</td>';
                });
                tableHTML += '</tr>';
            }
        }
    }
    tableHTML += '</table>';
    document.getElementById('data').innerHTML = tableHTML;
}

// showing data in window for copy/ paste
function popup() {
    if (tab.url && tab.url.indexOf('common/apex/debug/ApexCSIPage') != -1) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            files: ["exportData.js"],
        }, (data) => {
            formTable(data[0].result);
        });
    } else {
        alert('Please navigate to an active tab of Salesforce Developer Console.');
    }
}

chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function (tabs) {
    // and use that tab to fill in out title and url
    tab = tabs[0];
    popup();
});

