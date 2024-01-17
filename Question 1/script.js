const students = [
  { name: "Dhishan Debnath", Roll: 1 },
  { name: "Animesh Gupta", Roll: 2 },
  { name: "Tapas Sen", Roll: 3 },
  { name: "Misti Dutta", Roll: 4 },
  { name: "Chini Misra", Roll: 5 }
];

const Details = [
  { Roll: 5, subjects: { math: 35, english: 56, chemistry: 76, computer: 68 } },
  { Roll: 3, subjects: { math: 33, chemistry: 12, computer: 50, english: 35 } },
  { Roll: 1, subjects: { math: 55, english: 75, chemistry: 76, computer: 94 } },
  { Roll: 4, subjects: { english: 12, chemistry: 85, computer: 68, math: 45 } },
  { Roll: 2, subjects: { math: 55, english: 56, computer: 48, chemistry: 12 } }
];

function generateStudentMarkSheet(searchTerm) {
  const matchingStudents = students.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const studentsMarkSheets = matchingStudents.map(student => {
    const studentDetails = Details.find(detail => detail.Roll === student.Roll);

    if (studentDetails) {
      const { subjects } = studentDetails;
      const totalMarks = Object.values(subjects).reduce((sum, mark) => sum + mark, 0);
      const status = totalMarks >= 200 ? "pass" : "fail";

      return {
        name: student.name,
        Roll: student.Roll,
        ...subjects,
        total: totalMarks,
        status: status
      };
    }
    return null;
  }).filter(Boolean); 

  return studentsMarkSheets;
}

function displayResults(results) {
  const outputContainer = document.getElementById('output');
  outputContainer.innerHTML = '';

  if (results.length === 0) {
    outputContainer.innerHTML = '<p>No matching student found.</p>';
    return;
  }

  results.forEach(markSheet => {
    const studentCard = document.createElement('div');
    studentCard.classList.add('student-mark-sheet');

    const studentName = document.createElement('div');
    studentName.classList.add('student-name');
    studentName.textContent = `Name: ${markSheet.name}`;

    const rollNumber = document.createElement('div');
    rollNumber.classList.add('roll-number');
    rollNumber.textContent = `Roll Number: ${markSheet.Roll}`;

    const subjectMarks = document.createElement('div');
    subjectMarks.classList.add('subject-marks');
    subjectMarks.textContent = `Subject Marks: ${JSON.stringify(markSheet)}`;

    const totalMarks = document.createElement('div');
    totalMarks.classList.add('total-marks');
    totalMarks.textContent = `Total Marks: ${markSheet.total}`;

    const passFailStatus = document.createElement('div');
    passFailStatus.classList.add('pass-fail-status');

    if (markSheet.status === 'pass') {
      passFailStatus.textContent = `Status: Pass`;
      passFailStatus.classList.add('pass');
    } else {
      passFailStatus.textContent = `Status: Fail`;
      passFailStatus.classList.add('fail');
    }

    studentCard.appendChild(studentName);
    studentCard.appendChild(rollNumber);
    studentCard.appendChild(subjectMarks);
    studentCard.appendChild(totalMarks);
    studentCard.appendChild(passFailStatus);

    outputContainer.appendChild(studentCard);
  });
}


const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const results = generateStudentMarkSheet(searchTerm);
  displayResults(results);
});


const initialResults = generateStudentMarkSheet('');
displayResults(initialResults);
