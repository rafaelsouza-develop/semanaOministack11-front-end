import React, { useState} from 'react';
import {Link, useHistory } from 'react-router-dom';
import api from '../../services/api'
import { FiLogIn } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'

import herousImage from '../../assets/heroes.png'
import logoImage from '../../assets/logo.svg'

export default function Logon(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
 

    function notifyError(message){
        toast.error(message, {
            containerId: 'A',
             autoClose: 5000});
    } 

    async function login(e){
        e.preventDefault()
        const data = {email, password}

        try {
          const response =   await api.post('session', data)
          localStorage.setItem('userId', response.data.ong.id);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userName', response.data.ong.name);
          history.push('/profile')
        } catch (error) {
            setPassword('');
            notifyError(error.response.data.message)
        }
    }

  
    return (

        <header>
            <div className="logon-container">
            <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />
                <section className="form">
                <img src={logoImage } alt="Logo"></img>

                <form onSubmit={login}>
                    <h1>Faça seu Login</h1>

                    <input 
                    placeholder="Email"
                    type="email"
                    required={true}
                    value={email}
                    onChange= {e => setEmail(e.target.value)}/>
                    <input 
                    placeholder="Senha"
                    type="password"
                    required={true}
                    value={password}
                    onChange= {e => setPassword(e.target.value)}/>
                    <button type="submit"  className="button">Entrar</button>

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
