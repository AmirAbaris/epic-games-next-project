'use client';

import React, { useEffect, useState } from 'react'
import GameItem, { GameItemProps } from './GameItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoChevronForwardOutline } from "react-icons/io5";
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
            <div className='flex items-center justify-end gap-x-4 mb-4'>
                <button className='swiper-button-prev bg-darkCharcoal p-2 rounded-full hover:brightness-125'>
                    <IoChevronForwardOutline className='rotate-180' />
                </button>

                <button className='swiper-button-next bg-darkCharcoal p-2 rounded-full hover:brightness-125'>
                    <IoChevronForwardOutline />
                </button>
            </div>

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
