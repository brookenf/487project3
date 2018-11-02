$(function(){
  console.log('DOM is loaded');

  //building the high chart
  $.getJSON('js/rates.json', function (data) {
    console.log(data);
    // Make codes uppercase to match the map data
    $.each(data, function (i, item) {
        //this.code = this.code.toUpperCase();
    });



    // Instantiate the map
    Highcharts.mapChart('chart1', {

        chart: {
            map: 'countries/us/us-all',
            borderWidth: 1
        },

        title: {
            text: 'US Rates of Suicide (per 100,000)'
        },

        legend: {
            layout: 'horizontal',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            floating: true,
            verticalAlign: 'top',
            y: 25
        },

        mapNavigation: {
            enabled: true
        },

        colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#EFEFFF'],
                [0.67, '#4444FF'],
                [1, '#000022']
            ]
        },

        series: [{
            animation: {
                duration: 1000
            },
            data: data,
            joinBy: ['postal-code', 'ST'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                format: '{point.ST}'
            },
            name: 'Number of Suicide Deaths',
            tooltip: {
                pointFormat: '{point.ST}: {point.Deaths}'
            }
        }]
    });
});//closing of the .getJSON







});//closing of document.ready
