//import {validator} from 'validator';

function validateFields(email, password, profile, area){
    if(!email || !password || !profile || !area){
        return false;
    }
    return true;
}



module.exports = {validateFields};