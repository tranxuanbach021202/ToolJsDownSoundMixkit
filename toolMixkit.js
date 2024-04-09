// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-04-09
// @description  try to take over the world!
// @author       You
// @match        https://mixkit.co/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let items = document.querySelectorAll('.item-grid__item');
    for (let i = 0; i < items.length; i++) {
        let audio = items[i].querySelector('div[data-audio-player-preview-url-value]:not([data-audio-player-preview-url-value=""])').getAttribute('data-audio-player-preview-url-value');
        
        let name = items[i].querySelector('.item-grid-card__title').innerText;

        console.log(audio, name);
        downloadFile(audio, name);
    }

   function downloadFile(url, filename) {
    // Sử dụng fetch để gửi yêu cầu tải xuống
    fetch(url)
    .then(response => response.blob()) // Chuyển đổi dữ liệu nhận được thành blob
    .then(blob => {
        // Tạo một đường dẫn tạm thời cho blob dữ liệu
        var blobUrl = window.URL.createObjectURL(blob);

        // Tạo một phần tử a để tải xuống
        var a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;

        // Thêm phần tử a vào DOM để kích hoạt sự kiện click
        document.body.appendChild(a);
        a.click();

        // Loại bỏ phần tử a và đường dẫn tạm thời sau khi đã sử dụng
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
    })
    .catch(error => console.error('Lỗi:', error));
}
})();