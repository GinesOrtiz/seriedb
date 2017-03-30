const SharedApiService = () => {
  'use strict';

  const getChartColors = () => {
    return [
      '#2F89C3',
      '#D3741F',
      '#D5B300',
      '#8F1E9E',
      '#53B821',
      '#D0442E'
    ];
  };

  return {
    getChartColors
  };
};

export default SharedApiService;
