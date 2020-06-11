use gradeIan;

call createAccount('Ian', 'Wilson', 'ianwilson1337@gmail.com', 'answer', 1, 'iwilson', 'password');
call createAccount('Clarice', 'Hannibal', 'c@FBI.gov', 'answer', 2, 'cHanny', 'password');

--
call login('iwilson','');
-- Successfull Login
call login('iwilson', 'password');
-- Failed Login
call login('iwilson', "abFFF");

call login('user', "e9b3c904a0b80fcf5674061e57f1c7d6539c9393ec7b404b136a0b216a67d037");

call generateToken(1);

call checkEmail("ianwilson1337@gmail.com");

call checkUserName("iwilson");

call authenticate((select token from Tokens where user_id=2));

call createClass("Title", "fa", 1, DATE(NOW()), DATE_ADD(NOW(), INTERVAL 2 MONTH));

Update Tokens set ExpirationDate = NOW() where user_id = 1;

call createStudent(1, "John Doe", "mail@mail.com");
call createStudent(1, "Jane Doe", "jane@mail.com");

call checkStudentEmail("mail@mail.com");

call getClasses(3);

call getStudentCount(3);

call getStudent("joh");

call getStudents(3);

call enrollStudent(3,1);
call enrollStudent(3,2);

call withdrawStudent(3, 1);

call createAssignment(1, "Title", 20);

call createAssignmentItem(1, "Title 1", 20, 20);
-- Unlocks the account for the provided ID
call unlockAccount(3);
-- Get the Class details for the classId provided (classId)
call getClass(31);
-- Gets the assignment details for the given classId (classId)
call getAssignments(33);
-- get the grade for a student for a particular assignment (studentId, assignmentId)
call getGrade(1, 1);
-- get the grades for a particular assignment (assignmentId)
call getAssignmentGrades(1);
-- get the grades for a particular student (studentId)
call getStudentGrades(1);
-- save a grade (assignmentId, studentId, grade, questionsCorrect)
call setGrade(3, 1, 100, 10);




