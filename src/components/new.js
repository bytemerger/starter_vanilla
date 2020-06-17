import {homepage} from "./home";
import {createBoard} from "../api/Boards";
import {edit} from "./edit";
const new_temp = require('../views/new.njk');

export function New(){
    document.getElementById('app').innerHTML = new_temp.render();
    document.querySelector('#home-page').addEventListener('click',()=> {
        homepage();
    });
    document.querySelector('#create-board-submit').addEventListener('click',()=> {
        create();
    });
}
function create()
{
    let name = document.querySelector('#createBoard').value;
    console.log(name)
    createBoard(name)
        .then((data)=> edit(data.id))
        .catch(error => document.getElementById('error').innerHTML = '"The moodboard name is invalid or already exists"')
}