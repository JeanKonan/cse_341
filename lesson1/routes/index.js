const express = required('express');
const app = express();

const routes = required("./routes");

app.use('/', routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});