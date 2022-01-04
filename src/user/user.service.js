const { User } = require('./user.model')
class UserService{
    constructor(){
        this.User = User
    }
   async createUser(user){
        try {
            let newUser = new this.User(user);
            await newUser.save();
            return true;
        } catch (error) {
            return false;
        }
    }
    async deleteUser(email){
        try {
            await this.User.deleteOne({email:email});
            return true;
        } catch (error) {
            return false;
        }
    }
}
module.exports = { UserService }