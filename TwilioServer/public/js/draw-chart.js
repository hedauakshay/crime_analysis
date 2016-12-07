function draw_chart(type_disaster) {
    var type = [];
    var yearOfOccurrence = [];
    var noOfOccurrence = [];
    var uniqueYears = [];
    var prev;
    jQuery.ajax({
        type: "GET",
        url: "/disasters?disaster_type="+type_disaster,
        contentType: "application/json; charset=utf-8",

        success: function(data, status, jqXHR) {

            for (var i = 0; i < data.count; i++) {
                if (data.disasters[i].fields.date.created) {
                    data.disasters[i].fields.date.created = data.disasters[i].fields.date.created.replace(data.disasters[i].fields.date.created.substring(4, data.disasters[i].fields.date.created.length), "");
                    yearOfOccurrence[i] = data.disasters[i].fields.date.created;
                }
            }

            $.each(yearOfOccurrence, function(i, el) {
                if ($.inArray(el, uniqueYears) === -1) uniqueYears.push(el);
            });

            for (var i = 0; i < uniqueYears.length; i++) {
                type[i] = data.disasters[i].fields.primary_type.name;
            }

            for (var i = 0; i < yearOfOccurrence.length; i++) {

                if (yearOfOccurrence[i] != prev) {
                    noOfOccurrence.push(1);

                } else {
                    noOfOccurrence[noOfOccurrence.length - 1]++;
                }

                prev = yearOfOccurrence[i];

            }

            series = generateData(uniqueYears, type, noOfOccurrence);



            function generateData(dates, names, times) {
                var ret = {},
                    ps = [],
                    series = [],
                    len = dates.length;

                //concat to get points
                for (var i = 0; i < len; i++) {
                    ps[i] = {
                        x: dates[i],
                        y: times[i],
                        n: names[i]
                    };
                }
                names = [];
                //generate series and split points
                for (i = 0; i < len; i++) {
                    var p = ps[i],
                        sIndex = $.inArray(p.n, names);

                    if (sIndex < 0) {
                        sIndex = names.push(p.n) - 1;
                        series.push({
                            name: p.n,
                            data: []
                        });
                    }
                    series[sIndex].data.push(p);
                }
                return series;
            }




            $('#chart-container').highcharts({
                title: {
                    text: type_disaster[0].toUpperCase()+type_disaster.substring(1,type_disaster.length),
                    x: -20 //center
                },
                subtitle: {
                    text: 'Year',
                    x: -20
                },
                yAxis: {
                    title: {
                        text: 'Occurrence'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ' Times'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: series
            });
        },

        error: function(jqXHR, status) {
            console.log(status);
        }
    });
}