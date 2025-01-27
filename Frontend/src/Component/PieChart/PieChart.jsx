import ReactApexChart from "react-apexcharts";

// eslint-disable-next-line react/prop-types
const PieChart = ({data}) => {
    const series= data
    const options = {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['content Writer',
    'Human Resource',
    'Finance',
    'Management',
    'Market Research',
    'Retail & Product',
    'Market & Sale',
    'Software'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="pie" width={450} />
              </div>
            <div id="html-dist"></div>
          </div>
    );
};

export default PieChart;