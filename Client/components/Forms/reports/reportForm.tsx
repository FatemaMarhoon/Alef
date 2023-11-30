// components/ReportForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    title: string;
    content: string;
}

interface ReportFormProps {
    onSubmit: SubmitHandler<FormData>;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm<FormData>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Report Generation
                </h3>
            </div>
            <div className="p-6.5">
                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Report Title <span className="text-meta-1">*</span>
                    </label>
                    <input
                        type="text"
                        {...register('title', { required: true })}
                        placeholder="Enter report title"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    />
                </div>

                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Report Content <span className="text-meta-1">*</span>
                    </label>
                    <textarea
                        {...register('content', { required: true })}
                        placeholder="Enter report content"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    />
                </div>

                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                    Generate Report
                </button>
            </div>
        </form>
    );
};

export default ReportForm;
