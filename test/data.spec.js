
describe('data', ()=>{
  it('debería exponer función computeUsersStats en objeto global', ()=>{
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', ()=>{
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', ()=>{
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', ()=>{
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', ()=>{
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const processed = computeUsersStats(users, progress, courses);

    it('debería retornar arreglo de usuarios con propiedad stats', ()=>{
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isAtLeast(user.stats.percent, 0);
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });
    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', ()=>{
      const processed = computeUsersStats(users, progress, courses);
      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', ()=>{
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', ()=>{
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', ()=>{
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });
    });
  });
  describe('sortUsers(users, orderBy, orderDirection)', ()=>{
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const processed = computeUsersStats(users, progress, courses);

    it('debería exponer función orderByName en objeto global', ()=>{
      assert.isFunction(orderByName);
    });

    it('debería exponer función orderByTotalPercentage en objeto global', ()=>{
      assert.isFunction(orderByTotalPercentage);
    });

    it('debería exponer función orderByStats en objeto global', ()=>{
      assert.isFunction(orderByStats);
    });

    it('debería retornar arreglo de usuarios ordenado por nombre ASC', ()=>{
      const sortedUsers = sortUsers(processed, 'name', 'ASC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtMost(sortedUsers[0].name.localeCompare(sortedUsers[1].name), 0);
      }
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC', ()=>{
      const sortedUsers = sortUsers(processed, 'name', 'DESC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtLeast(sortedUsers[i - 1].name.localeCompare(sortedUsers[i].name), 0);
      }
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', ()=>{
      const sortedUsers = sortUsers(processed, 'stats.percent', 'ASC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtMost(sortedUsers[0].stats.percent.localeCompare(sortedUsers[1].stats.percent), 0);
      }
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', ()=>{
      const sortedUsers = sortUsers(processed, 'stats.percent', 'DESC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtLeast(sortedUsers[i - 1].stats.percent.localeCompare(sortedUsers[i].stats.percent), 0);
      }
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', ()=>{
      const sortedUsers = sortUsers(processed, 'stats.exercises.completed', 'ASC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtMost(sortedUsers[0].stats.exercises.completed.localeCompare(sortedUsers[1].stats.exercises.completed), 0);
      }
    });

    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', ()=>{
      const sortedUsers = sortUsers(processed, 'stats.exercises.completed', 'DESC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtLeast(sortedUsers[i - 1].stats.exercises.completed.localeCompare(sortedUsers[i].stats.exercises.completed), 0);
      }
    });

    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', ()=>{
      const sortedUsers = sortUsers(processed, 'stats.quizzes.completed', 'ASC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtMost(sortedUsers[0].stats.quizzes.completed.localeCompare(sortedUsers[1].stats.quizzes.completed), 0);
      }
    });

    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', ()=>{
      const sortedUsers = sortUsers(processed, 'stats.quizzes.completed', 'DESC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtLeast(sortedUsers[i - 1].stats.quizzes.completed.localeCompare(sortedUsers[i].stats.quizzes.completed), 0);
      }
    });

    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', ()=>{
      const sortedUsers = sortUsers(processed, 'stats.quizzes.scoreAvg', 'ASC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtMost(sortedUsers[0].stats.quizzes.scoreAvg.localeCompare(sortedUsers[1].stats.quizzes.scoreAvg), 0);
      }
    });

    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', ()=>{
      const sortedUsers = sortUsers(processed, 'stats.quizzes.scoreAvg', 'DESC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtLeast(sortedUsers[i - 1].stats.quizzes.scoreAvg.localeCompare(sortedUsers[i].stats.quizzes.scoreAvg), 0);
      }
    });

    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', ()=>{
      const sortedUsers = sortUsers(processed, 'stats.reads.completed', 'ASC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtMost(sortedUsers[0].stats.reads.completed.localeCompare(sortedUsers[1].stats.reads.completed), 0);
      }
    });

    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', ()=>{
      const sortedUsers = sortUsers(processed, 'stats.reads.completed', 'DESC');
      for (let i = 1; i < sortedUsers.length; i++) {
        assert.isAtLeast(sortedUsers[i - 1].stats.reads.completed.localeCompare(sortedUsers[i].stats.reads.completed), 0);
      }
    });
  });

  describe('filterUsers(users, filterBy)', ()=>{
    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)', ()=>{
      const filteredUsers = filterUsers(processed, 'Maria');
      for (let i = 0; i < filteredUsers.length; i++) {
        assert.include(filteredUsers[i].name, 'Maria');
      }
    });
  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', ()=>{
    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter');
  });
});
