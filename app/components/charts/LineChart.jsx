import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart = (props) => {
  const { series, options } = props;

  if (typeof window === 'undefined') {
    return null; // Return null or a placeholder component if running on the server-side
  }

  return (
    <Chart
      options={options}
      type="line"
      width="100%"
      height="100%"
      series={series}
    />
  );
};

export default LineChart;
