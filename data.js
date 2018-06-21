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

console.log(JSON.stringify(sortUsers(studentsArray, 'name', 'ASC')));
console.log(JSON.stringify(sortUsers(studentsArray, 'stats.percent', 'DESC')));
console.log(JSON.stringify(sortUsers(studentsArray, 'stats.exercises.completed', 'ASC')));
console.log(JSON.stringify(filterUsers(studentsArray, 'iana')));

function sortUsers(users, orderBy, orderDirection) {
  if (orderBy === 'name') {
    return users.sort(orderByName(orderDirection));
  } else if (orderBy === 'stats.percent') {
    return users.sort(orderByTotalPercentage(orderDirection));
  } else {
    return users.sort(orderByStats(orderBy, orderDirection));
  }
}

function orderByName(orderDirection) {
  return function(student1, student2) {
    let comparisonResult = student1.name.localeCompare(student2.name);
    return orderDirection === 'ASC' ? comparisonResult : -comparisonResult;
  };
}

function orderByTotalPercentage(orderDirection) {
  return function(student1, student2) {
    let comparisonResult = student1.stats.percent - student2.stats.percent;
    return orderDirection === 'ASC' ? comparisonResult : -comparisonResult;
  };
}

function orderByStats(orderBy, orderDirection) {
  let criteria = orderBy.split('.');
  return function(student1, student2) {
    let comparisonResult = student1.stats[criteria[1]][criteria[2]] - student2.stats[criteria[1]][criteria[2]];
    return orderDirection === 'ASC' ? comparisonResult : -comparisonResult;
  };
}

function filterUsers(users, search){
  let upperCaseSearch = search.toUpperCase();
  return users.filter(user => user.name.toUpperCase().includes(upperCaseSearch));
}
