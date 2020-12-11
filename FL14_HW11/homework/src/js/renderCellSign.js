
import {imgPath} from './data.js';

export default function renderCellSign(cellButton, cell) {
   let img = document.createElement('img')
    img.setAttribute('src', imgPath[cell.sign])
    cellButton.appendChild(img)
}

