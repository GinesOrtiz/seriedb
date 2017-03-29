import template from './message-block.html';

export const messageBlockComponent = {
  template,
  controllerAs: 'vm',
  bindings: {
    messageLayout: '@'
  }
};
