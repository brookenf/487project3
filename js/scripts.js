$(function(){
  console.log('DOM is loaded');

  //building the high chart map
  $.getJSON('js/rates.json', function (data) {
    console.log(data);

    // Instantiate the map
    Highcharts.mapChart('chart1', {

        chart: {
            map: 'countries/us/us-all',
            borderWidth: 1
        },

        title: {
            text: '2008-2014 US Rates of Suicide (per 100,000) of Young Adults (10-24)'
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
            name: 'Number of Suicide Deaths per 100,000',
            tooltip: {
                pointFormat: '{point.ST}: {point.Deaths} total deaths'
            }
        }]
    });
});//closing of the .getJSON

//building the DataTable
$('#ajax-table').DataTable({
  "ajax": "./js/causes.txt",
  "columns":[
    {"data":"Rank"},
    {"data":"cause"},
    {"data":"Deaths"}
  ],
  "columnDefs":[{
    "targets":[0, 2],
    "createdCell":function(td, cellData, rowData, row, col){

    }//close createdCell
  }]//close columnDefs
});//close DataTable







});//closing of document.ready
