import React from 'react';

interface GeneratedTripReportProps {
  data: {
    studentName: string;
    className: string;
    date: string;
    place: string;
    price: string;
    info: string;
    signature: string;
  };
}

const GeneratedTripReport: React.FC<GeneratedTripReportProps> = ({ data }) => {
  return (
    <div className="report-container">
      <header>
        <h1 className="report-title">Trip Document</h1>
      </header>

      <div className="details-container">
        <div className="left-section">
          <p><strong>Student Name:</strong> {data.studentName}</p>
          <p><strong>Place:</strong> {data.place}</p>
        </div>

        <div className="right-section">
          <p><strong>Class:</strong> {data.className}</p>
          <p><strong>Date:</strong> {data.date}</p>
        </div>
      </div>

      <div className="centered-section">
        <p>{data.info}</p>
        <br></br>
        <p><strong>Price:</strong> {data.price}</p>

      </div>

      <div className="agreement-container">
        <button className="agree-button" type="button"><strong>Agree</strong></button>
        <button className="disagree-button" type="button"><strong>Disagree</strong></button>
      </div>


      <footer>
        <p><strong>Signature:</strong></p>
      </footer>

      <style jsx>{`
        .report-container {
          font-size: 16px;
          max-width: 750px;

          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .report-title {
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

        .agreement-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .checkbox-label {
          margin-right: 20px;
          font-weight: bold;
        }
        .agree-button,
        .disagree-button {
          padding: 10px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
        footer {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default GeneratedTripReport;
