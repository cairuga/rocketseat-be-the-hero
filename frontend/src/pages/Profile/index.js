import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
    const history = useHistory();
    
    const ongId = localStorage.getItem('ongId');
    const nomeDaOng = localStorage.getItem('nomeDaOng');
    
    const [casos, setCasos] = useState([]);

    useEffect(() => {
        api.get('perfil', {
            headers: {
                Authorization : ongId,
            }
        }).then(response => {
            setCasos(response.data);
        })
    }, [ongId]);

    async function handleDeleteCaso(id) {
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    Authorization : ongId,
                }
            });

            setCasos(casos.filter(caso => caso.id !== id));
        } catch (error) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <spam>Bem-vinda, {nomeDaOng}</spam>
                <Link className="button" to="/cases/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02042" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                { casos.map(caso => (
                    <li key={caso.id}>
                        <strong>Caso</strong>
                        <p>{caso.titulo}</p>

                        <strong>Descrição</strong>
                        <p>{caso.descricao}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(caso.valor)}</p>

                        <button onClick={() => handleDeleteCaso(caso.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                )) }
            </ul>
        </div>
    );
}