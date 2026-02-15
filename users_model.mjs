// Samuel Dameg

// Get the mongoose object
import mongoose from 'mongoose';
import 'dotenv/config';


const USER_CLASS = 'User';

let connection = undefined;

/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}


/**
 * Define the schema
 */
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: false }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const User = mongoose.model(USER_CLASS, userSchema);


/**
 * Create a user
 * @param {String} name
 * @param {Number} age 
 * @param {String} email
 * @param {Number} phoneNumber
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createUser = async (name, age, email, phoneNumber) => {
    // Call the constructor to create an instance of the model class User
    const user = new User({ name: name, age: age, email: email, phoneNumber: phoneNumber });
    // Call save to persist this object as a document in MongoDB
    return user.save();
}

/**
 * Find users based on filter criteria
 * @param {Object} filter - Object with filter criteria
 * @returns A promise. Resolves to array of matching users
 */
const findUsers = async (filter) => {
    const query = User.find(filter);
    return query.exec();
}

/**
 * Find a user by ID
 * @param {String} id - The user ID
 * @returns A promise. Resolves to the user or null if not found
 */
const findUserById = async (id) => {
    const query = User.findById(id);
    return query.exec();
}

/**
 * Update a user by ID
 * @param {String} id - The user ID
 * @param {Object} updates - Object with properties to update
 * @returns A promise. Resolves to the updated user or null if not found
 */
const updateUser = async (id, updates) => {
    const result = await User.findByIdAndUpdate(id, updates, { new: true });
    return result;
}

/**
 * Delete users based on filter criteria
 * @param {Object} filter - Object with filter criteria
 * @returns A promise. Resolves to object with deletedCount
 */
const deleteUsers = async (filter) => {
    const result = await User.deleteMany(filter);
    return { deletedCount: result.deletedCount };
}

/**
 * Delete a user by ID
 * @param {String} id - The user ID
 * @returns A promise. Resolves to the deleted user or null if not found
 */
const deleteUserById = async (id) => {
    const result = await User.findByIdAndDelete(id);
    return result;
}


export { connect, createUser, findUsers, findUserById, updateUser, deleteUsers, deleteUserById };
