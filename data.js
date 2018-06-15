studentsArray =
[
  {
    'name': 'juana',
    'porcentaje1': 1,
    'porcentaje2': 30
  },
  {
    'name': 'ana',
    'porcentaje1': 2,
    'porcentaje2': 50
  },
  {
    'name': 'diana',
    'porcentaje1': 20,
    'porcentaje2': 28
  },
  {
    'name': 'liliana',
    'porcentaje1': 18,
    'porcentaje2': 50
  }
];

console.log(sortUsers(studentsArray, 'porcentaje1', 'DESC'));
console.log(filterUsers(studentsArray, 'iana'));

function sortUsers(users, orderBy, orderDirection) {
  return users.sort(sortOn(orderBy, orderDirection));
}

/* ternary operator reminder:
condition ? resultIfTrue : resultIfFalse;
return orderDirection == 'ASC'? 1:-1;
*/

function sortOn(property, orderDirection) {
  return function(object1, object2) {
    if (object1[property] < object2[property]) {
      return orderDirection === 'ASC' ? -1 : 1;
    } else if (object1[property] > object2[property]) {
      return orderDirection === 'ASC' ? 1 : -1;
    } else {
      return 0;
    }
  };
}

function filterUsers(users, search) {
  return users.filter(user => user.name.includes(search));
}
