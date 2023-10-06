import mongoose from "mongoose";
mongoose.connect("mongodb+srv://divyansh242805:Alpha456@cluster0.hecanuw.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to DataBase');
    })
    .catch((err) => console.log(err))
