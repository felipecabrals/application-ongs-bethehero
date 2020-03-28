import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from '../../services/api';

import "./styles.css"; 
import logoImg from "../../assets/logo.svg";

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`indidents/${id}`, {
                headers: {
                    Authorization: ongId
                },
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Error ao deletar o caso!')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar Novo Caso</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição:</strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color=""/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}