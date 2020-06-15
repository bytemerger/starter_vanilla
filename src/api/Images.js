const uploadFile = (file,id)=>{
    let url = 'http://localhost:8080/boards/'+id+'/upload'
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
        let data = {
            image: reader.result
        }
        return fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response)=> response.json())

    }
}
const deleteImage =(id)=>
{
    return fetch('http://localhost:8080/images/'+id,{
        method: 'DELETE'
    })
        .then((response)=> response)

}
const saveComment=(id,comment) =>{
    let data = {
        "comment": comment
    }
    return fetch('http://localhost:8080/images/'+id,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response)=> response.json())
}
const getImage =(id)=> {
    let url = 'http://localhost:8080/images/' + id;
    return fetch(url, {
        method: "GET",
    })
        .then((response) => response.json())

}
export {deleteImage,uploadFile,saveComment,getImage}