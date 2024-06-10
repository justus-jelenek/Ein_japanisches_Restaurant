"use strict";

// Simple EventListner: züruck in Browser-History
let homeButton = document.querySelector("#go-back");
homeButton.addEventListener("click", function (){
    alert("You are about to enter the Home page ");
    window.history.back(-1);
}); 

// Objekt für ein Button erstellen
// eventFunction: speichert (WebSessionStorage) und erhöht mit Click den Zählerwert um 1  

let output = document.querySelector("article");

        let buttonObj = {
            tagName: "button",
            content: "Counter",
            className: "header",
            attributes: "button",
            id: "counter",
            event: "click",
            eventFunction: function(){

                        //alert(" Klicke auf diese Schaltfläche, um den Besucherstand zu erhöhen und die Zahl der Besuche heute anzuzeigen ");
                       
                        onclick = clickFunc;

            },
            targetElem: "header p",
            position: "afterend",
        }

// Button: dynamisch aus Objekt erzeugen 
        
    createTagsFromObject(buttonObj);
    

    // Messages (Erfolg und Error) für die Ausgabe der clickFunc()

    const MESSAGE = " mal ist der Zähler heute geklickt worden ";
    const ERROR_MESSAGE = "Dein Browser kann leider nicht warte nicht mach was anders";    
    
    // Event-Function
   function clickFunc(){

     //prüfen of Storage verfügbar ist
    if(!sessionStorage){

     // wenn nicht verfügbar Error-Message
    output.textContent = ERROR_MESSAGE;
            
    // click-Ereignis vom Button derfistrieren
    button.onclick = null;
            
    // Funktion abbrechen
     return;        
    }
  
    // Storage abragen und prüfen ob Eintrag vorhanden ist
    let klickZahl = sessionStorage.getItem("clicks");
                   
    // Zählervariable erstellen um den  Wert im Storage zu
    // erföhen
    let counter = Number(klickZahl) + 1;
            
    // Eintrag im Storage erstellen oder ändern
    // Anzahl der Clicks mit erfolgs Meldung ausgeben    

     sessionStorage.setItem("clicks", counter);
     output.textContent = counter + MESSAGE;
    
    }

    // für Ausgabe des Counters in SessionStorage durch Funktion clickFunc() ein Div-Element mit Hilfe der Funktion createTags(dynamisch) erstellen;

    createTags("article", "div", " ");


// Beispiel lazy Loading
let lazy = function() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status != 200) return;
        let images = JSON.parse(xhr.responseText);
        // Konfigurationsobjekt für Erstellung neuer Bilder
        
        if (typeof images == "object" && images.length > 0) {

            let newElem = {
                tagName:    "img",
                targetElem: "#images",
                position:   "beforeend",
                classNames: "loaded",
                attributes: {style: "width: 400px; margin: 5px 10px;"}
            };

            for (let i = 0; i < images.length; i++) {
                newElem.attributes.src = images[i];
                createTagsFromObject(newElem);
            }

            loadMore();

        } else {
            window.onscroll = null;
        }

    };
    xhr.open("GET","./images.json");
    xhr.send();
}

let loadMore = function() {
    let loadedImg = document.querySelectorAll(".loaded");
    window.onscroll = function() {
        if(loadedImg[0] && isInViewport(loadedImg[0])) {
            for (let i = 0; i < loadedImg.length; i++) {
                loadedImg[i].className = "";
            }
            lazy();
        }
    }
}
lazy();

    /* Cookie*/

    // Prüfung, ob Arbeit mit Cookies möglich erlaubt
    function cookieTest() {
        let canIUseCookies = false;
        if(navigator.cookieEnabled) canIUseCookies = true;
        if(!canIUseCookies && typeof navigator.cookieEnabled == "undefined") {
            document.cookie = "testCookie";
            if(document.cookie.includes("testCookie")) canIUseCookies = true;
        }
        return canIUseCookies;
    }

    if(cookieTest()) {
        console.log("I can use cookies");
        console.log(navigator.cookieEnabled);
    } else {
        console.log("Nope");
        console.log(navigator.cookieEnabled);
    }

    function createCookie(name, value, sameSite, days) {
        let expires = '', secure = '';
        if(sameSite) secure = "sameSite=" + sameSite + "; ";
        // if(sameSite == "None") secure += "Secure; ";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; ' + secure + 'Secure;  path=/';
        // document.cookie = name + '=' + value + expires + '; ' + secure + 'path=/';
    }
    createCookie("SushiCookie", '42', "None", 1);

    