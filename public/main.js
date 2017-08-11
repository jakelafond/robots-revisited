var url = '/user/';
var deleteButton = document.querySelector('#delete');
var newUrl = '/index';

function deleteThis() {
  let id = deleteButton.getAttribute('data-id');
  let _url = url + id;
  fetch(_url, { method: 'delete' }).then(response => response.json()).then(json => {
    console.log(json);
  });
}
