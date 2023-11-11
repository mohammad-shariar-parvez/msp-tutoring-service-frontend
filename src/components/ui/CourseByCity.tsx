// 'use client';
// import React, { useState } from 'react';

// const CourseCity = () => {
//   const [selectedCity, setSelectedCity] = useState('natore');

//   const courses = {
//     natore: [
//       { title: 'Course 1', description: 'Description 1' },
//       { title: 'Course 2', description: 'Description 2' },
//       { title: 'Course 3', description: 'Description 3' },
//       { title: 'Course 4', description: 'Description 4' },
//       { title: 'Course 5', description: 'Description 5' },
//       { title: 'Course 6', description: 'Description 6' },
//     ],
//     pabna: [
//       { title: 'Course A', description: 'Description A' },
//       { title: 'Course B', description: 'Description B' },
//       { title: 'Course C', description: 'Description C' },
//       { title: 'Course D', description: 'Description D' },
//       { title: 'Course E', description: 'Description E' },
//       { title: 'Course F', description: 'Description F' },
//     ],
//   };

//   return (
//     <div>
//       <div className='flex justify-center space-x-4'>
//         <button
//           className={`${
//             selectedCity === 'natore' ? 'bg-blue-500' : 'bg-gray-300'
//           } px-4 py-2 rounded-md text-white`}
//           onClick={() => setSelectedCity('natore')}
//         >
//           Natore City
//         </button>
//         <button
//           className={`${
//             selectedCity === 'pabna' ? 'bg-blue-500' : 'bg-gray-300'
//           } px-4 py-2 rounded-md text-white`}
//           onClick={() => setSelectedCity('pabna')}
//         >
//           Pabna City
//         </button>
//       </div>
//       <div className='flex space-x-4 overflow-x-auto'>

//         {courses[selectedCity].map((course, index) => (
//           <div
//             key={index}
//             className={`${
//               index === 0 ? 'ml-0' : 'ml-0'
//             } w-64 border rounded-md p-4`}
//           >
//             <h3 className='text-xl font-bold'>{course.title}</h3>
//             <p>{course.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseCity;
