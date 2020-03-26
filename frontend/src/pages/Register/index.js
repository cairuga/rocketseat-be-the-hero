import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Register() {
    let [nome, setNome] = useState('');
    let [email, setEmail] = useState('');
    let [whatsapp, setWhatsapp] = useState('');
    let [cidade, setCidade] = useState('');
    let [uf, setUf] = useState('');
    
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        let data = {
            nome,
            email,
            whatsapp,
            cidade,
            uf
        };
        
        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID é ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro. Tente novamente!');
        }

    }
    
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="backlink" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        value = {nome}
                        onChange = {e => setNome(e.target.value)}
                    />
                    <input 
                        placeholder="E-mail" 
                        type="email" 
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp" 
                        value = {whatsapp}
                        onChange = {e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade" 
                            value = {cidade}
                            onChange = {e => setCidade(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value = {uf}
                            onChange = {e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}