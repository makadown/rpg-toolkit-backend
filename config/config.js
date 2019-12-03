// Fortunately Heroku has the real URL Hidden
module.exports.dbconnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/rpgtoolkitDB';