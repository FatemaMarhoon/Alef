'use client'
import { useRouter } from 'next/router';
import RequestForm from '../../../components/Forms/requestForm'
const PlanDetailsPage = ({ params }: { params: { id: number } }) => {
    return (
        <>
        <div className="flex justify-center items-center">
            <h2>Plan {params.id}</h2>
        </div>
        <RequestForm planId={params.id}></RequestForm>
        </>
    );
};

export default PlanDetailsPage;
