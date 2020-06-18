import {CryptoRSA} from '/frontend/CryptoRSA.js'

const servercrypto = new CryptoRSA();

function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

window.addEventListener("load", event => {
    var entry = document.getElementById("entry");
    var send = document.getElementById("send");

    fetch(window.location.href, {
        method: "POST"
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    .then(response => {
        console.log(response);
        servercrypto.setpublic_key(response.public_key);
    });

    send.onclick = event => {
        var json = {"content": servercrypto.encrypt(str2ab(entry.value))};
        fetch(window.location.href, {
            method: "POST",
            body: JSON.stringify(json)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(response => console.log(response));
    }
});