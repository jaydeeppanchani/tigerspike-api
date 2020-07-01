
export const mongoose = require('mongoose');

export class dbMongooseUtilityClass {

    constructor() {

    }
    public connect(): any {
        mongoose.connect('mongodb+srv://root:tigerspike@tigerspike.3smhj.mongodb.net/tigerspike?retryWrites=true&w=majority', { useNewUrlParser: true });

        const adapter = mongoose.connection;

        adapter.on('error', console.error.bind(console, 'connection error:'));
        adapter.once('open', function () {
            console.log('Connected to MongoDB');
        });

        return adapter;
    }

    public usersModel(): any {
        const Schema = mongoose.Schema;
        const ObjectId = Schema.ObjectId;
        let UsersSchema = new Schema({
            forename: { type: String, require: true, minlength: 1 },
            surname: { type: String, require: false, minlength: 1 },
            password: { type: String, require: false, minlength: 1 },
            email: { type: String, require: true, minlength: 1 },
            dob: { type: String, require: true, minlength: 1 },
            sex: { type: Number, require: true, minlength: 1 },
            created_date: { type: Date, default: Date.now, require: true, minlength: 1 },
            status: { type: Number, default: 1, require: false },
            
        }, {
            collection: 'users'
        });
        const usersModel = mongoose.model('users', UsersSchema);

        return usersModel;
    }

}

export const dbMongooseUtility = new dbMongooseUtilityClass();
export const dbMongoose = new dbMongooseUtilityClass().connect();
export const usersModel = new dbMongooseUtilityClass().usersModel();


