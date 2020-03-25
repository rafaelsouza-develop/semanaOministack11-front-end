import React, { useState} from 'react';
import {Link, useHistory } from 'react-router-dom';
import api from '../../services/api'
import { FiLogIn } from 'react-icons/fi'

import './styles.css'

import herousImage from '../../assets/heroes.png'
import logoImage from '../../assets/logo.svg'

export default function Logon(props){
    const history = useHistory()
    async function login(e){
        e.preventDefault()
        const data = {id}

        try {
          const response =   await api.post('session', data)
          localStorage.setItem('ongId', id);
          localStorage.setItem('ongName', response.data.name);
          history.push('/profile')
        } catch (err) {
            alert('Login invalido')
        }
    }

    const [id, setId] = useState('');
    return (
        <header>
            <div className="logon-container">
                <section className="form">
                <img src={logoImage } alt="Logo"></img>

                <form onSubmit={login}>
                    <h1>Faça seu Login</h1>

                    <input 
                    placeholder="Sua ID"
                    value={id}
                    onChange= {e => setId(e.target.value)}/>
                    <button type="submit" className="button">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041" />
                    Não tenho cadastro</Link>
                </form>

                </section>
                <img src={herousImage } alt="Heroes"></img>
            </div>
        </header>
    );
}
