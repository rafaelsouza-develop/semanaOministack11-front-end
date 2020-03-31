import React, { useState, useEffect } from 'react';
import {Link , useHistory} from 'react-router-dom';


import { FiPower } from 'react-icons/fi'
import { FiTrash2} from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'
import logoImage from '../../assets/logo.svg'

export default function Profile(){
    const history = useHistory();
    const [pets, setPets] = useState([]);
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    

    

    

    useEffect(() => { 
        api.get('profile', {
            headers: {
                Authorization: userId
            }
        }).then ( response => {
            setPets(response.data.pets)
        })
    }, [userId]);

     

   

    

   async function handleDeleteIncident(id){
        try {
             await api.delete(`pet/${id}`, {
                headers: {
                    Authorization: userId
                }
            });
        } catch (error) {
            alert('error ao excluir incident');
        }

        setPets(pets.filter(pet => pet.id !== id))
    }

    function handleLogout(){
             localStorage.clear();
             history.push('/');
    }
    
    return(
        <div className="profile-container">
            <header>
            <img src={logoImage } alt="Logo"></img>
                <span> Bem vinde {userName} </span>
            <Link className="button" to="/incident/new">Cadastrar novo pet</Link>
            <button type="button" onClick={ handleLogout }>
                <FiPower size={18} color="#E02041" />
            </button>
            </header>
            {!!pets.length && (
              <h1>Pets cadastrados</h1>
            )}
            <ul>
                {pets.map(pet => (
                        <li key={pet.id}>
                        <strong>Nome:</strong>
                        <p>{pet.name}</p>

                        <strong>Cor do Pelo:</strong>
                        <p>{pet.hairColor}</p>

                        <strong>Porte:</strong>
                        <p>{pet.size}</p>
                        
                        <strong>Raça:</strong>
                        <p>{pet.breed}</p>
                    
                    <button onClick={() => handleDeleteIncident(pet.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                    </button>
                </li>
                    
                
                ))}
            </ul>
        </div>
    );
}