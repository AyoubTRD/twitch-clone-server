const express = require("express"),
  app = express(),
  cors = require("cors"),
  bodyParser = require("body-parser");

const streams = [];

const msg = action => `${action}ed stream successfully`;

app.use(cors());
app.use(express.json({ extended: false }));

app.get("/streams", (req, res) => res.send(streams));
app.get("/streams/:id", (req, res) => {
  const {
    params: { id }
  } = req;
  const stream = streams.find(stream => stream.id === id);
  res.send(stream);
});

app.post("/streams", (req, res) => {
  console.log(req.body);
  streams.push(req.body);
  res.send({
    message: msg("creat")
  });
  console.log(streams);
});

app.delete("/streams/:id", (req, res) => {
  const {
    params: { id }
  } = req;
  console.log(streams);
  streams.forEach((stream, i) => {
    stream.id === id ? streams.splice(i, 1) : null;
  });
  console.log(streams);
  res.send({
    message: msg("delet")
  });
  console.log(streams);
});

app.put("/streams", (req, res) => {
  const { body } = req;
  streams.forEach((stream, i) => {
    if (stream.id === body.id) {
      streams[i] = body;
    }
  });
  res.send({
    message: msg("edit")
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`server started on port ${port}!`));
