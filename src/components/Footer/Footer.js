import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="flex flex-col flex-grow text-white bg-green-950 mt-0 mb-0">
            <div className="grid grid-cols-3 gap-4 m-4 md:flex md:justify-center">
                <div className="m-4 md:flex-1">
                    <div className="mt-5 mb-2">
                        <Link to="/home" className="flex items-center font-sans lg:flex-1 text-sky-500">

                            <span className="ml-2 text-xl capitalize"
                                  style={{color: '#FBBF24', fontFamily: 'Dancing Script, cursive'}}>
                        TaskWALL
                            </span>
                        </Link>
                    </div>

                    <p className="text-justify">

                        Welcome to our task management website, which provides a simple and efficient solution for organizing
                        your daily activities seamlessly. Through a user-friendly interface, you can easily create, modify,
                        and track your tasks. The application allows you to set priorities, deadlines, and statuses for each
                        task, helping you prioritize your responsibilities.

                        Whether you are a professional looking to streamline your workflow or an individual wanting to better
                        manage your daily activities, our application offers flexibility tailored to various needs. The real-time
                        editing feature enables smooth collaboration, ideal for teams working on common projects.

                        With features such as comment management, categorization by status (To-Do, In Progress, Completed),
                        and the ability to set deadlines, our application aims to simplify task management while providing
                        a clear overview of your commitments. Make productivity a priority with our task management application,
                        designed to help you stay organized and focused on what matters most.
                    </p>
                </div>
                <div className="pt-16 m-4 md:flex-2">
                    <h5 className="mb-1 text-amber-400">Siège Social</h5>
                    <p className="mb-4">Av. Hassan 2, Résidence Saada Appt 6 Rabat - Maroc</p>

                    <h5 className="mb-1 text-amber-400">Téléphone:</h5>
                    <p className="mb-4">+212 5 37 78 15 11</p>

                    <p className="mb-1 text-amber-400">Email:</p>
                    <p className="mb-4">DevRecruit@gmail.com</p>

                    <h5 className="mb-1 text-amber-400">Horaire de Travail:</h5>
                    <p className="mb-4">
                        - du lundi au vendredi : 9h à 18h30 <br/>
                        - Samedi matin : 9h à 13h <br/>
                    </p>
                </div>
                <div className="pt-16 m-4 md:flex-2">
                    <h5 className="mb-1 text-amber-400">Abonnez-vous à Nos Emails </h5>
                    <div className="">
                        <input type="email" placeholder="Email"/>
                        <span>
                </span>
                    </div>
                </div>
            </div>
            <div className="col-span-3 m-4 text-center md:col-span-2 md:mx-auto">
                <p className="text-amber-400">
                    droits d'auteur {year}, Developpé par SRMC-Group. tous droits réservés .
                </p>
            </div>
        </footer>

    )
};
export default Footer;