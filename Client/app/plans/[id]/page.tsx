'use client'
import { useRouter } from 'next/router';
import RequestForm from '../../../components/Forms/requestForm'
const PlanDetailsPage = ({ params }: { params: { id: number } }) => {
    return (
        <>
        <RequestForm planId={params.id}></RequestForm>
        </>
    );
};

export default PlanDetailsPage;
