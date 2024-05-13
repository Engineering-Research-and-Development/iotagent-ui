const express = require('express');
const router = express.Router();
const Agent = require('../../models/Agent');
const fetch = require("node-fetch");

router.all('/agent/:idAgent/service/:idService/proxy/**', async function(req,res,next){
    const agent = await Agent.findOne({_id: req.params.idAgent});
    const service = agent.services.find(e => e._id.toString() === req.params.idService);
    const forwardUrl = `http://${agent.host}:${agent.port}/${agent.apiKey}/${req.originalUrl.split('/proxy/')[1]}`;
    const headers = {
        'fiware-service': service.service,
        'fiware-servicepath': service.servicePath
    };
    console.log(req.body)
    const result = await fetch(forwardUrl, {
        method: req.method,
        body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : null,
        headers
    });
    res.status(result.status).json(await result.json());
});

router.get('/agent', async function(req,res,next){
    const result = await Agent.find({});
    res.status(200).json(result);
});

router.post('/agent', async function(req,res,next){
    const agent = await new Agent(req.body);
    await agent.save();
    res.status(201).json(agent);
});

router.get('/agent/:idAgent', async function(req,res,next){
    const result = await Agent.findOne({_id: req.params.idAgent});
    res.status(200).json(result);
});

router.put('/agent/:idAgent', async function(req,res,next){
    const agent = await Agent.findOneAndUpdate({_id: req.params.idAgent}, req.body, {new: false, upsert: true});
    res.status(200).json(agent);
});

router.delete('/agent/:idAgent', async function(req,res,next){
    await Agent.deleteOne({_id: req.params.idAgent});
    res.status(204).json({});
});

router.post('/agent/:idAgent/service', async function(req,res,next){
    const agent = await Agent.findOneAndUpdate({_id: req.params.idAgent}, {
        new: false,
        upsert: false,
        $push: {
            services: req.body
        }
    })
    res.status(201).json(agent);
});

router.delete('/agent/:idAgent/service/:idService', async function(req,res,next){
    await Agent.findOneAndUpdate({_id: req.params.idAgent}, {
        new: false,
        upsert: false,
        $pull: {
            services: {_id: req.params.idService}
        }
    })
    res.status(204).json({});
});

module.exports = router;