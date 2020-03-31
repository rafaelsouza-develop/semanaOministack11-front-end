import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'


import api from '../../services/api'

import logoImage from '../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [telefone, setTelefone] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')


    async function handleRegister (e){
        e.preventDefault()
        
        const data = {name, email, password, telefone, city, uf}
        
        try {
            const response = await api.post('user', data);
            notifySuccess(`Obrigado ${response.data.name},\n Agora vamos fazer o login?`)
            setName('');
            setEmail('');
            setPassword('');
            setTelefone('');
            setCity('');
            setUf('');
        } catch (error) {
            notifyError(error.response.data.message)
        }
        
    }

    function notifySuccess(message){
        toast.success(message, {
            containerId: 'A',
             autoClose: 5000});
    } 

    function notifyError(message){
        toast.error(message, {
            containerId: 'A',
             autoClose: 5000});
    } 

    

    return (
        <div className="register-container">
             <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />
            <div className="content">
                <section>
                <img src={logoImage } alt="Logo"></img>
                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e tenha todas a informações do seu pet em um só lugar.</p>
                <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Ir para o login</Link>
                
                </section>
                <form onSubmit= {handleRegister}>
                <input 
                    placeholder="Nome"
                    required = {true}
                    value={name}
                    onChange= {e => setName(e.target.value)}/>
                <input
                    type="email"
                    placeholder="Email"
                    required={true}
                    value={email}
                    onChange= {e => setEmail(e.target.value)}/>

                <input
                    type="password"
                    placeholder="Senha"
                    required={true}
                    value={password}
                    onChange= {e => setPassword(e.target.value)}/>
                
                <input
                    placeholder="Telefone"
                    required={true}
                    value={telefone}
                    onChange= {e => setTelefone(e.target.value)}/>
                
                
                
                <div className="input-group">
                    <input
                     placeholder="Cidade"
                     required={true}
                     value={city}
                    onChange= {e => setCity(e.target.value)}/>
                   
                    <input 
                    placeholder="UF"
                    required={true}
                    style={{ width: 80}}
                    value={uf}
                    onChange= {e => setUf(e.target.value)}/>
                </div>

                <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}