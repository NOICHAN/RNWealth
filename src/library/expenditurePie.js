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
        '#FFAD86',
        '#FFBFFF',
        '#FFED97',
        '#FF95CA',
        '#FF8040',
        '#F9F900',
        '#FF44FF',
        '#F75000',
        '#FFD306',
        '#FF0080',
        '#FF0000',
      ],
      title: {
        text: '本月無任何支出',
        top: 'center',
        left: 'center',
        textStyle: {
          fontSize: 30,
          color: '#00DB00',
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
      option.title.textStyle.color = '#FF77FF';
    }

    return myChart.setOption(option);
  };
  const resize = () => myChart.resize();
  return { setOption, resize };
};

export default incomePie;
