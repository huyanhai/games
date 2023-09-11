export const resize = (echartInstance: any) => {
  window.addEventListener('resize', function () {
    echartInstance.resize();
  });
};

export const removeResize = (echartInstance: any) => {
  window.removeEventListener(
    'resize',
    function () {
      echartInstance.resize();
    },
    false
  );
};
