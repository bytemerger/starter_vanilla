import {getBoard} from "../api/Boards";
import {view} from "../components/view"
import {homepage} from "./home";
import {comment} from "./comment";
import {deleteImage} from "../api/Images";
const edit_temp = require('../views/edit.njk');
export function edit(id) {
    getBoard(id).then(
        data => edit_boards(data)
    );
    const edit_boards = (data) => {
        document.getElementById('app').innerHTML = edit_temp.render({result: data})
        document.getElementById('home-page').addEventListener('click',()=> {
            homepage();
        });
        document.querySelectorAll(".js-image-delete").forEach((image) => (
            image.addEventListener('click', (e)=> {
                e.preventDefault();
               deleteImg (image.dataset.id,e.target)
            }))
        )
        document.querySelectorAll(".goToview").forEach((element) => (
            element.addEventListener('click', (e)=> {
                e.preventDefault();
                view(element.dataset.board)
            }))
        )
        document.querySelectorAll(".img-view").forEach((element) => (
            element.addEventListener('click', (e)=> {
                e.preventDefault();
                comment(element.dataset.id)
            }))
        )
        uploadImage(data.id)

    }
}
function deleteImg(id,image)
{
    deleteImage(id)
        .then((data)=>{
            //remove element with animation
            const board= image.parentElement;
            board.style.transition = "all 800ms ease";
            board.style.opacity = '0';
            board.style.transform= 'scale(0.2)'
            setTimeout(function(){board.parentNode.removeChild(board);}, 800);
        })
        .catch(error => console.log(error))
}
function uploadImage(id)
{
    let dropArea = document.querySelector('.upload-area')

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})

    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }
    ;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})
    function highlight(e) {
        dropArea.classList.add('highlight')
    }

    function unhighlight(e) {
        dropArea.classList.remove('highlight')
    }

    //to fake input tag when it is clicked
    let fakeInput = document.createElement("input");
    fakeInput.type = "file";
    fakeInput.accept = "image/*";
    fakeInput.multiple = true;
    dropArea.addEventListener('click',function () {
        fakeInput.click()
    })
    fakeInput.addEventListener("change", function() {
        let files = fakeInput.files;
        handleFiles(files);

    });

    dropArea.addEventListener('drop', handleDrop, false)

    //handle file drop
    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files

        handleFiles(files)
    }
    function handleFiles(files) {
        ([...files]).forEach(uploadFile)
    }
    const uploadFile = (file)=>{
        let url = 'http://localhost:8081/boards/'+id+'/upload'
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
            let data = {
                image: reader.result
            }
            fetch(url,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then((response)=> response.json())
                .then(data=>{previewFile(data.data)})
                .catch(error => console.log(error))

        }
    }
    function previewFile(data)
    {
        let container = document.querySelector('.edit')
        const div = document.createElement("div")
        div.className = 'item edit-image'
        div.innerHTML = `<a href="#" role="button" class="no-underline close grid-image-delete js-image-delete" data-id="${data.id}">×</a>
                <div class="board-pic">
                    <a href="" data-id="${data.id}" class="img-view"><img src=${data.src} class="responsive-img"/></a>
                </div>`
        container.prepend(div)
        document.getElementById("doesNot").style.display='none';

    }
}