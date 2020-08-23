document.addEventListener("DOMContentLoaded", function(event) {
  const attribute = "data-font-size-rel-to-parent";
  // TBD: add mutation observer for new insertions that have the attribute in order to calculate 
  calculateFontSizes();
  setListeners();

  function adjustFontSizes() {
    const elementList = document.querySelectorAll(`[${attribute}]`)
    elementList.forEach(el=>{
      adjustSingleNodeFontSize(el);
    })  
  }

  function calculateFontSizes() {
    const elementList = document.querySelectorAll(`[${attribute}]`)
    elementList.forEach(el=>{
      calculateSingleFontSize(el);
    })  
    adjustFontSizes();
  }

  function calculateSingleFontSize(el) {
    const wrapper = document.createElement("DIV");
    wrapper.style.fontSize = "1000px";
    const clone = el.cloneNode();
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper)
    const originalFontSize = window.getComputedStyle(clone).getPropertyValue('font-size');
    clone.style.fontSize = "100%";
    const newFontSize = window.getComputedStyle(clone).getPropertyValue('font-size');
    el.dataset.magicFontSize = parseFloat(originalFontSize) / parseFloat(newFontSize) *100;
    document.body.removeChild(wrapper)
  }

  function adjustSingleNodeFontSize(el) {
    el.style.fontSize = el.parentNode.offsetWidth * el.dataset.magicFontSize / 100 + "px";
  }

  function setListeners() {
    window.addEventListener('resize',adjustFontSizes);
    const elementList = document.querySelectorAll(`[${attribute}]`)
    elementList.forEach(el=>{
      // observe parent for style and class changes catch width change 
      const mutationParentObserver = new MutationObserver(function() {
        adjustSingleNodeFontSize(el);
      });
      mutationParentObserver.observe(el.parentNode, {
        attributes: true,
        attributeFilter:['style','class']
      });
      // observe itself for style and class changes catch font size change
      const mutationObserver = new MutationObserver(function() {
        calculateSingleFontSize(el)
      });
      mutationObserver.observe(el, {
        attributes: true,
        attributeFilter:['class']
      });
    });
  }
});
