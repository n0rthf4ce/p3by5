import mongoose from "mongoose";

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const GameSchema = new Schema({
    // `title` is required and of type String
    name: {
        type: String,
        required: true
    },
    numberWrongPermitted: {
        type: Number,
        required: true
    },
    // `link` is required and of type String
    numberofQuestions: {
        type: Number,
        required: true
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    highScores: [
        {
            type: Schema.Types.ObjectId,
            ref: "Score"
        }
    ]
});

// This creates our model from the above schema, using mongoose's model method
const Game = mongoose.model("Game", GameSchema);

export default Game;