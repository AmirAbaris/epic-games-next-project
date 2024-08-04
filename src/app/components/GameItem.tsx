'use client';

import Image from 'next/image';

export interface GameItemProps {
    type: GameType;
    title: string;
    price: number;
    image: string;
}

type GameType =
    | 'Base Game'
    | 'Edition'
    | 'Add-On';

const GameItem = ({ type, title, price, image }: GameItemProps) => {
    return (
        <div className='flex flex-col items-center h-full'>
            <Image src={image} alt={title} priority
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-lg mb-4 w-full object-cover" />
            <div className='flex flex-col w-full flex-1'>
                <span className='text-xs text-gray-400'>{type}</span>
                <h1 className='font-bold text-base flex-1'>{title}</h1>
                <p className='mt-1'>{price}</p>
            </div>
        </div>
    );
}

export default GameItem;
