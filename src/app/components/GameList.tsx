'use client';

import React, { useEffect, useState } from 'react'
import GameItem, { GameItemProps } from './GameItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';

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
            <div className="swiper-button-prev">previous</div>
            <div className="swiper-button-next bg-red-700">next</div>
            <Swiper className='h-auto'
                spaceBetween={20}
                slidesPerView={5}
                slidesPerGroup={5}
                loop={true}
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
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                modules={[Navigation]}
            >
                {games.map((game: GameItemProps, index: number) => (
                    <SwiperSlide className='h-auto' key={index}>
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
