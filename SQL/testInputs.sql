use gradeian;

-- gets all groups (SiteAdminUserID) - SITE ADMIN ONLY
call getGroups(1);
-- gets all users for (SiteAdminUserID, GroupID) - SITE ADMIN ONLY
call getUsersByGroup(1, 2);
-- gets all licenses for a group (SiteAdminUserID, GroupID) - SITE ADMIN ONLY
call getGroupLicenses(1, 2);
-- gets all users for (AdminID) - Group ADMIN only
call getGroupUsers(1);
-- Access Level, Group Name
call createLicense(3, "Test Group2");
-- Verifies that a license is legit (License)
call checkToken('GU3OWEWYJEWMZI2');

-- checks if an email is already in use
call checkEmail('iw1234@gmail.com', null);
call checkEmail('iw1234@gmail.com', 3);

-- create a new user Account (firstName, lastName, email, securityAnswer, securityQuestion, userName, password, LicenseKey)
call createAccount('Ian', 'Wilson', 'iw1234@gmail.com', 'answer', 1, 'iwilson', 'password', 'WRHYJVINMFHNDM2');
call createAccount('Clarice', 'Hannibal', 'c@FBI.gov', 'answer', 2, 'cHanny', 'password', 'WY4MTMXZJKYOWJH');

-- Updates a user account (userID, FirstName, LastName, emailAddress, SecurityAnswer, SecurityQuestion)
call updateAccount(3, "Bruce", "Wayne", "bwayne@wayne.org", "changedAnswer", 2);
call updateAccount(3, "Ian", "Wilson", "iw1234@gmail.com", "answer", 1);
-- Updates a user's password (userID, oldPassword, newPassword)
call updateUserPassword(3, 'password', 'newPassword');
call updateUserPassword(3, 'newPassword', 'password');
-- gets the user's security question (userName, email)
call getSecurityQuestion("iwilson", null);
call getSecurityQuestion(null, "iw1234@gmail.com");
call getSecurityQuestion(null, null);
-- updates a user's password using (userID, securityAnswer, newPassword) and unlocks the account
call recoverUserPassword(3, 'answer', 'password');
call recoverUserPassword(3, 'wrongAnswer', 'apassword');
-- Unlocks the account for the provided ID
call unlockAccount(3);

-- Checks whether the user is an admin (TeacherID)
call checkYourAdminPrivelege(1);
call checkYourSiteAdminPrivelege(1);

-- login to an account (userName, password)
call login('iwilson','');
-- Successfull Login
call login('iwilson', 'password');
-- Failed Login
call login('iwilson', "abFFF");

call login('user', 'e9b3c904a0b80fcf5674061e57f1c7d6539c9393ec7b404b136a0b216a67d037');

-- Generates a new authentication token for a user (userID)
call generateToken(6);

-- Verifies whether an email is in use (email)
call checkEmail("ianwilson1337@gmail.com");
-- Verifies whether a userName is in use (userName)
call checkUserName("iwilson");

call authenticate((select token from Tokens where user_id=1));
-- gets the account information for a user (userName, password)
call getAccountDetails(3);

call createClass("Title", "fa", 1, DATE(NOW()), DATE_ADD(NOW(), INTERVAL 2 MONTH), 60);
call updateClass(1, "Title updated", "fa", DATE(NOW()), DATE_ADD(NOW(), INTERVAL 2 MONTH), 60);
call deleteClass(3);

Update Tokens set ExpirationDate = NOW() where user_id = 1;

call createStudent(1, "John Doe", "mail@mail.com", null);
call createStudent(1, "John Doe", null, null);
-- Updates the details of a student (studentID, studentName, studentEmail, TeacherID)
call updateStudent(1, "pupil", "email@mail.com", 1);

-- Checks if a student email is in use (email)
call checkStudentEmail("mail@mail.com");
-- Changes a student's status (teacherId, studentId, newStatus) 
call changeStudentStatus(1, 4, 1);
call changeStudentStatus(3, 1, 0);

-- get all classes for given (UserID)
call getClasses(3);
-- get all classes for a given (GroupID)
call getClassesByGroup(1);

call getStudentCount(3);
-- Searches for active students based on (searchString, TeacherID) Teacher ID is used to find group
call getStudent("joh", 1);
-- gets all the students for a provided (TeacherID, GroupID)
call getStudentsByGroup(1, null);
call getStudentsByGroup(1, 2);

-- gets all students for a provided (classID)
call getStudents(3);

call enrollStudent(3,1);
call enrollStudent(3,2);

call withdrawStudent(3, 1);

-- create an assignment group (classId, title, weight)
call createAssignment(1, "Title", 20);
-- update the details for an assignment group (groupId, Title, weight)
call updateAssignmentGroup(1, "Updated Title", 20);
-- delete the assignment group, items, and grades for the provided (groupId)
call deleteAssignmentGroup(1);
-- create an assignment item (groupId, label, weight, questions)
call createAssignmentItem(1, "Title 1", 20, 20);
-- updates the detaisl for the assignment item (itemId, label, weight, questions)
call updateAssignmentItem(1, "Updated Title 1", 20, 15);
-- delete the assignment item and all grades for the given (itemId)
call deleteAssignmentItem(1);


-- Get the Class details for the classId provided (classId)
call getClass(31);
-- Gets the assignment details for the given classId (classId)
call getAssignments(33);
-- Gets the assignment items for a given assignment ID (groupId)
call getAssignmentItems(33);
-- get the grade for a student for a particular assignment (studentId, assignmentId)
call getGrade(1, 102);
-- get the grades for a particular assignment (assignmentId)
call getAssignmentGrades(1);
-- get the grades for a particular student (studentId)
call getStudentGrades(1);
-- save a grade (studentId, assignmentId, grade, questionsCorrect)
call setGrade(18, 168, 100, 10);




