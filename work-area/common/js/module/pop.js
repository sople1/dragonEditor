const { typeCheckThrow, classControl } = require("./default");
const { getElement, getChild } = require("./selector");

export function openPop(type, $node, _0 = typeCheckThrow(type, "string"), _1 = typeCheckThrow($node, Node)) {
    let trigger = getElement(".djs-trigger");
    let offset = $node.getBoundingClientRect();

    classControl(trigger, "remove", "--act");
    switch (type) {
        case "linkboxBlock":
            openLinkPop("linkbox", offset);
            break;
        case "emoticonBlock":
            classControl(condition.popEmoticon, "toggle", "--act");
            break;
        case "youtubeBlock":
            openLinkPop("youtube", offset);
            break;
        case "codepenBlock":
            openLinkPop("codepen", offset);
            break;
    }
}

function openLinkPop(type, option = {}, _0 = typeCheckThrow(type, "string"), _1 = typeCheckThrow(option, "object")) {
    let $input = getChild(condition.popLinkbox, ".djs-input", false);
    let $btn = getChild(condition.popLinkbox, ".djs-btn", false);
    let right = condition.windowWidth - option.right + (option.width + 10);

    if (type == "word") {
        $btn.dataset["value"] = type;
        condition.popLinkbox.dataset["type"] = option.type;
        $btn.dataset["type"] = option.type;
    } else {
        $btn.dataset["value"] = type;
        $input.value = "";
        condition.popLinkbox.style.top = `${option.top}px`;
        condition.popLinkbox.style.right = `${right}px`;
    }

    classControl(condition.popLinkbox, "toggle", "--act");
}
