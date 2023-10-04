export const boardData = {
  title: "Sample Board",
  columns: [{
    status: "Todo",
    order: 1,
    entities: [{
      title: "Sample Task III",
      description: "Sample Task III Description",
      status: "Todo",
      statusOrder: 1,
      subTasks: [{
        title: "Sample III Sub Task",
        completed: false,
      }, {
        title: "Sample III Sub Task 2",
        completed: false,
      }]
    }, {
      title: "Sample Task V",
      description: "Sample Task V Description",
      status: "Todo",
      statusOrder: 1,
      subTasks: [{
        title: "Sample V Sub Task",
        completed: false,
      }, {
        title: "Sample V Sub Task 2",
        completed: false,
      }]
    }]
  }, {
    status: "In Progress",
    order: 2,
    entities: [{
      title: "Sample Task II",
      description: "Sample Task II Description",
      status: "In Progress",
      statusOrder: 2,
      subTasks: [{
        title: "Sample II Sub Task",
        completed: false,
      }]
    }]
  }, {
    status: "Done",
    order: 3,
    entities: [{
      title: "Sample Task",
      description: "Sample Task Description",
      status: "Done",
      statusOrder: 3,
      subTasks: [{
        title: "Sample Sub Task",
        completed: false,
      }, {
        title: "Sample Sub Task 2",
        completed: false,
      }]
    }, {
      title: "Sample Task IV",
      description: "Sample Task IV Description",
      status: "Done",
      statusOrder: 3,
      subTasks: [{
        title: "Sample IV Sub Task",
        completed: false,
      }, {
        title: "Sample IV Sub Task 2",
        completed: false,
      }]
    }]
  }]
}
