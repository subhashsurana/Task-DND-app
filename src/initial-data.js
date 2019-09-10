const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Write a cool JS library",
      order: 0,
      status: 0
    },
    "task-2": {
      id: "task-2",
      content: "Make it generic enough",
      order: 1,
      status: 0
    },
    "task-3": {
      id: "task-3",
      content: "Write README",
      order: 0,
      status: 1
    },
    "task-4": {
      id: "task-4",
      content: "Create some examples",
      order: 1,
      status: 1
    },
    "task-5": {
      id: "task-5",
      content:
        "Spam in Twitter and IRC to promote it (note that this element is taller than the others)",
      order: 0,
      status: 2
    },
    "task-6": {
      id: "task-6",
      content: "???",
      order: 1,
      status: 2
    },
    "task-7": {
      id: "task-7",
      content: "PROFIT",
      order: 2,
      status: 2
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2"]
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: ["task-3", "task-4"]
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: ["task-5", "task-6", "task-7"]
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"],
  MAP_STATUS: {
    0: "To do",
    1: "In Progress",
    2: "Done"
  }
};

export default initialData;
