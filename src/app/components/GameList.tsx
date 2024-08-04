'use client';

import React, { useEffect, useState } from 'react'
import GameItem, { GameItemProps } from './GameItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoChevronForwardOutline } from "react-icons/io5";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface GameListProps {
    listTitle: string;
    hasLink?: boolean;
    link?: string;
}

const GameList = ({ listTitle, hasLink, link }: GameListProps) => {
    const [games, setGames] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    const iconStyle = {
        transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out'
    };

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
            <div className='flex justify-between items-center p-3'>
                <div className={`flex gap-x-2 items-center${hasLink ? ' cursor-pointer' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {hasLink ? (
                        <a href={link} className='font-bold'>
                            {listTitle}
                        </a>
                    ) : (
                        <h1 className='font-bold'>{listTitle}</h1>
                    )}
                    <IoChevronForwardOutline className={hasLink ? 'block' : 'hidden'} style={iconStyle} />
                </div>
                <div className='hidden lg:block'>
                    <div className='flex items-center justify-end gap-x-4'>
                        <button className='swiper-button-prev bg-darkCharcoal p-2 rounded-full hover:brightness-125'>
                            <IoChevronForwardOutline className='rotate-180' />
                        </button>

                        <button className='swiper-button-next bg-darkCharcoal p-2 rounded-full hover:brightness-125'>
                            <IoChevronForwardOutline />
                        </button>
                    </div>
                </div>
            </div >
            <div className='flex'>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={25}
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
            </div>
        </>
    );
}

export default GameList;
