const express = require("express");
const mongoose = require("mongoose");
const mongojs = require("mongojs");

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// let db = null;

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
//     useNewUrlParser: true,
//     useFindAndModify: false
// }).then(function(value) {
//     // console.log(value);
//     db = value;
//     registerRoutes();
//     // expected output: "Success!"
// });

const collections = ["workout"];
const databaseUrl = process.env.MONGODB_URI || "mongodb://localhost/workout";
const db = mongojs(databaseUrl, collections);
registerRoutes();

function registerRoutes() {
    db.on("error", error => {
        console.log("Database Error:", error);
    });
    // "5e24c2bfbe7d1637c459b0dc"
    // mongojs.ObjectId(null)
    app.post("/workouts", (req, res) => {
        let id = req.query.id;
        const name = req.query.name;
        if (req.query.id) {
            id = mongojs.ObjectId(req.query.id);
        }

        const result = db.workouts.save({
            _id: id,
            day: Date.now(),
            excercises: [{
                name: name,
                type: "testType",
                duration: "10",
                weight: 500,
                reps: 2,
                sets: 2
            }]
        }, (err, docInserted) => {
            console.log(JSON.stringify(docInserted));
            res.send("data saved:" + docInserted._id);
        });
    });
    0




    app.get("/", (req, res) => {
        res.send("Hello world");
    });

    app.get("/workouts", (req, res) => {
        db.workouts.find({}, (err, found) => {
            if (err) {
                console.log(err);
            } else {
                res.json(found);
            }
        });
    });
}


// routes
// app.use(require("./routes/api.js"));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});