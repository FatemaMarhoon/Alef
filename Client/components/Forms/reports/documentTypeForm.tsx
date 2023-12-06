// components/DocumentTypeForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// Define the shape of form data
interface DocumentTypeFormData {
    documentType: string;
}

// Define the props for the DocumentTypeForm component
interface DocumentTypeFormProps {
    onSubmit: SubmitHandler<DocumentTypeFormData>;
}

// DocumentTypeForm component receives onSubmit as a prop
const DocumentTypeForm: React.FC<DocumentTypeFormProps> = ({ onSubmit }) => {
    // Use react-hook-form for form management
    const { register, handleSubmit } = useForm<DocumentTypeFormData>();

    return (
        // Form that triggers the onSubmit function when submitted
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
            {/* Form header with document type selection */}
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Select Document Type
                </h3>
            </div>

            {/* Form body with document type dropdown and submit button */}
            <div className="p-6.5">
                {/* Dropdown to select the type of document */}
                <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                        Document Type <span className="text-meta-1">*</span>
                    </label>
                    <select
                        {...register('documentType', { required: true })}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                    >
                        <option value="">Select Document Type</option>
                        <option value="general">General Report</option>
                        <option value="trip">Trip Report</option>
                        <option value="invoice">Invoice Report</option>

                        {/* Add more options for other document types if needed */}
                    </select>
                </div>

                {/* Button to submit the form */}
                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                    Continue
                </button>
            </div>
        </form>
    );
};

export default DocumentTypeForm;
