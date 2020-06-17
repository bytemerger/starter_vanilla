const baseUrl = 'http://localhost:8081'
const getBoards= async () => {
    return await fetch(baseUrl+'/boards', {
        method: "GET",
    })
        .then((response) => response.json())
}
const getBoard =(id)=> {
    let url = baseUrl+'/boards/' + id;
    return fetch(url, {
        method: "GET",
    })
        .then((response) => response.json())

}
const createBoard=(name)=>{
    let url = baseUrl+'/boards'
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