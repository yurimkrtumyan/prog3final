google.charts.load('45', { packages: ['corechart', 'table'] });
google.charts.setOnLoadCallback(drawColumnChart);
google.charts.setOnLoadCallback(drawPieChart);
google.charts.setOnLoadCallback(drawTable);


function drawPieChart() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            arr = []
            arr2 = 0
            data.addColumn('string', 'Element');
            data.addColumn('number', 'Numbers');
            for (var i = 0; i < jsonData.length; i++) {
                arr.push(jsonData[i].host)
            }


            var count = {};
            arr.forEach(function (i) { count[i] = (count[i] || 0) + 1; });

            for (i in count) {
                data.addRows([
                    [i, count[i]],
                ]);
                arr2++
            }


            var options = {
                legend: 'right',
                title: 'All companies',
                is3D: false,
                width: '100%',
                height: '100%'
            };
            //console.log(data.toJSON());
            // Instantiate and draw the chart.
            var chart = new google.visualization.PieChart(document.getElementById('index2'));
            chart.draw(data, options);
        }
    });
}
function drawColumnChart() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            var arr = []
            for (var i = 0; i < jsonData.length; i++) {
                arr.push(jsonData[i].date)
            }


            var count = {};
            arr.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
            console.log(count)


            data.addColumn('string', 'monts');
            data.addColumn('number', 'Sales');
            for (var i in count) {
                data.addRow([
                    i,
                    count[i],
                ]);

            }
            var options = {
                title: 'Company Performance',
                hAxis: { title: 'Year', titleTextStyle: { color: 'black',width:'150px',height:'150px' } }
            };

            var chart = new google.visualization.ColumnChart(document.getElementById('index3'));
            chart.draw(data, options);
        }
    });
}

function drawTable() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'title');
            data.addColumn('string', 'url');
            data.addColumn('string', 'host');
            data.addColumn('string', 'comp');
            data.addColumn('string', 'date');

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].title,
                    jsonData[i].url,
                    jsonData[i].host,
                    jsonData[i].comp,
                    jsonData[i].date,
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('index'));
            var formatter = new google.visualization.BarFormat({ width: 100 });
            formatter.format(data, 3);
            table.draw(data, options);
        }
    }); 
}

$(window).resize(function () {
    drawPieChart();
    drawColumnChart();
    drawTable();
});
