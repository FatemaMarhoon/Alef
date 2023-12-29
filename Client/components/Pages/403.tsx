// pages/403.js or pages/403.tsx
import Link from 'next/link';

const Custom403Page = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            {/* <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2em', color: 'red' }}>403 - Unauthorized Access</h1>
                <br></br>
                <p style={{ fontSize: '1.2em' }}>You don't have permission to access this page.</p>

            </div> */}
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">403</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-danger sm:text-5xl">Unauthorized Access</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">You don't have permission to access this page.</p>

            </div>
        </div>
    );
};

export default Custom403Page;
