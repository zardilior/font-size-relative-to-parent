const attribute = "data-font-size-rel-to-parent";
document.addEventListener("DOMContentLoaded", function(event) {

  calculateFontSizes();
  setListeners();
  window.addEventListener('resize',adjustFontSizes);

  //setInterval(adjustFontSizes,1)
  function adjustFontSizes() {
    const elementList = document.querySelectorAll(`[${attribute}]`)
    elementList.forEach(el=>{
      adjustSingleNodeFontSize(el);
    })  
  }

  // get all elements
  function calculateFontSizes() {
    const elementList = document.querySelectorAll(`[${attribute}]`)
    elementList.forEach(el=>{
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
    })  
    adjustFontSizes();
  }

  function adjustSingleNodeFontSize(el) {
    el.style.fontSize = el.parentNode.offsetWidth * el.dataset.magicFontSize / 100 + "px";
  }

  function setListeners() {
    const elementList = document.querySelectorAll(`[${attribute}]`)
    elementList.forEach(el=>{
      const mutationObserver = new MutationObserver(function() {
        console.log("mutation observer launched");
        adjustSingleNodeFontSize(el);
      });
      mutationObserver.observe(el.parentNode, {
        attributes: true,
        attributeFilter:['style','class']
      });
    });
  }
});
