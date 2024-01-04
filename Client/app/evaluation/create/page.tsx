'use client'
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumb3";
import { createEvaluation } from "@/services/evaluationService";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CreateEvaluationForm() {
    const router = useRouter();
    const searchParams = useSearchParams()

    const [colorSizeRecognition, setColorSizeRecognition] = useState<number>(1);
    const [belongingsMemory, setBelongingsMemory] = useState<number>(1);
    const [taskCompletion, setTaskCompletion] = useState<number>(1);
    const [letterNumberDistinction, setLetterNumberDistinction] = useState<number>(1);
    const [stimuliDiscrimination, setStimuliDiscrimination] = useState<number>(1);
    const [auditoryMemory, setAuditoryMemory] = useState<number>(1);
    const [quickResponses, setQuickResponses] = useState<number>(1);
    const [sustainedAttention, setSustainedAttention] = useState<number>(1);
    const [environmentalPerception, setEnvironmentalPerception] = useState<number>(1);
    const [quickComprehension, setQuickComprehension] = useState<number>(1);
    const [mathProblemSolving, setMathProblemSolving] = useState<number>(1);
    const [quranicVersesRecall, setQuranicVersesRecall] = useState<number>(1);
    const [firstTimeAttention, setFirstTimeAttention] = useState<number>(1);
    const [focusOnSignificantStimuli, setFocusOnSignificantStimuli] = useState<number>(1);
    const [totalMark, setTotalMark] = useState<number>(0);

    useEffect(() => {
        // Update total mark whenever any of the evaluation fields change
        const updateTotalMark = () => {
            const fields = [
                colorSizeRecognition,
                belongingsMemory,
                taskCompletion,
                letterNumberDistinction,
                stimuliDiscrimination,
                auditoryMemory,
                quickResponses,
                sustainedAttention,
                environmentalPerception,
                quickComprehension,
                mathProblemSolving,
                quranicVersesRecall,
                firstTimeAttention,
                focusOnSignificantStimuli
            ];

            const total = fields.reduce((acc, val) => acc + val, 0);
            setTotalMark(total);
        };

        updateTotalMark();
    }, [
        colorSizeRecognition,
        belongingsMemory,
        taskCompletion,
        letterNumberDistinction,
        stimuliDiscrimination,
        auditoryMemory,
        quickResponses,
        sustainedAttention,
        environmentalPerception,
        quickComprehension,
        mathProblemSolving,
        quranicVersesRecall,
        firstTimeAttention,
        focusOnSignificantStimuli
    ]);

    const handleEvaluationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const applicationId = Number(searchParams.get("id"));
            console.log(applicationId)
            // Call your createEvaluation function with the evaluation fields
            const response = await createEvaluation(
                applicationId,
                colorSizeRecognition,
                belongingsMemory,
                taskCompletion,
                letterNumberDistinction,
                stimuliDiscrimination,
                auditoryMemory,
                quickResponses,
                sustainedAttention,
                environmentalPerception,
                quickComprehension,
                mathProblemSolving,
                quranicVersesRecall,
                firstTimeAttention,
                focusOnSignificantStimuli,
                totalMark
            );
            //decision 
            var recommended:string = totalMark < 17 ? 
            recommended = "Rejected" : "Accepted";
            router.push(`/applications/${applicationId}`); // Redirect to the application page
            
        } catch (error) {
            console.error("Error creating evaluation:", error);
        }
    };

    return (
        <>
            <Breadcrumbs beforePreviousName='Applications' beforePreviousPath='/applications' previousName='Application Details' previousPath={`/applications/${searchParams.get("id")}`} currentName='Evaluation' pageTitle="Evaluate Application"  />
            <div className="grid grid-cols-1 gap-9">
                <div className="flex flex-col gap-9">
                    {/* FORM STARTS HERE */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Evaluate Application
                            </h3>
                        </div>
                        <form action="#" onSubmit={handleEvaluationSubmit}>
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
                                            value={colorSizeRecognition}
                                            onChange={(e) => setColorSizeRecognition(parseInt(e.target.value))}
                                        />
                                        {colorSizeRecognition}

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
                                            value={belongingsMemory}
                                            onChange={(e) => setBelongingsMemory(parseInt(e.target.value))}
                                        />
                                        {belongingsMemory}
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
                                            value={taskCompletion}
                                            onChange={(e) => setTaskCompletion(parseInt(e.target.value))}
                                        />
                                        {taskCompletion}
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
                                            value={letterNumberDistinction}
                                            onChange={(e) => setLetterNumberDistinction(parseInt(e.target.value))}
                                        />
                                        {letterNumberDistinction}
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
                                            value={stimuliDiscrimination}
                                            onChange={(e) => setStimuliDiscrimination(parseInt(e.target.value))}
                                        />
                                        {stimuliDiscrimination}
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
                                            value={auditoryMemory}
                                            onChange={(e) => setAuditoryMemory(parseInt(e.target.value))}
                                        />
                                        {auditoryMemory}
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
                                            value={quickResponses}
                                            onChange={(e) => setQuickResponses(parseInt(e.target.value))}
                                        />
                                        {quickResponses}
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
                                            value={sustainedAttention}
                                            onChange={(e) => setSustainedAttention(parseInt(e.target.value))}
                                        />
                                        {sustainedAttention}
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
                                            value={environmentalPerception}
                                            onChange={(e) => setEnvironmentalPerception(parseInt(e.target.value))}
                                        />
                                        {environmentalPerception}
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
                                            value={quickComprehension}
                                            onChange={(e) => setQuickComprehension(parseInt(e.target.value))}
                                        />
                                        {quickComprehension}
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
                                            value={mathProblemSolving}
                                            onChange={(e) => setMathProblemSolving(parseInt(e.target.value))}
                                        />
                                        {mathProblemSolving}
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
                                            value={quranicVersesRecall}
                                            onChange={(e) => setQuranicVersesRecall(parseInt(e.target.value))}
                                        />
                                        {quranicVersesRecall}
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
                                            value={firstTimeAttention}
                                            onChange={(e) => setFirstTimeAttention(parseInt(e.target.value))}
                                        />
                                        {firstTimeAttention}
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
                                            value={focusOnSignificantStimuli}
                                            onChange={(e) => setFocusOnSignificantStimuli(parseInt(e.target.value))}
                                        />
                                        {focusOnSignificantStimuli}
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
                                            value={totalMark}
                                            readOnly
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Save Evaluation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
