'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';

interface BreadcrumbProps {
    beforePreviousName: string;
    beforePreviousPath: string;
    previousName: string;
    previousPath: string;
    currentName: string;
    pageTitle: string;
}

const Breadcrumbs = ({ beforePreviousName, beforePreviousPath, previousPath, previousName, currentName, pageTitle }: BreadcrumbProps) => {
    useEffect(() => {

    }, []);
    return (
        <><div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="breadcrumb" className="w-max">
                <ol className="flex flex-wrap items-center w-full py-2 rounded-md bg-blue-gray-50 bg-opacity-60">
                    <li className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500">
                        <a href="#" className="opacity-60">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </a>
                        <span className="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">
                            /
                        </span>
                    </li>
                    <li className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer hover:text-primary">
                        <Link href={beforePreviousPath} className="opacity-60">
                            <span>{beforePreviousName}</span>
                        </Link>
                        <span className="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">/</span>
                    </li>
                    <li className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer hover:text-primary">
                        <Link href={previousPath} className="opacity-60">
                            <span>{previousName}</span>
                        </Link>
                        <span className="mx-2 font-sans text-sm antialiased font-normal leading-normal pointer-events-none select-none text-blue-gray-500">/</span>
                    </li>
                    <li className="flex items-center font-sans text-sm antialiased font-normal leading-normal transition-colors duration-300 cursor-pointer text-blue-gray-900 hover:text-light-blue-500">
                        <Link href="#">{currentName}</Link>
                    </li>
                </ol>
            </nav>
        </div><div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    {pageTitle}
                </h2>
            </div></>
    );
};

export default Breadcrumbs;
