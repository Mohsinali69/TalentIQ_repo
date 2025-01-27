import ReactApexChart from 'react-apexcharts'
// eslint-disable-next-line react/prop-types
const LineChart = ({data}) => {

  const series= [
    {
      name: 'Applications',
      data: data
    }
  ] 

  const  options= {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
    },
    colors: ['#4caf50'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'straight'
    },
  //   title: {
  //     text: 'Product Trends by Month',
  //     align: 'left'
  //   },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // alternating row colors
        opacity: 0.5
      }
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    }
  }

  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          options={options}
          series={series}
          type='line'
          height={350}
        />
      </div>
      <div id='html-dist'></div>
    </div>
  )
}

export default LineChart
