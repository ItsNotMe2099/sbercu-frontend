

/**
 * Get offset of a DOM Element or Range within the document.
 *
 * @param {DOMElement|Range} el - the DOM element or Range instance to measure
 * @return {Object} An object with `top` and `left` Number values
 * @public
 */

export const docOffset = (el) => {
  const support = require('dom-support')
  const getDocument = require('get-document')
  const withinElement = require('within-element')
  const doc = getDocument(el)
  if (!doc) return

  // Make sure it's not a disconnected DOM node
  if (!withinElement(el, doc)) return

  const body = doc.body
  if (body === el) {
    return bodyOffset(el)
  }

  let box = {top: 0, left: 0}
  if ( typeof el.getBoundingClientRect !== "undefined" ) {
    // If we don't have gBCR, just use 0,0 rather than error
    // BlackBerry 5, iOS 3 (original iPhone)
    box = el.getBoundingClientRect()

    if (el.collapsed && box.left === 0 && box.top === 0) {
      // collapsed Range instances sometimes report 0, 0
      // see: http://stackoverflow.com/a/6847328/376773
      const span = doc.createElement("span")

      // Ensure span has dimensions and position by
      // adding a zero-width space character
      span.appendChild(doc.createTextNode("\u200b"));
      el.insertNode(span);
      box = span.getBoundingClientRect();

      // Remove temp SPAN and glue any broken text nodes back together
      var spanParent = span.parentNode;
      spanParent.removeChild(span);
      spanParent.normalize();
    }
  }

  const docEl = doc.documentElement
  const clientTop  = docEl.clientTop  || body.clientTop  || 0
  const clientLeft = docEl.clientLeft || body.clientLeft || 0
  const scrollTop  = window.pageYOffset || docEl.scrollTop
  const scrollLeft = window.pageXOffset || docEl.scrollLeft

  return {
    top: box.top  + scrollTop  - clientTop,
    left: box.left + scrollLeft - clientLeft
  }
}

function bodyOffset(body) {
  let top = body.offsetTop
  let left = body.offsetLeft

  if (support.doesNotIncludeMarginInBodyOffset) {
    top  += parseFloat(body.style.marginTop || '0')
    left += parseFloat(body.style.marginLeft || '0')
  }

  return {
    top: top,
    left: left
  }
}