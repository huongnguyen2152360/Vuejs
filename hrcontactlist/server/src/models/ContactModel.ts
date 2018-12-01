import { Schema, model } from 'mongoose'

// New Schema
const ContactListSchema = new Schema({
    // default de tranh tra undefined duoi dang type k get duoc
  name: { type: String, required: true, default:'' },
  email: { type: String, required: true, default: '' },
  phone: { type: String, required: true, default: '' },
  address: { type: String, default: '' }
})

// New model
export default model('ContactList', ContactListSchema);
