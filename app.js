const express = require("express"),
  app = express(),
  cors = require("cors");

let streams = {};

app.use(cors());
app.use(express.json({ extended: false }));

app.get("/streams", (req, res) => res.send(streams));
app.get("/streams/:id", ({ params: { id } }, res) => {
  res.send(streams[id]);
});

app.post("/streams", (req, res) => {
  const { body: stream } = req;
  streams[stream.id] = { ...stream};
  res.send(streams[stream.id]);
});

app.put("/streams", (req, res) => {
  let { body: newStream } = req;
  const id = newStream.id;
  streams[id] = newStream;
  res.send(streams[id]);
});

app.delete("/streams/:id", (req, res) => {
  const {
    params: { id }
  } = req;
  const deletedStream = { ...streams[id] };
  streams = { ...streams, [id]: undefined };
  res.send(deletedStream);
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`server started on port ${port}!`));
