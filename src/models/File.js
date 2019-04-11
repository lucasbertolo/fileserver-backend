const mongoose = require('mongoose');

// schema bd - uma classe
const File = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
            }
        },
        {
            timestamps: true,
            toObject: {virtuals: true}, 
            toJSON: {virtuals: true}
        }
    );
    
    //servidor virtual para files
    File.virtual('url').get(function() {
        const url = process.env.URL || 'http://localhost:3000';
        return `${url}/files/${encodeURIComponent(this.path)}`;
    })
     
    
module.exports = mongoose.model("File", File);