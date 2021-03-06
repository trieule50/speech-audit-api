const express = require('express');
const router = express.Router();
const Text = require('../models/text');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const path = require('path');
const multer = require('multer')


const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.SPEECH_API_KEY,
  }),
  serviceUrl: process.env.SPEECH_SERVICE_URL,
});


const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({
      apikey: process.env.TONE_API_KEY,
    }),
    serviceUrl: process.env.TONE_SERVICE_URL,
  });

// GET (index)
router.get('/', (req, res) => {
  Text.find({})
    .then((texts) => res.json(texts))
    .catch(console.error);
});

// GET (show) 
router.get('/:id', (req, res) => {
  Text.findById(req.params.id)
    .then((text) => res.json(text))
    .catch(console.error);
});

router.post('/audio', (req, res) =>{
  const recognizeParams = {
    audio: fs.createReadStream('/Users/trieulemac/Desktop/speech_audit/Speech_Audit_Testing.mp3'),
    contentType: 'audio/mp3',
    wordAlternativesThreshold: 0.9,
    keywords: ['general', 'assembly', 'experience'],
    keywordsThreshold: 0.5,
  };
  
  speechToText.recognize(recognizeParams)
  .then(speechRecognitionResults => {
    res.json(JSON.stringify(speechRecognitionResults.result.results[0].alternatives, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
})

// POST (create) 
router.post('/', (req, res) => {  
  const toneParams = {
    toneInput: { 'text': req.body.text },
    contentType: 'application/json',
  };
  
  toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      res.send((JSON.stringify(toneAnalysis, null, 2)));
    })
    .catch(err => {
      console.log('error:', err);
    });
});

// PUT (update) 
router.put('/:id', (req, res) => {
  Text.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((text) => res.json(text))
    .catch(console.error);
});

// DELETE (delete) 
router.delete('/:id', (req, res) => {
  Text.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(console.error);
});




module.exports = router;