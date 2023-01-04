import { Snackbar } from '@material/mwc-snackbar'
import clipboardCopy from 'clipboard-copy'
import { html, render } from 'lit'

const SELECTORS = {
  tradeRow: '[id^="row-"]'
}

document.addEventListener('click', e => {
  const tradeRow = searchTradeRow(e.target)
  console.log(tradeRow)
  if (tradeRow) {
    const tcode = `${getUSI()}:${getTCodeValues(tradeRow)}`
    toast(tcode)
    clipboardCopy(tcode)
  }
})


function getTCodeValues (tradeRow) {
  return `${getType(tradeRow)}:${getPrice(tradeRow)}:${getQuantity(tradeRow)}`
}

function searchTradeRow (element) {
  let node = element
  while (node && !isTradeRow(node)) {
    node = node.parentElement
  }
  // while (element &&
  //   ![...element.children].some(el => el.innerText === 'Sell' || el.innerText === 'Buy')) {
  //     element = element.parentElement;
  // }
  return node
}
function isTradeRow (element) {
  return element.getAttribute('id')?.match(/row-[0-9]+/)
}


function getUSI () {
  const match = window.location.pathname.match(/\/([^\/:]+):([^-]+)-(.+)$/);
  return `${match[1].toLocaleLowerCase()}:${match[2].toLocaleLowerCase()}:${match[3].toLocaleLowerCase()}`
}

function getType (tradeRow) {
  if ([...tradeRow.children].some(c => c.innerText === 'Sell')) {
    return 'sell'
  }
  else if ([...tradeRow.children].some(c => c.innerText === 'Buy')) {
    return 'buy'
  }
}

function getPrice (tradeRow) {
  return tradeRow.querySelector('[class^="tableColumn_price"]').textContent.trim().replace(/,/g, '')
}

function getQuantity (tradeRow) {
  return tradeRow.querySelector('[class^="tableColumn_qty"]').textContent.trim().replace(/,/g, '')
}


// function toClipboard () {
//   var copyText = document.getElementById("myInput");
//   copyText.select();
//   copyText.setSelectionRange(0, 99999); /* For mobile devices */
//   document.execCommand("copy");
//   alert("Copied the text: " + copyText.value);
// }

const snackbar = new Snackbar()
snackbar.leading = true
render(html`
<b slot="action" style="margin-right:10px;color:white;font-size:10px">(copied)</b>
`, snackbar)
function toast (message) {
  snackbar.labelText = message;
  snackbar.timeoutMs = 10000;
  snackbar.show()
}
window.document.body.append(snackbar)