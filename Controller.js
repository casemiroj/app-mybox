const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const models = require('./models')
const QRCode = require('qrcode')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('assets'))

let user = models.User
let tracking = models.Tracking
let product = models.Product

app.post('/login', async (req, res) => {
    let response = await user.findOne({
        where: {name: req.body.name, password: req.body.password}
    })

    if(response === null) {
        res.send(JSON.stringify('error'))
    } else {
        res.send(response)
    }
})

app.post('/verifyPass', async (req, res) => {
    let response = await user.findOne({
        where: {id: req.body.id, password: req.body.senhaAntiga}
    })

    if(response === null) {
        res.send(JSON.stringify('Senha antiga inválida'))
    } else {
        if(req.body.novaSenha === req.body.confNovaSenha){
            response.password = req.body.novaSenha
            response.save()
            res.send(JSON.stringify('Senha atualizada com sucesso'))
        } else {
            res.send(JSON.stringify('Nova senha e confirmação não conferem'))
        }
    }
})

//Criação do produto no banco
app.post('/create', async (req,res)=> {
    let trackingId = ''
    await tracking.create({
        userId: req.body.userId,
        code: req.body.code,
        local: req.body.local
    }).then((response) => {
        trackingId+=response.id;
    })

    await product.create({
        trackingId: trackingId,
        name: req.body.product
    })

    QRCode.toDataURL(req.body.code).then(url => {
        QRCode.toFile('./assets/img/code.png', req.body.code)
        res.send(JSON.stringify(url))
    })
})

//pegar dados do produto
app.post('/searchProduct', async (req, res) => {
    let response = await tracking.findOne({
        where: { code: req.body.code }
    });
    let response2 = await product.findOne({
        where: { trackingId: response.id }
    });
    res.send(JSON.stringify(response2));
});

//Atualização de dados
app.post('/update', async (req, res) => {
    let response = await tracking.findOne({
        where: {code: req.body.code},
        include: [{all: true}]
    })
    response.local = req.body.local
    response.updatedAt = new Date()
    response.Products[0].name = req.body.product
    response.save()
    response.Products[0].save()
    res.send(JSON.stringify('Dados atualizados com sucesso'))
})

//Exibir rastreio
app.post('/rastreio', async (req, res) => {
    let response = await tracking.findOne({
        where: {code: req.body.code},
        include: [{all:true}]
    })
    if(response === null) {
        res.send(JSON.stringify('Nenhum produto encontrado'))
    }
    res.send(JSON.stringify(`Sua encomenda ${response.Products[0].name} já está a caminho ${response.local}.`))
})

let port = process.env.PORT || 3000
app.listen(port, (req, res) => {
    console.log('Servidor rodando...')
})