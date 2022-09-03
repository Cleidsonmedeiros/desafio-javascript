const Produto = require('../models/produto.model');

module.exports = {
    async index(req,res){
        const produto = await Produto.find();
        res.json(produto);
    },
    async create(req,res){
        const {nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body;

        let data = {};

        let produto = await Produto.findOne({nome_produto});
        if(!produto){
            data = {nome_produto,descricao_produto,preco_produto,qtd_produto};
            produto = await Produto.create(data);
            return res.status(200).json(produto);
        }else{
            return res.status(500).json(produto);
        }
    },
    async details(req,res){
        const {_id} = req.params;
        const produto = await Produto.findOne({_id});
        res.json(produto);
    },
    async delete(req,res){
        const {_id} = req.params;

        const produto = await Produto.findByIdAndDelete({_id});

        return res.json(produto);
    },
    async update(req,res){
        const { _id, nome_produto, descricao_produto, preco_produto, qtd_produto} = req.body;

        const data = {nome_produto, descricao_produto, preco_produto, qtd_produto};

        const produto = await Produto.findOneAndUpdate({_id},data,{new:true});

        res.json(produto);
    }

}