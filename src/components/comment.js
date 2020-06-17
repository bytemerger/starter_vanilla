import {homepage} from "./home";
import {edit} from "./edit"
const comment_temp = require('../views/comment.njk');
import {getImage, saveComment} from "../api/Images";
import back_img from "../assets/image/Back-arrow.svg"

export function comment(id){
    getImage(id).then(
        data => comment_p(data)
    );
    const comment_p=(data)=> {
        document.getElementById('app').innerHTML = comment_temp.render({result: data,back_img})
        document.querySelector('#home-page').addEventListener('click',()=> {
            homepage();
        });
        document.getElementById('goToEdit').addEventListener('click',(e)=> {
            id = e.target.dataset.board;
            edit(id);
        })
        document.querySelector('#save-comment').addEventListener('click',(e)=> {
            save_comment(e.target.dataset.id)
        });
    };
}
function save_comment(id) {
    let comment = document.querySelector('.comment-textarea').value;
    saveComment(id,comment)
        .then((data)=>{
            alert('succesfully updated');
            edit(data.data.board_id)
        })
        .catch(error => console.log(error))
}