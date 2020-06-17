const baseUrl = 'http://localhost:8081'
const deleteImage =(id)=>
{
    return fetch(baseUrl+'/images/'+id,{
        method: 'DELETE'
    })
        .then((response)=> response)

}
const saveComment=(id,comment) =>{
    let data = {
        "comment": comment
    }
    return fetch(baseUrl+'/images/'+id,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response)=> response.json())
}
const getImage =(id)=> {
    let url = baseUrl+'/images/' + id;
    return fetch(url, {
        method: "GET",
    })
        .then((response) => response.json())

}
export {deleteImage,saveComment,getImage}