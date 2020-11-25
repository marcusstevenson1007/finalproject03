// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

// JavaScript
//TODO
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

/*$('.datepicker').pickadate();*/

function displayCard(c){
    return `
    <div class="card" data-fname="${c.fname}">
    <div class="card-body" style="border: 2px solid black; margin-bottom: 10px;">
      <h5 class="card-title">${c.fname} ${c.last}</h5>
      <p class="card-title">${c.rating}</p>
      <p class="card-text">${c.review}</p>
      <a href="#" class="btn btn-danger delete-card">Delete</a>
    </div>
  </div>
    `
}

function displayCards(){
    let cards = JSON.parse(localStorage.getItem('cards') || '[]')
    document.querySelector('#cards').innerHTML = ''
    for(let c of cards){
        let col = document.createElement('div')
        col.setAttribute('class', 'col-md-4')
        col.innerHTML = displayCard(c)
        document.querySelector('#cards').appendChild(col)
    }

    document.querySelectorAll('.delete-card').forEach(function(b){
        b.onclick= function(event){
            let cards = JSON.parse(localStorage.getItem('cards') || '[]')
            let ndx = -1
            for(let i in cards){
                if(cards[i].fname === event.target.closest('.card').dataset.fname){
                    ndx = i
                    break
                }
            }

            if(ndx != -1){
                cards.splice(ndx, 1)
                localStorage.setItem('cards', JSON.stringify(cards))
                location.reload()
            }
        }
    })
}

function addNewCard(event){
    if(event) event.preventDefault()

    let f = document.querySelector('#fname').value
    let r = document.querySelector('#review').value
    let t = document.querySelector('#rating').value
    let l = document.querySelector('#last').value

    let cards = JSON.parse(localStorage.getItem('cards') || '[]')

    if(f && l && r && t){
        let card = {fname: f, last: l, review: r, rating: t}
        cards.push(card)
        localStorage.setItem('cards', JSON.stringify(cards))
    }

    this.reset()
        document.querySelector('#cards').classList.remove('d-none')
        document.querySelector('#myform').classList.add('d-none')

        displayCards()
}

document.querySelector('#new-card').onclick = function(){
    document.querySelector('#myform').classList.remove('d-none')
    document.querySelector('#cards').classList.add('d-none')
}

document.forms[0].querySelector('[type="button"]').onclick = function(e){
    document.querySelector('#cards').classList.remove('d-none')
    document.querySelector('#myform').classList.add('d-none')

    if(e.target.classList.contains('cancel-form')){
        e.target.closest('form').reset()
    }
}

document.forms[0].addEventListener('submit', addNewCard, false)
displayCards()
