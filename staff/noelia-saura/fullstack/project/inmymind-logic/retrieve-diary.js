const { models: { Diary } } = require('inmymind-data');
const { NotFoundError } = require('inmymind-errors');
const { validateId, validateDate } = require('./helpers/validators')

/**
 * 
 * @param {string} user_id
 * @param {date} date
 * 
 * @returns {Promise<Diary[]>}
 * 
 * @throws {TypeError}
 * @throws {FormatError}
*/
const retrieveDiary = (user_id, date) => {
    validateId(user_id)

    let filter = { user_id: user_id };
    
    if (date) {
        validateDate(date)

        const day = (date.getDate() < 10 ? '0' : '') + date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        const dateFormat = year + '-' + month + '-' + day

        filter = { user_id: user_id, date: dateFormat };
    }

    return (async()=>{
        const diary = await Diary.find(filter).sort({date: -1}).lean()

        if(!diary) throw new NotFoundError(`diary with id ${id} not found`)
        
        for (let index = 0; index < diary.length; index++) {
            diary[index].id = diary[index]._id.toString()

            delete diary[index]._id
            delete diary[index].user_id
            delete diary[index].__v
            
        }
        return diary
    })()
}

module.exports = retrieveDiary