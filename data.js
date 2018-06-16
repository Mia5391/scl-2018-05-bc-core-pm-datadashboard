studentsArray =
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

console.log(sortUsers(studentsArray, 'name', 'ASC'));
console.log(sortUsers(studentsArray, 'stats.percent', 'ASC'));
console.log(sortUsers(studentsArray, 'stats.exercises.completed', 'ASC'));
console.log(filterUsers(studentsArray, 'iana'));

function sortUsers(users, orderBy, orderDirection) {
  return users.sort(orderByName(orderDirection));
}

function orderByName(orderDirection) {
  return function(student1, student2) {
    let comparisonResult = student1['name'].localeCompare(student2['name']);
    return orderDirection === 'ASC' ? comparisonResult : -comparisonResult;
  };
}

/* ternary operator reminder:
condition ? resultIfTrue : resultIfFalse;
return orderDirection == 'ASC'? 1:-1;
*/

function filterUsers(users, search) {
  return users.filter(user => user.name.includes(search));
}
