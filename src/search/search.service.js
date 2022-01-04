const getVideoInfor = require('../utils/getVideoInfor')
class SearchService{
    constructor(){
        this.getVideoInfor = getVideoInfor
    }
    async search(keyword){
        const result = await this.getVideoInfor(keyword);
        const videolist = result.filter(v => v);
        return videolist;
    }
}
module.exports = SearchService