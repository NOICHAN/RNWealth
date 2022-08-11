import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  TitleComponent,
]);

const incomePie = (element) => {
  const myChart = echarts.init(element);

  const setOption = (data) => {
    const option = {
      color: [
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
        '#546570',
        '#c4ccd3',
      ],
      title: {
        text: '',
        top: 'center',
        left: 'center',
        textStyle: {
          fontSize: 30,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter(params) {
          const res = `
          <div>
            <p class="mb-0">${params.seriesName}</p>
            <p class="mb-0">${params.marker}${params.name} ${params.data.value} (${params.percent}%)</p>
          </div>
          `;
          return res;
        },
      },
      legend: {
        bottom: '1%',
        left: 'center',
      },
      series: [
        {
          name: '收入',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: false,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
        },
      ],
    };
    option.series[0].data = data.data;
    option.title.text = data.total;
    return myChart.setOption(option);
  };
  const resize = () => myChart.resize();
  return { setOption, resize };
};

export default incomePie;
