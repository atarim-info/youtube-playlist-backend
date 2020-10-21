const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.get('/videotrack', (req, res) => {
  VideoTrack.find()
    .then((videoTracks) => res.status(200).send(videoTracks))
    .catch((err) => res.status(400).send(err));
});

app.post('/videotrack', (req, res) => {
  const body = req.body;
  const videoTrack = new VideoTrack({
    videoId: body.videoId,
    timestamp: Date.now(),
  });
  videoTrack.save(videoTrack)
    .then((savedVideoTrack) => res.status(201).send(savedVideoTrack))
    .catch((err) => res.status(400).send(err));
});

app.patch('/videotrack/:id', (req, res) => {
  const { id } = req.params;
  VideoTrack.findOneAndUpdate({ _id: id }, { done: true })
    .then((videoTrack) => res.status(200).send(videoTrack))
    .catch((err) => res.status(400).send(err));
});

const mongoose = require('mongoose');
const VideoTrack = require('./videoTrackModel.js').VideoTrack;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI).then(() => {
  console.log('Listening on port: ' + PORT);
  app.listen(PORT);
});
