"use strict";

// Array-Methoden für NodeList und HTMLCollection anwenden
NodeList.prototype.__proto__ = Array.prototype;
HTMLCollection.prototype.__proto__ = Array.prototype;

// ersetzen von setAttribute und getAttribute durch attr
Element.prototype.attr = function (attribute, value) {
    if (value) {
        this.setAttribute(attribute, value);
        return this; // gibt element zurück, so dass wir mit eleemnt weiterarbeiten können
    } else {
       return this.getAttribute(attribute);
    }
};


// Fähigkeitenweiche für XHR
var createFunctions = [
    function () { return new XMLHttpRequest(); },
    function () { return new ActiveXObject("Msxml2.XMLHTTP"); },
    function () { return new ActiveXObject("Msxml3.XMLHTTP"); },
    function () { return new ActiveXObject("Microsoft.XMLHTTP"); }
];

function createXHR() {
    var test, xmlHTTP = null;

    for (var i = 0; i < createFunctions.length; i++) {
        try {
            test = createFunctions[i];
            // test =  function() { return new XMLHttpRequest()};
            xmlHTTP = test();
        } catch (e) {
            continue;
        }
        break;
    }
    return xmlHTTP;
}

// HILFSFUNKTIONEN


// Elemente dynamisch erzeugen
function createTags(parent, elem, content = "") {
    let container = document.querySelector(parent);
    let newElem = document.createElement(elem);
    newElem.innerHTML = content;
    container.appendChild(newElem);
}

// Elemente dynamisch erzeugen - aus Object
function createTagsFromObject(elem) {
    if (typeof elem === "object" && Object.keys(elem).length != 0) {
        let container = document.querySelector(elem.targetElem);
        let newElem = document.createElement(elem.tagName);
        if(elem.classNames) newElem.className = elem.classNames;
        if (elem.attributes && typeof elem.attributes === "object") {
            for (let key in elem.attributes)
                newElem.setAttribute(key, elem.attributes[key]);
        }
        if (elem.content) newElem.innerHTML = elem.content;
        if (elem.event) newElem.addEventListener(elem.event, elem.eventFunction);
        container.insertAdjacentElement(elem.position, newElem);
    }
}


// Helper von Chris Ferdinandi, MIT License, https://gomakethings.com

var isInViewport = function (elem) {
    var distance = elem.getBoundingClientRect();
    return (
        distance.top >= 0 &&
        distance.left >= 0 &&
        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};