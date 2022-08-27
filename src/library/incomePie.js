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
  echarts.dispose(element);
  const myChart = echarts.init(element);

  const setOption = (data) => {
    const option = {
      color: [
        '#4DFFFF',
        '#46A3FF',
        '#D3A4FF',
        '#7D7DFF',
        '#28FF28',
        '#00E3E3',
        '#9F35FF',
        '#2828FF',
        '#B15BFF',
        '#00DB00',
        '#6F00D2',
      ],
      title: {
        text: '本月無任何收入',
        top: 'center',
        left: 'center',
        textStyle: {
          fontSize: 30,
          color: '#FF77FF',
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
          name: '',
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
          data: [],
        },
      ],
    };
    if (data.data.length !== 0) {
      option.series[0].data = data.data;
      option.title.text = data.total;
      option.title.textStyle.color = '#00DB00';
    }
    return myChart.setOption(option);
  };
  const resize = () => myChart.resize();
  return { setOption, resize };
};

export default incomePie;
