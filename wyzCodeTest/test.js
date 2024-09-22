// 有四个弹窗：第一个弹窗关闭后才能弹出第二个弹窗，第二个弹窗出来的同时弹出第三个，第二个第三个弹窗都关闭后第四个弹窗弹出，注意需要实现扩展功能，可以在第1234个弹窗任何位置增加弹窗
// 扩展问题：数组的嵌套层级可能不止一层，改如何实现

const popupActions = ['popup1', 'popup2', ['popup3', 'popup4'], 'popup5'];
const popupFuncs = {
  popup1(next) {
    const isOK = window.confirm('popup1 确认框');
    console.log('popup1 executed', isOK);
    next();
  },
  popup2(next) {
    setTimeout(() => {
      console.log('popup2 executed');
      next();
    }, 1000); // 模拟异步操作
  },
  popup3(next) {
    setTimeout(() => {
      console.log('popup3 executed');
      next();
    }, 2000); // 模拟异步操作
  },
  popup4(next) {
    setTimeout(() => {
      console.log('popup4 executed');
      next();
    }, 2000); // 模拟异步操作
  },
  popup5(next) {
    setTimeout(() => {
      console.log('popup5 executed');
      next();
    }, 2000); // 模拟异步操作
  }
};
function runActions(actions) {
  // 代码实现


  actions.forEach(async(action, index) => {

    let run;

    if (Array.isArray(action)) {
     run = () => Promise.all(action.map((item) => {
        return new Promise((resolve) => { popupFuncs[item](resolve) });
      }))
    } else {
      run = () => new Promise((resolve, reject) => {
        popupFuncs[action](resolve);
      })
    }

    await run();

    console.log('index', index);


  })



}
runActions(popupActions);