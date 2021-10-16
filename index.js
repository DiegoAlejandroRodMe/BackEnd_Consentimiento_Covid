//const conectionString = "mongodb+srv://diegoalejandro:1q2w3e$r@cluster0.eidvp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//const mongoCliente = require("mongodb").MongoClient;

//mongoCliente.connect(conectionString)
//.then(result => {
//    console.log("Conectado a DB")
//})
//.catch(err => console.log("error"))

//--------

const { urlencoded } = require('express');
const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const MongoCliente = require('mongodb').MongoClient;

const connectionString = 'mongodb+srv://diegoalejandro:1q2w3e$r@cluster0.eidvp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; //"connectionString"

const app = express();
app.use(express.json());

app.use(urlencoded({extended: false}));

MongoCliente.connect(connectionString)
.then(client => {
    console.log('Conectado a base de datos');
    const db = client.db('Consentimiento_Covid19');

    const usuarios = db.collection('Usuarios');
    const formularios = db.collection('Formularios');

//CRUD de usuarios

    app.get('/usuarios', (req, res) => {
        usuarios.find().toArray()
        .then(result => {
            res.json(result);
        })
        .catch(error => res.send(error))
    })

    app.post('/usuario', (req, res) => {
        usuarios.insertOne(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => res.json(error))
    });

    app.get('/usuario', (req, res) => {
        const id = new ObjectId(req.query.id);
        usuarios.findOne({_id: id})
        .then(result => {
            res.json(result);
        })
        .catch(error => res.json(error));
    });

    app.put('/usuario', (req, res) => {
        const id = new ObjectId(req.query.id);
        usuarios.findOneAndUpdate({_id: id}, req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => res.json(error));
    })

    app.delete('/usuario', (req, res) => {
        const id = new ObjectId(req.query.id);
        usuarios.findOneAndDelete({_id: id})
        .then(result => {
            res.json(result);
        })
        .catch(error => res.json(error));
    })

//CRUD de formularios

app.get('/formularios', (req, res) => {
    formularios.find().toArray()
    .then(result => {
        res.json(result);
    })
    .catch(error => res.send(error))
})

app.post('/formulario', (req, res) => {
    formularios.insertOne(req.body)
    .then(result => {
        res.json(result);
    })
    .catch(error => res.json(error))
});

app.get('/formulario', (req, res) => {
    const id = new ObjectId(req.query.id);
    formularios.findOne({_id: id})
    .then(result => {
        res.json(result);
    })
    .catch(error => res.json(error));
});

app.put('/formulario', (req, res) => {
    const id = new ObjectId(req.query.id);
    formularios.findOneAndUpdate({_id: id}, req.body)
    .then(result => {
        res.json(result);
    })
    .catch(error => res.json(error));
})

app.delete('/formulario', (req, res) => {
    const id = new ObjectId(req.query.id);
    formularios.findOneAndDelete({_id: id})
    .then(result => {
        res.json(result);
    })
    .catch(error => res.json(error));
})

//termina CRUD


    app.listen(3000, () => {
        console.log('Servidor en puerto 3000');
    })

})
.catch(error => console.log(error));