window.onload= function(){

  let studentsArray =
  [
    {
      'name': 'juana',
      'stats': {
        'percent': 30,
        'exercises': {
          'completed': 1
        }
      }
    },
    {
      'name': 'ana',
      'stats': {
        'percent': 50,
        'exercises': {
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
        }
      }
    },
    {
      'name': 'liliana',
      'stats': {
        'percent': 50,
        'exercises': {
          'completed': 18
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

  let table = document.getElementById("userTable");
  for (var i = 0; i < studentsArray.length; i++) {
    let row = table.insertRow(i+1);
    var cellName = row.insertCell(0);
    var cellPercent = row.insertCell(1);
    var cellExcercisesCompleted = row.insertCell(2);
    cellName.innerHTML = studentsArray[i].name;
    cellPercent.innerHTML = studentsArray[i].stats.percent;
    cellExcercisesCompleted.innerHTML = studentsArray[i].stats.exercises.completed;

  }
}
