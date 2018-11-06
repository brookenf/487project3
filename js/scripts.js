$(function(){
  console.log('DOM is loaded');

  //print the page
  $('.fa-print').click(function(){
    window.print();
  });

  //increase font size
  $('.fa-font').on('click', function() { // click to increase or decrease
    var btn = $(this),
      fontSize = parseInt(window.getComputedStyle(document.body, null).fontSize, 0); // parse the body font size as a number
    if (btn[0].id === "increase") { // detect the button being clicked
      fontSize++; // increase the base font size
    }
    document.body.style.fontSize = fontSize + 'px'; // set the body font size to the new value
  });

  //building the line chart
  var yearly = [];
  var urlLine = './js/yearly.json'
  $.ajax({
    type: 'GET',
    dataType: 'json',
    data: yearly,
    url: urlLine,
    async: true,
    success: function(yearly){
      console.log(yearly);
      var lineChart = new Taucharts.Chart({
        data: yearly,
        type: 'line',
        x: 'Year',
        y: 'CrudeRate',
        color: 'AgeGroup',
        settings: {
            asyncRendering: false,
            renderingTimeout: 10000,
            syncRenderingInterval: 50,
            handleRenderingErrors: true
        },
        guide: {
        	showAnchors: 'always',
          x: {
            label:{text: 'Year'}
          },  // custom label for X axis
          y: {
            label:{text: 'Death Rate Per 100,000'},
            min: 0,
            max: 17,
            nice: false
          },    // custom label for Y axis
          padding: {b:40,l:40,t:10,r:10}   // chart paddings
        },
        plugins: [
            Taucharts.api.plugins.get('legend')({
              position: 'bottom'
            }),
            Taucharts.api.plugins.get('tooltip')({
              fields: ['AgeGroup', 'Year', 'Deaths', 'CrudeRate'],
              formatters: {
                  AgeGroup: {
                    label: "Age Group",
                    format: function(b) {
                      return (b);
                    }
                  },
                  Year: {
                    label: "Year",
                    format: function (a) {
                        return (a);
                    }
                  },
                  Deaths: {
                      label: "Total Number",
                      format: function (a) {
                          return (a + ' deaths');
                      }
                  },
                  CrudeRate: {
                    label: "Rate",
                    format: function (a){
                      return (a + ' per 100,000');
                  }
                }
              }//closing of formatters
            })
        ]
      }).renderTo('#line-chart');
    }//closing of success
  }); //closing of line chart


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
            margin: 25,
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
            name: 'Rate of Suicide Deaths per 100,000',
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
      "targets":[0, 2]
    }]//close columnDefs
  });//close DataTable

  // building the second chart with TauCharts
  var ethnicities = [];
  var url = './js/ethnicity.json';

  $.ajax({
    type: 'GET',
    url: url,
    data: ethnicities,
    dataType: 'json',
    async: true,
    success: function(ethnicities){
      //TAU charts
      console.log(ethnicities);
      var chart = new Taucharts.Chart({
        settings: {
            asyncRendering: false,
            renderingTimeout: 10000,
            syncRenderingInterval: 50,
            handleRenderingErrors: true
        },
        guide: {
          x: {
            label:{text: 'Race'}
          },  // custom label for X axis
          y: {
            label:{text: 'Death Rate Per 100,000'},
            min: 0,
            max: 21,
            nice: false
          },    // custom label for Y axis
          padding: {b:40,l:40,t:10,r:10}   // chart paddings
        },
        data: ethnicities,
        type: 'bar',
        x: 'ethn',
        y: 'crudeRate',
        color: 'sex',
        plugins: [
          Taucharts.api.plugins.get('tooltip')({
            fields: ['sex', 'crudeNumber', 'crudeRate'],
            formatters: {
                sex: {
                  label: "Sex",
                  format: function (a) {
                      return (a);
                  }
                },
                crudeNumber: {
                    label: "Total Number",
                    format: function (a) {
                        return (a);
                    }
                },
                crudeRate: {
                  label: "Rate",
                  format: function (a){
                    return (a + ' per 100,000');
                  }
                }
              }//closing of formatters
          })
        ]//closing of the plugins
      });
      chart.renderTo('#chart2');
    }
  });




});//closing of document.ready
