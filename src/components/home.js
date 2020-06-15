import home from '../views/home.njk';
import {getBoards} from "../api/Boards";
import img from "../assets/image/blank-cover-456424abf2806d03948a4181f9d90c6e.jpg"
getBoards().then(
    data => boards(data)
)
const boards=(data)=>(
    document.getElementById('app').innerHTML=home.render({result:data,img})
)