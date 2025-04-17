let tempData = [0,0,0,0,0];
let humData = [0,0,0,0,0];
let pm25Data = [0,0,0,0,0];
  
  var tempChart = new ApexCharts(document.querySelector("#tempChart"), {
    chart: {
      type: 'bar',
      width: '50%'
    },
    series: [{
      name: 'temps',
      data: tempData
    }],
    xaxis: {
      categories: ['Lefka','Paralia','University of Patras','Kastelokampos','Demenika']
    },
    fill: {
      colors: ['#ff00ff']
    },
    
  });
  tempChart.render();

  var humChart = new ApexCharts(document.querySelector("#humChart"), {
    chart: {
      type: 'bar',
      width: '50%'
    },
    series: [{
      name: 'hum',
      data: humData
    }],
    xaxis: {
      categories: ['Lefka','Paralia','University of Patras','Kastelokampos','Demenika']
    },
    fill: {
      colors: ['#ff00ff']
    },
    
  });
  humChart.render();

  var pm25Chart = new ApexCharts(document.querySelector("#pm25Chart"), {
    chart: {
      type: 'bar',
      width: '50%'
    },
    series: [{
      name: 'pm25',
      data: pm25Data
    }],
    xaxis: {
      categories: ['Lefka','Paralia','University of Patras','Kastelokampos','Demenika']
    },
    fill: {
      colors: ['#ff00ff']
    },
    
  });
  pm25Chart.render();



  // const sensors = {
  //   101589: 'Lefka',
  //   101609: 'Paralia',
  //   1566: 'University of Patras',
  //   1672: 'Kastelokampos',

  //   14857: 'Demenika'
  // };

  const sensors = ['101589','101609','1566','1672','14857'];

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function getSensorData() {
    
    for (let i = 0; i<sensors.length;i++) {
      const sensorid = sensors[i];
      await delay(i * 450);

      $.ajax({

        url: `http://labserver.sense-campus.gr:5047/exmi_patras?token=studentpassword&sensorid=${sensorid}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
          console.log(data);
          tempData[i] = data.temp;
          humData[i] = data.hum;
          pm25Data[i] = data.pm25;

          tempChart.updateSeries([{ data: tempData }]);
          humChart.updateSeries([{ data: humData }]);
          pm25Chart.updateSeries([{ data: pm25Data }]);
        },
        error: function(xhr, status, err) {
          console.error(`Error loading sensor ${sensorid}:`, err);
        }
      });

      
    }
  }
  async function loop() {
    while (true) {
      await getSensorData();
      await delay(100000); 
    }
  }
  loop()