// pages/403.js or pages/403.tsx
import Link from 'next/link';

const Custom403Page = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2em', color: 'red' }}>403 - Unauthorized Access</h1>
                <br></br>
                <p style={{ fontSize: '1.2em' }}>You don't have permission to access this page.</p>

            </div>
        </div>
    );
};

export default Custom403Page;
