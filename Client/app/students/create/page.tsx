// Import necessary modules and components
'use client';
import { useState, ChangeEvent, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { createStudent } from '@/services/studentService';
import { useRouter } from 'next/navigation';
import { Student } from '@/types/student';
import { useSuccessMessageContext } from '../../../components/SuccessMessageContext';
import { currentPreschool } from '@/services/authService';
import { getGrades } from '@/services/gradeCapacityService';
import { GradeCapacity } from '@/types/gradeCapacity';
import ErrorAlert from "@/components/ErrorAlert";
import { StaticValue } from "@/types/staticValue";
import { getGender } from "@/services/staticValuesService";

export default function CreateForm() {
  //declare variables
  const router = useRouter();
  const { setSuccessMessage } = useSuccessMessageContext();
  const [gradesList, setGradesList] = useState<GradeCapacity[]>([]);
  const [studentName, setStudentName] = useState("");
  const [DOB, setDOB] = useState("");
  const [CPR, setCPR] = useState("");
  const [grade, setGrade] = useState("");
  const [contactNumber1, setContactNumber1] = useState("");
  const [contactNumber2, setContactNumber2] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [personal_picture, setPersonalPicture] = useState<File | undefined>(undefined);
  const [passport, setPassport] = useState<File | undefined>(undefined);
  const [certificate_of_birth, setCertificateOfBirth] = useState<File | undefined>(undefined);
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [genderTypes, setGenderTypes] = useState<StaticValue[]>([]);



  useEffect(() => {
    // Fetch gender types when the component mounts
    async function fetchGender() {
      try {
        const types = await getGender();
        setGenderTypes(types);
        console.log(types);
      } catch (error) {
        console.error("Error fetching guardian types:", error);
      }
    }
    fetchGender();
  }, []);

  // Update the handleFileChange function
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | undefined>>) => {
    const file = e.target.files?.[0];
    setFile(file);
  };
  //handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //get the preschool id
      var preschool;
      await currentPreschool().then((preschoolId) => { preschool = preschoolId; })


      // Send the request and log the response
      const response = await createStudent(
        preschool,
        studentName,
        grade,
        DOB,
        CPR,
        contactNumber1,
        contactNumber2,
        guardianName,
        enrollmentDate,
        medicalHistory,
        gender,
        personal_picture,
        certificate_of_birth,
        passport,

      );
      console.log('API Response:', response.data);
      console.log('API Response:', response.data.message);
      const successMsg = response.data.message;
      if (response.status == 200 || response.status == 201) {
        setSuccessMessage(successMsg);
      } else if (response.status == 400 || response.status == 404 || response.status == 500) {
        setError(response.data.message);
      }
      router.push('/students');

      // Redirect after successful submission
      // router.push('/students');
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      }
      else if (error.message) {
        setError(error.message);
      }
    }
  };
  useEffect(() => {
    async function fetchGradesList() {
      try {
        const response = await getGrades();
        console.log('Grade List Response:', response);

        // Log the response.data or the actual array
        console.log('Grade List Data:', response || response);

        setGradesList(response || []);
        // Set loading to false after fetching data (if needed)
      } catch (error) {
        console.error("Error fetching staff list:", error);
        setGradesList([]);
        // Set loading to false in case of an error (if needed)
      }
    }

    fetchGradesList();
  }, []); // Empty
  return (
    <>
      <Breadcrumb pageName="Create Student" />
      {error && <ErrorAlert message={error}></ErrorAlert>}

      <div className=" items-center justify-center min-h-screen">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Student
              </h3>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Student Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter student's name"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.studentName ? 'border-error' : ''
                      }`}
                  />
                  {errors.studentName && (
                    <p className="text-error text-sm mt-1">{errors.studentName}</p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Date of Birth <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="date"
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.DOB ? 'border-error' : ''
                      }`}
                  />
                  {errors.studentName && (
                    <p className="text-error text-sm mt-1">{errors.DOB}</p>
                  )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Gender:</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.gender ? 'border-error' : ''
                      }`}
                  >
                    <option value="">Select Gender</option>
                    {genderTypes.map((genderValue, index) => (
                      <option key={index} value={genderValue.ValueName}>
                        {genderValue.ValueName}
                      </option>
                    ))}
                  </select>
                  {errors.gender && (
                    <p className="text-error text-sm mt-1">{errors.gender}</p>
                  )}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Grade <span className="text-meta-1">*</span>
                  </label>
                  <select
                    name="grade"
                    value={grade} // Use grade directly instead of e.target.value
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Select Grade</option>
                    {gradesList.map((grade, optionIndex) => (
                      <option key={optionIndex} value={grade.grade}>
                        {grade.grade}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    CPR <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={CPR}
                    onChange={(e) => setCPR(e.target.value)}
                    placeholder="Enter student's CPR"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.CPR ? 'border-error' : ''
                      }`}
                  />
                  {errors.CPR && (
                    <p className="text-error text-sm mt-1">{errors.CPR}</p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Contact Number 1<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactNumber1}
                    onChange={(e) => setContactNumber1(e.target.value)}
                    placeholder="Enter student's Contact Number"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.contactNumber1 ? 'border-error' : ''
                      }`}
                  />
                  {errors.contactNumber1 && (
                    <p className="text-error text-sm mt-1">{errors.contactNumber1}</p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Contact Number 2<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactNumber2}
                    onChange={(e) => setContactNumber2(e.target.value)}
                    placeholder="Enter student's Contact Number"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.contactNumber2 ? 'border-error' : ''
                      }`}
                  />
                  {errors.contactNumber2 && (
                    <p className="text-error text-sm mt-1">{errors.contactNumber2}</p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Guardian Name<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="Enter student's Guardian Name"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.guardianName ? 'border-error' : ''
                      }`}
                  />
                  {errors.guardianName && (
                    <p className="text-error text-sm mt-1">{errors.guardianName}</p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Enrollment Date <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="date"
                    value={enrollmentDate}
                    onChange={(e) => setEnrollmentDate(e.target.value)}
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.enrollmentDate ? 'border-error' : ''
                      }`}
                  />
                  {errors.enrollmentDate && (
                    <p className="text-error text-sm mt-1">{errors.enrollmentDate}</p>
                  )}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Medical History <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    placeholder="Enter student's medical history"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${errors.medicalHistory ? 'border-error' : ''
                      }`}
                  />
                  {errors.guardianName && (
                    <p className="text-error text-sm mt-1">{errors.medicalHistory}</p>
                  )}
                </div>

                {/* Personal Picture */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-black dark:text-white">
                    Personal Picture <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="file"
                    // name="personal_picture"
                    onChange={(e) => handleFileChange(e, setPersonalPicture)}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Certificate of Birth */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-black dark:text-white">
                    Certificate of Birth <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="file"
                    // name="certificate_of_birth"
                    onChange={(e) => handleFileChange(e, setCertificateOfBirth)}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>

                {/* Passport */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-black dark:text-white">
                    Passport <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="file"
                    // name="passport"
                    onChange={(e) => handleFileChange(e, setPassport)}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>


                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
