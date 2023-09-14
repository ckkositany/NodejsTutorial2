const moment=require('moment')

module.exports={
    formDate: function(date,format){
        return moment(date).format(format)
    }
}