import React from 'react';

interface GeneratedInvoiceProps {
    data: {
        studentName: string;
        className: string;
        date: string;
        description: string;
        amount: string;
    };
}

const GeneratedInvoice: React.FC<GeneratedInvoiceProps> = ({ data }) => {
    return (
        <div className="invoice-container">
            <header>
                <h1 className="invoice-title">Invoice</h1>
            </header>

            <div className="details-container">
                <div className="left-section">
                    <p>
                        <strong>Student Name:</strong> {data.studentName}
                    </p>
                    <p>
                        <strong>Description:</strong> {data.description}
                    </p>
                </div>

                <div className="right-section">
                    <p>
                        <strong>Class:</strong> {data.className}
                    </p>
                    <p>
                        <strong>Date:</strong> {data.date}
                    </p>
                </div>
            </div>

            <div className="centered-section">
                <p>
                    <strong>Amount:</strong> {data.amount}
                </p>
            </div>

            <footer>
                <p>
                    <strong>Signature:</strong>
                </p>
            </footer>

            <style jsx>{`
        .invoice-container {
          font-size: 16px;
          max-width: 750px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .invoice-title {
          font-size: 24px;
          margin-bottom: 10px;
          text-align: center;
          color: #333;
        }

        .details-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .left-section,
        .right-section {
          flex: 1;
          text-align: center;
        }

        .centered-section {
          text-align: center;
          margin-bottom: 20px;
        }

        footer {
          text-align: center;
        }
      `}</style>
        </div>
    );
};

export default GeneratedInvoice;
