import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullGame: React.FC = () => {
    const { id } = useParams();
    const [game, setGame] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const navigate = useNavigate();

    useEffect(() => {
        debugger;
        async function fetchGame() {
            try {
                const { data } = await axios.get(
                    'https://62977b578d77ad6f75041321.mockapi.io/items/' + id
                );
                setGame(data);
            } catch (error) {
                alert('Не удалось найти игру :(');
                navigate('/');
            }
        }

        fetchGame();
    }, []);

    if (!game) {
        return <>Загрузка...</>;
    }

    return (
        <div className='container'>
            <img src={game.imageUrl} alt='' width={300} />
            <h2>{game.title}</h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam necessitatibus, eos est vitae eaque quod officia
                rerum ducimus natus quos doloribus quia. Obcaecati eum explicabo
                voluptatum ipsum unde, nostrum suscipit.
            </p>
            <h4>{game.price}</h4>
        </div>
    );
};

export default FullGame;
