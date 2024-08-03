'use client';

import React, { useEffect, useState } from 'react'
import GameItem, { GameItemProps } from './GameItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async (): Promise<void> => {
            const response = await fetch('/data/game-items.json');
            const data = await response.json();

            setGames(data);
        };
        fetchGames();
    }, []);

    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={5}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                320: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 5,
                }

            }}
            pagination={{ clickable: true }}
            navigation
        >
            {games.map((game: GameItemProps, index: number) => (
                <SwiperSlide key={index}>
                    <GameItem
                        type={game.type}
                        title={game.title}
                        price={game.price}
                        image={game.image}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default GameList;
