import React, { useState } from 'react';
import api from '../../services/api'
import './styles.css'
import {Link , useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import logoImage from '../../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewIncident(){

    const [name, setName] = useState('')
    const [hairColor, setHairColor] = useState('')
    const [size, setSize] = useState('')
    const [breed, setBreed] = useState('')

    const userId = localStorage.getItem('userId');
    const history = useHistory();
    


    function notifyError(message){
        toast.error(message, {
            containerId: 'A',
             autoClose: 5000});
    }

    async function handleNewIncident(e){
        e.preventDefault()

        const data = { name, hairColor, size, breed}
        
        
        try {
            await api.post('pet',data, {headers: { Authorization: userId}});
        
            history.push('/profile')

        } catch (error) {
            notifyError(error.response.data.message)
        }

    }


    return (
        <div className="new-incident-container">
             <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />
            <div className="content">
                <section>
                <img src={logoImage } alt="Logo"></img>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                    Voltar para home
                </Link>
                
                </section>
                <form onSubmit={ handleNewIncident }>
                <input
                 placeholder="Nome do seu pet"
                 required={true}
                 value={name}
                 onChange= {e => setName(e.target.value)}/>
                <input
                    placeholder="Cor do pelo"
                    required={true}
                    value={hairColor}
                    onChange= {e => setHairColor(e.target.value)}/>
                <input
                    placeholder="Porte : Pequeno / Médio / Grande"
                    required={true}
                    value={size}
                    onChange= {e => setSize(e.target.value)}/>
                <input
                    placeholder="Raça"
                    required={true}
                    value={breed}
                    onChange= {e => setBreed(e.target.value)}/>
                
        

                <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}