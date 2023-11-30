// pages/index.tsx
'use client'
import React, { useState } from 'react';
import ReportForm from '@/components/Forms/reports/reportForm';
import GeneratedReport from '@/components/Forms/reports/generatedReport';
import html2pdf from 'html2pdf.js';

const Home: React.FC = () => {
    const [generatedReport, setGeneratedReport] = useState<{
        title: string;
        content: string;
    } | null>(null);

    const handleReportSubmit = (data: { title: string; content: string }) => {
        setGeneratedReport(data);

        // Generate and download PDF
        const pdfElement = document.getElementById('pdf-element');
        html2pdf(pdfElement);
    };

    return (

        <div className=" items-center justify-center min-h-screen">

            <ReportForm onSubmit={handleReportSubmit} />
            {/* {generatedReport && <GeneratedReport data={generatedReport} />} */}
            <div id="pdf-element">
                {generatedReport && <GeneratedReport data={generatedReport} />}
            </div>
        </div>
    );
};

export default Home;
