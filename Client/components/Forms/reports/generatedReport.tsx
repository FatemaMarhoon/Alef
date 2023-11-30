// components/GeneratedReport.tsx
import React from 'react';

interface GeneratedReportProps {
    data: {
        title: string;
        content: string;
    };
}

const GeneratedReport: React.FC<GeneratedReportProps> = ({ data }) => {
    return (
        <div className="report-container">
            <h1>{data.title}</h1>
            <p>{data.content}</p>
            <style jsx>{`
            .report-container {
              font-size: 14px;
              margin: 20px; /* Adjust margins as needed */
              padding: 10px; /* Adjust padding as needed */
            }
            h1 {
            }
            p {
              /* Additional styles for the <p> element */
            }
          `}</style>
        </div>
    );
};

export default GeneratedReport;
