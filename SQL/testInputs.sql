use gradeIan;

call createAccount('Ian', 'Wilson', 'ianwilson1337@gmail.com', 'answer', 1, 'iwilson', 'password');
call createAccount('Clarice', 'Hannibal', 'c@FBI.gov', 'answer', 2, 'cHanny', 'password');

--
call login('iwilson','');
-- Successfull Login
call login('iwilson', 'password');
-- Failed Login
call login('iwilson', "abFFF");

call generateToken(1);

call checkEmail("ianwilson1337@gmail.com");

call checkUserName("iwilson");

call authenticate((select token from Tokens where user_id=2));

call createClass("Title", "fa", 1, DATE(NOW()), DATE_ADD(NOW(), INTERVAL 2 MONTH));

Update Tokens set ExpirationDate = NOW() where user_id = 1;

call createStudent(1, "John Doe", "mail@mail.com");

call checkStudentEmail("mail@mail.com");

call getClasses(1);

call getStudent("joh");
