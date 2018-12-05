import {Schema, model} from 'mongoose'

const ContactListSchema = new Schema({ 
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, default: ''},
    phone: {type: String, required: true, default: ''},
    address: {type: String, required: true, default: ''}
 });
 
export default model('ContactList', ContactListSchema);