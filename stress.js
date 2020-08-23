document.addEventListener("DOMContentLoaded", function(event) {
  const attribute = "data-font-size-rel-to-parent";
  const numberOfNodes = 500;
  const el = document.querySelector(`[${attribute}]`).parentNode;
  for(let i=0;i<numberOfNodes; i++) {
    document.body.appendChild(el.cloneNode(true));
  }
});
