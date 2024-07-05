//Source : https://salesforce.stackexchange.com/questions/15328/export-results-from-developer-console-query-editor
var o = document.evaluate("//div[@id='editors-body']/div[not(contains(@style,'display:none') or contains(@style,'display: none'))]//table/tbody/tr", document, null, 0, null);
var r = [];
while (row = o.iterateNext()) {
    var cols = row.getElementsByTagName('td');
    var a = [];

    for (var i = 0; i < cols.length; i++) {
        a.push(formatData(cols[i].textContent));
    }

    r.push(a);
}

// generating csv file
var csv = "data:text/csv;charset=utf-8,filename=download.csv,";
var rows = [];

for (var i = 0; i < r.length; i++) {
    rows.push(r[i].join(","));
}

csv += rows.join('\r\n');

popup(csv);

function formatData(input) {
    // replace " with “
    var regexp = new RegExp(/["]/g);
    var output = input.replace(regexp, "“");
    //HTML
    var regexp = new RegExp(/\<[^\<]+\>/g);
    var output = output.replace(regexp, "");
    if (output == "") return '';
    return '"' + output + '"';
}

// showing data in window for copy/ paste
function popup(data) {
    return rows;
}