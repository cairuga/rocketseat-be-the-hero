import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function NewCase() {
    const history = useHistory();

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    
    const ongId = localStorage.getItem('ongId');

    async function handleNewCase(e){
        e.preventDefault();
        
        const data = {
            titulo,
            descricao,
            valor
        }
        
        try {
            await api.post('casos', data, {
                headers: {
                    Authorization : ongId
                }
            })  
            history.push('/profile');
        } catch (error) {
            alert('Não foi possível salvar o caso. Tente novamente.');
        }

    }

    return (
        <div className="newcase-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolvê-lo</p>
                    <Link className="backlink" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewCase}>
                    <input 
                        placeholder="Título do caso" 
                        value = {titulo}
                        onChange = {e => setTitulo(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value = {descricao}
                        onChange = {e => setDescricao(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em R$" 
                        value = {valor}
                        onChange = {e => setValor(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}