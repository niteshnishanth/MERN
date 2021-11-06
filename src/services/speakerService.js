const axios = require('axios')
function speakerService(){
    function getSpeakerByID(id) {
        return new Promise((resolve, reject)=>{
            axios
            .get('http://localhost:3000/speakers/'+id)
            .then((response)=>{
                resolve(response)
            })
            .catch((error)=>{
                reject(error)
            })
        })
        }
        return {getSpeakerByID}
    }
module.exports = speakerService