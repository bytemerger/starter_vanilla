import {homepage} from "./home";

const view_temp = require('../views/view.njk');
import {getBoard} from "../api/Boards";

function view(id){
    getBoard(id).then(
        data => images(data)
    );
    const images=(data)=> {
        console.log(data);
        document.getElementById('app').innerHTML = view_temp.render({result: data});
        document.getElementById('home-page').addEventListener('click',()=> {
            homepage();
        });
        document.getElementById('goToEdit').addEventListener('click',()=> {
            edit();
        })
    };
    return id;
}
export {view}