import home from '../views/home.njk';
import {getBoards} from "../api/Boards";
import {view} from "../components/view"
import {New} from "../components/new"
import img from "../assets/image/blank-cover-456424abf2806d03948a4181f9d90c6e.jpg"
export function homepage() {
    getBoards().then(
        data => boards(data)
    )
    const boards = (data) => {
        document.getElementById('app').innerHTML = home.render({result: data, img})
        document.querySelectorAll(".board-button").forEach((button) => (
            button.addEventListener('click', function () {
                view(button.dataset.id)
            }))
        )
        document.querySelectorAll(".newBoard").forEach((link) => (
            link.addEventListener('click', function (e) {
                e.preventDefault();
                New();
            }))
        )
    }
}
//view(image.dataset.id);