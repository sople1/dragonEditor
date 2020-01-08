import { removeLastsetClass } from './element';

export function addBtn($target, icon, type, text){
    removeLastsetClass($target);
    let html = storage.HTMLBtn.replace(/\[icon_id\]/g, icon)
                .replace(/\[type\]/g, type)
                .replace(/\[text\]/g, text);

    $target.insertAdjacentHTML('afterend', html);
}