"use client";
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuizConfig } from '@/app/store';
import { ChevronDown } from 'lucide-react';

type CategoryType = {
    id: number;
    name: string;
};

const type = ['boolean', 'multiple'];
const level = ['easy', 'medium', 'hard'];

export default function DropOptions() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const addCategory = useQuizConfig(state => state.addCategory);
    const config = useQuizConfig(state => state.config);
    const addLevel = useQuizConfig(state => state.addLevel);
    const addType = useQuizConfig(state => state.addType);

    // Fetch categories once when the component mounts
    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await fetch('https://opentdb.com/api_category.php');
                const { trivia_categories } = await response.json();
                setCategories(trivia_categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategory();
    }, []);

    return (
        <section className='flex justify-evenly items-center py-5 w-full'>
            {/* Category Dropdown */}
            <div className='px-7 py-4 w-1/3 mx-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex outline-none justify-between items-center mx-auto px-9 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:text-gray-100'>
                        {config.category.name || 'CATEGORY'}
                        <ChevronDown className='mx-3' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>SELECT CATEGORY</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {categories.map(category => (
                            <DropdownMenuItem
                                key={category.id}
                                onClick={() => addCategory(category.id, category.name)}
                            >
                                {category.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Level Dropdown */}
            <div className='px-7 py-4 w-1/3 mx-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex outline-none justify-between mx-auto px-10 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:text-gray-100'>
                        {config.level?config.level:'LEVEL'} <ChevronDown className='mx-3' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>SELECT LEVEL</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {level.map((e) => (
                            <DropdownMenuItem key={e} onClick={() => addLevel(e)}>
                                {e}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Type Dropdown */}
            <div className='px-7 py-4 w-1/3 mx-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex outline-none justify-between mx-auto px-10 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:text-gray-100'>
                    {config.type?config.type:'TYPE'} <ChevronDown className='mx-3' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>SELECT TYPE</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {type.map((e) => (
                            <DropdownMenuItem key={e} onClick={() => addType(e)}>
                                {e}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </section>
    );
}
