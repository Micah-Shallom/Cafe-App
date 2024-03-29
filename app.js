
const form = document.querySelector('#add-cafe-form')
const cafeList = document.querySelector('#cafe-list')

const renderList = doc => {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div')

  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';

  li.setAttribute('data-id',doc.id)

  li.appendChild(name)
  li.appendChild(city)
  li.appendChild(cross)

  cafeList.appendChild(li);

  cross.addEventListener('click' , e => {
    let cafeId = e.target.parentElement.getAttribute('data-id')
    db.collection('Cafe').doc(cafeId).delete();

  })
}


db.collection('Cafe').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if(change.type == 'added'){
      renderList(change.doc)
    }else if(change.type == 'removed'){
      let li = cafeList.querySelector(`[data-id = ${change.doc.id} ]`);
      cafeList.removeChild(li);
    }
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if(form.name.value != '' || form.name.value != ''){
    db.collection('Cafe').add({
      name : form.name.value,
      city: form.city.value
    })

    form.name.value = '';
    form.city.value = '';
    return;
  } 

})
})