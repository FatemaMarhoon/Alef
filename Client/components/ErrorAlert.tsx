import React from 'react';
interface alertProps {
    message: string;
}
const ErrorAlert: React.FC<alertProps> = ({
    message
}) => {
    return (
        <>
            <div className="relative flex flex-col sm:flex-row sm:items-center bg-danger bg-opacity-5 mb-3 shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
                <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                    <div className="text-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="fill-current text-danger" width="20" height="20"><path fill-rule="evenodd" d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z"></path></svg>
                    </div>
                    <div className="text-sm text-danger font-medium ml-3">{message}</div>
                </div>
            </div>
            {/* <div className="bg-opacity-10 text-danger bg-danger px-4 py-3 rounded relative mb-3" role="alert">
                <strong className="font-bold">{message}</strong>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">

                </span>
            </div> */}
        </>
    );
}

export default ErrorAlert;
