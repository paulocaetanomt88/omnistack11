// importando React
// useEffect serve para disparar alguma função em algum determinado momento do componente
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
 
import logoImg from '../../assets/logo.svg';

export default function Perfis() {
    const [ casos, setCasos] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('perfil', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setCasos(response.data);
        })
    }, [ongId]);

    async function handleDeleteCaso(id){
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setCasos(casos.filter(caso => caso.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleSair () {
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, { ongName }</span>

                <Link className="button" to="/casos/novo">Cadastrar novo caso</Link>
                <button onClick={handleSair} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {casos.map(caso => (
                        <li key={ caso.id }>
                        <strong>CASO:</strong>
                        <p>{ caso.title }</p>

                        <strong>Descrição:</strong>
                        <p>{ caso.description }</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.value)}</p>

                        <button onClick={() => handleDeleteCaso(caso.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        </li>
                    )
                )}
                
            </ul>
        </div>
    );
}