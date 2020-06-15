const getBoards=()=>{
    return fetch('http://localhost:8080/boards',{
        method:"GET",
    })
        .then((response) => response.json())
}
const getBoard =(id)=> {
    let url = 'http://localhost:8080/boards/' + id;
    return fetch(url, {
        method: "GET",
    })
        .then((response) => response.json())

}
const createBoard=(name)=>{
    let url = 'http://localhost:8080/boards'
    let data = {
        "name": name
    }
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
}
export {getBoards,getBoard,createBoard}