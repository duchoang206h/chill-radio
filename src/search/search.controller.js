const SearchService = require('./search.service')
class SearchController {
    constructor(){
        this.SearchService = new SearchService();
    }
    post = async (req,res) => {
        if(!req.session.isLogin) return res.status(403).json({msg:"Unauthorized"});
        const keyword = req.body.keyword.toString().replace(/ /g, "+");
        const list = await this.SearchService.search(keyword)
        return res.status(200).json(list);
    }
    get = (req, res) => {
        res.status(404).json({msg:"Not Found!"})
    }
}
module.exports = new SearchController();