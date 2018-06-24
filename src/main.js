window.onload= function(){

  let studentsArray =
  [
    {
      'name': 'juana',
      'stats': {
        'percent': 30,
        'exercises': {
          'completed': 1
        },
        'reads': {
          'completed': 5
        },
        'quizzes': {
          'completed': 7
        }
      }
    },
    {
      'name': 'ana',
      'stats': {
        'percent': 50,
        'exercises': {
          'completed': 2
        },
        'reads': {
          'completed': 2
        },
        'quizzes': {
          'completed': 2
        }
      }
    },
    {
      'name': 'diana',
      'stats': {
        'percent': 28,
        'exercises': {
          'completed': 20
        },
        'reads': {
          'completed': 10
        },
        'quizzes': {
          'completed': 8
        }
      }
    },
    {
      'name': 'liliana',
      'stats': {
        'percent': 50,
        'exercises': {
          'completed': 18
        },
        'reads': {
          'completed': 0
        },
        'quizzes': {
          'completed': 9
        }
      }
    }
  ];

  const selectCohort = document.getElementById('cohortSelector');

  let sampleCohort = 'lim-2018-03-pre-core-pw';
  let cohorts = [];
  fetchCohorts();
  let users = fetchUsersFromAPI(sampleCohort);
  let progress = fetchProgressFromAPI(sampleCohort);
  let courses = getCoursesIndexInCohort(cohorts, sampleCohort);

  console.log(users.length);
  console.log(progress.length);
  // console.log(courses.length);

  function fetchCohorts () {
    fetch('https://api.laboratoria.la/cohorts')
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          let option = document.createElement("option");
          option.text = data[i].id;
          selectCohort.add(option);
        }
      });
  }

  function getCoursesIndexInCohort(cohorts, cohortId) {
    for (var i = 0; i < cohorts.length; i++) {
      if (cohorts[i].id === cohortId){
        return cohorts[i].coursesIndex;
      }
    }
  }

  function fetchUsersFromStaticData(cohort) {
    let parsedObject = JSON.parse(users);
    return parsedObject;
  }

  function fetchUsersFromAPI(cohort) {
    let fetchedUsers = [];
    fetch('https://laboratoria-la-staging.firebaseapp.com/cohorts/'+cohort+'/users')
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          fetchedUsers.push(data[i]);
        }
      });
      return fetchedUsers;
  }

  function fetchProgressFromAPI(cohort) {
    let fetchedProgress = [];
    fetch('https://laboratoria-la-staging.firebaseapp.com/cohorts/'+cohort+'/progress')
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          fetchedProgress.push(data[i]);
        }
      });
      return fetchedProgress;
  }

  function drawTable(usersArray){
    let table = document.getElementById("userTable");
    eraseTable(table);

    for (var i = 0; i < studentsArray.length; i++) {
      let row = table.insertRow(i+1);
      var cellName = row.insertCell(0);
      var cellPercent = row.insertCell(1);
      var cellQuizzes = row.insertCell(2);
      var cellReading = row.insertCell(3);
      var cellExcercisesCompleted = row.insertCell(4);
      cellName.innerHTML = usersArray[i].name;
      cellPercent.innerHTML = usersArray[i].stats.percent;
      cellQuizzes.innerHTML = usersArray[i].stats.quizzes.completed;
      cellReading.innerHTML = usersArray[i].stats.reads.completed;
      cellExcercisesCompleted.innerHTML = usersArray[i].stats.exercises.completed;
    }
  }

  function eraseTable(elmtTable){
    var tableRows = elmtTable.getElementsByTagName('tbody')[0];
    var rowCount = tableRows.length;

    for (var x=rowCount-1; x>0; x--) {
       elmtTable.removeChild(tableRows[x]);
    }
  }

  document.getElementById("searchButton").addEventListener("click", function(){
    let filtered = filterUsers(studentsArray, document.getElementById('userInput').value);
    drawTable(filtered);
  });

  document.getElementById("pAsc").addEventListener("click", function(){
    sortUsers(studentsArray, 'stats.percent', 'ASC');
    drawTable(studentsArray);
  });
  document.getElementById("pDesc").addEventListener("click", function(){
    sortUsers(studentsArray, 'stats.percent', 'DESC');
    drawTable(studentsArray);
  });

  document.getElementById("qAsc").addEventListener("click", function(){
    sortUsers(studentsArray, 'stats.quizzes.completed', 'ASC');
    drawTable(studentsArray);
  });
  document.getElementById("qDesc").addEventListener("click", function(){
    sortUsers(studentsArray, 'stats.quizzes.completed', 'DESC');
    drawTable(studentsArray);
  });

  document.getElementById("rAsc").addEventListener("click", function(){
    sortUsers(studentsArray, 'stats.reads.completed', 'ASC');
    drawTable(studentsArray);
  });
  document.getElementById("rDesc").addEventListener("click", function(){
    sortUsers(studentsArray, 'stats.reads.completed', 'DESC');
    drawTable(studentsArray);
  });

  document.getElementById("eAsc").addEventListener("click", function(){
    sortUsers(studentsArray, 'stats.exercises.completed', 'ASC');
    drawTable(studentsArray);
  });
  document.getElementById("eDesc").addEventListener("click", function(){
    sortUsers(studentsArray, 'stats.exercises.completed', 'DESC');
    drawTable(studentsArray);
  });
}
