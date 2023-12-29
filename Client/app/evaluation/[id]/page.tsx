'use client'
import { useEffect, useState } from 'react';
import { getEvaluationById } from '@/services/evaluationService';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumb3';
import { Evaluation } from '@/types/evaluation';

// Functional component for viewing application details
export default function Page({ params }: { params: { id: number } }) {
    const router = useRouter();

    // const [application, setApplication] = useState<Application | null>(null);
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

    useEffect(() => {
        // Fetch application data when the component mounts
        const fetchEvaluationData = async () => {
            try {
                const existingEvaluation = await getEvaluationById(params.id);
                setEvaluation(existingEvaluation);
            } catch (error) {
                console.error('Error fetching application data:', error);
            }
        };

        fetchEvaluationData();
    }, []);


    return (
        <>
            <Breadcrumbs beforePreviousName='Applications' beforePreviousPath='/application' previousName='Application Details' previousPath={`/applications/${evaluation?.application_id}`} currentName='Evaluation' pageTitle="View Evaluation"  />

            <div className="items-center justify-center min-h-screen">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">Evaluation Details</h3>
                    </div>
                        <div className="p-6.5 grid">
                            {/* Color Size Recognition */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Color Size Recognition <span className="text-meta-1">*</span>
                                    </label>

                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.color_size_recognition}
                                        disabled={true}
                                    />
                                    {evaluation?.color_size_recognition}

                                </div>
                            </div>

                            {/* Belongings Memory */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Belongings Memory <span className="text-meta-1">*</span>
                                    </label></div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.belongings_memory}
                                        disabled={true}
                                    />
                                    {evaluation?.belongings_memory}
                                </div>
                            </div>

                            {/* Task Completion */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Task Completion <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.task_completion}
                                        disabled={true}
                                    />
                                    {evaluation?.task_completion}
                                </div>
                            </div>

                            {/* Letter Number Distinction */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Letter Number Distinction <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.letter_number_distinction}
                                        disabled={true}
                                    />
                                    {evaluation?.letter_number_distinction}
                                </div>
                            </div>

                            {/* Stimuli Discrimination */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Stimuli Discrimination <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.stimuli_discrimination}
                                        disabled={true}
                                    />
                                    {evaluation?.stimuli_discrimination}
                                </div>
                            </div>

                            {/* Auditory Memory */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Auditory Memory <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.auditory_memory}
                                        disabled={true}
                                    />
                                    {evaluation?.auditory_memory}
                                </div>
                            </div>

                            {/* Quick Responses */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Quick Responses <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.quick_responses}
                                        disabled={true}
                                    />
                                    {evaluation?.quick_responses}
                                </div>
                            </div>

                            {/* Sustained Attention */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Sustained Attention <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.sustained_attention}
                                        disabled={true}
                                    />
                                    {evaluation?.sustained_attention}
                                </div>
                            </div>

                            {/* Environmental Perception */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Environmental Perception <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.environmental_perception}
                                        disabled={true}
                                    />
                                    {evaluation?.environmental_perception}
                                </div>
                            </div>

                            {/* Quick Comprehension */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Quick Comprehension <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.quick_comprehension}
                                        disabled={true}
                                    />
                                    {evaluation?.quick_comprehension}
                                </div>
                            </div>

                            {/* Math Problem Solving */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Math Problem Solving <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.math_problem_solving}
                                        disabled={true}
                                    />
                                    {evaluation?.math_problem_solving}
                                </div>
                            </div>

                            {/* Quranic Verses Recall */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Quranic Verses Recall <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.quranic_verses_recall}
                                        disabled={true}
                                    />
                                    {evaluation?.quranic_verses_recall}
                                </div>
                            </div>

                            {/* First Time Attention */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        First Time Attention <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.first_time_attention}
                                        disabled={true}
                                    />
                                    {evaluation?.first_time_attention}
                                </div>
                            </div>

                            {/* Focus On Significant Stimuli */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Focus On Significant Stimuli <span className="text-meta-1">*</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={evaluation?.focus_on_significant_stimuli}
                                        disabled={true}
                                    />
                                    {evaluation?.focus_on_significant_stimuli}
                                </div>
                            </div>

                            {/* Total Mark */}
                            <div className="mb-4.5 grid grid-cols-2">
                                <div>
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Total Mark
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        value={evaluation?.total_mark}
                                        readOnly
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                                    />
                                </div>
                            </div>

                            
                        </div>
                </div>
            </div>
        </>
    );
}

// module.exports = viewApplication;
