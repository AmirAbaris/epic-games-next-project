'use client';

import React, { useEffect, useState } from 'react'
import GameItem, { GameItemProps } from './GameItem';
import { Swiper, SwiperSlide } from 'swiper/react';

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
        <>
            <Swiper
                spaceBetween={20} // Space between slides in pixels
                slidesPerView={1} // Number of slides visible at a time
                breakpoints={{
                    640: {
                        slidesPerView: 2, // 2 slides visible on small screens
                    },
                    768: {
                        slidesPerView: 3, // 3 slides visible on medium screens
                    },
                    1024: {
                        slidesPerView: 4, // 4 slides visible on large screens
                    },
                }}
                pagination={{ clickable: true }} // Optional pagination
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
        </>
    );
}

export default GameList;
