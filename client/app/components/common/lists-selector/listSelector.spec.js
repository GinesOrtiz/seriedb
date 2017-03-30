import listSelectorModule from './index.js';
import listSelectorController from './listsSelector.controller';
import listSelectorComponent from './listsSelector.component';
import listSelectorTemplate from './listsSelector.html';

import StubChanges from 'angular-stub-changes';


describe('LIST COMPONENT TESTING', ()=> {
  'use strict';

  let cmpCtrlr;

  let initBindings = {
    lists: [
      [
        1,
        2
      ],
      [
        3,
        4
      ]
    ],
    initialModel: [1],
    config: {
      maximumLists: 2,
      placeholder: 'dummy placeholder',
      placeholderAdd: 'dummy placeholder add',
      minimumLists: 0
    },
    addList: ()=> {
    },
    selectElement: ()=> {
    },
    removeList: ()=> {
    },
  };

  beforeEach(angular.mock.module('billy.common.listsSelector'));

  //mock RUN dependencies
  beforeEach(
    angular.mock.module({
      "translateService": {
        addLang: function (lang) {
          // console.log("translateService called: " + lang, {});
        }
      }
    })
  );

  beforeEach(inject(($componentController) => {
    cmpCtrlr = $componentController;
  }));


  it('model should be equivalent to the initialModel after $onInit', () => {

    var controller = cmpCtrlr('listsSelector', null, initBindings);
    controller.$onInit();

    let modelValuesArray = Object.values(controller.model);

    expect(modelValuesArray)
      .toEqual(initBindings.initialModel);
  });

  //TODO: maybe simulate a click?
  it('handleListRemoval should update model', () => {

    let bindings = {
      lists: [
        [
          1,
          2
        ],
        [
          3,
          4
        ],
        [
          5,
          6
        ]
      ],
      initialModel: [1,3],
      config: {
        maximumLists: 2,
        placeholder: 'dummy placeholder',
        placeholderAdd: 'dummy placeholder add',
        minimumLists: 0
      },
      addList: ()=>{},
      selectElement: ()=>{},
      removeList: ()=>{},
    };
    var controller = cmpCtrlr('listsSelector', null, bindings);
    controller.$onInit();

    controller.handleListRemoval(0);

    expect(Object.values(controller.model))
      .toEqual([3]);
  });


  describe('$onChanges', () => {

    var ctrlInitialized;

    beforeEach(() => {
      ctrlInitialized = cmpCtrlr('listsSelector', null, initBindings);
      ctrlInitialized.$onInit();
    });

    it('list property', () => {

      //create changes using angular-stubs helper
      //simulate adding a list
      const newValue = [
        ...ctrlInitialized.lists,
        [
          5,
          6
        ]
      ];

      const changes = new StubChanges()
        .addChange('lists', newValue, ctrlInitialized.lists)
        .build();
      ctrlInitialized.$onChanges(changes);

      expect(ctrlInitialized.lists)
        .toEqual(newValue);

    });

    it('config property', () => {

      //simulate changing config
      const newValue = {
        maximumLists: 4,
        placeholder: 'dummy placeholder change',
        placeholderAdd: 'dummy placeholder add change',
        minimumLists: 1
      };

      const changes = new StubChanges()
        .addChange('config', newValue, ctrlInitialized.config)
        .build();
      ctrlInitialized.$onChanges(changes);

      expect(ctrlInitialized.config)
        .toEqual(newValue);

    });

  });

});

