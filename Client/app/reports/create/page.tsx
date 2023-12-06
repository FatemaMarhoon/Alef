// pages/index.ts
'use client'
import React, { useState } from 'react';
import ReportForm from '@/components/Forms/reports/documentTypeForm';
import TripReportForm from '@/components/Forms/reports/tripForm';
import GeneratedReport from '@/components/Forms/reports/generatedTripReport';
import GeneralReportForm from '@/components/Forms/reports/generalReportForm';
import InvoiceGeneratedReport from '@/components/Forms/reports/invoiceReport';

import Loader from "@/components/common/Loader";

import html2pdf from 'html2pdf.js';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import InvoiceForm from '@/components/Forms/reports/invoiceForm';

// pages/index.tsx
// ... (other imports)

const Home: React.FC = () => {
    const [generatedReport, setGeneratedReport] = useState<{
        title: string;
        content: string;
    } | null>(null);

    // State to determine whether to show the TripReportForm
    const [showTripForm, setShowTripForm] = useState(false);
    const [showGeneralForm, setShowGeneralForm] = useState(false);
    const [showGInvoiceForm, setShowInoviceForm] = useState(false);

    const handleReportSubmit = (data: { title: string; content: string, documentType: string }) => {
        setGeneratedReport(data);

        // Check the selected document type
        if (data.documentType === 'trip') {
            // If the document type is 'trip', show the TripReportForm
            setShowTripForm(true);
            setShowGeneralForm(false);
            setShowInoviceForm(false);

        }
        else if (data.documentType === 'general') {
            // Otherwise, continue with the report generation logic
            setShowGeneralForm(true);
            setShowTripForm(false);
            setShowInoviceForm(false);


            // const pdfElement = document.getElementById('pdf-element');
            // html2pdf(pdfElement);
        }
        else if (data.documentType === 'invoice') {
            // Otherwise, continue with the report generation logic
            setShowInoviceForm(true);
            setShowGeneralForm(false);
            setShowTripForm(false);

            // const pdfElement = document.getElementById('pdf-element');
            // html2pdf(pdfElement);
        }
    };

    return (
        <div className=" items-center justify-center min-h-screen">
            {/* Render the DocumentTypeForm component */}
            <ReportForm onSubmit={handleReportSubmit} />

            {/* Conditional rendering of TripReportForm based on showTripForm state */}
            {showTripForm && <TripReportForm onSubmit={handleReportSubmit} />}

            {showGeneralForm && <GeneralReportForm onSubmit={handleReportSubmit} />}
            {showGInvoiceForm && <InvoiceForm onSubmit={handleReportSubmit} />}

            <div id="pdf-element">
                {/* Render the GeneratedReport component */}
                {showTripForm && generatedReport && <GeneratedReport data={generatedReport} />}
                {showGInvoiceForm && generatedReport && <InvoiceGeneratedReport data={generatedReport} />}

            </div>
        </div>
    );
};

export default Home;
