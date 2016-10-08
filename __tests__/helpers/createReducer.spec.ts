import * as assign from 'lodash/assign';
import * as deepFreeze from 'deep-freeze';
import createReducer from '../../src/helpers/createReducer';

const reducer = createReducer({
  todos: [],
  isFetching: false,
  errorMessage: undefined,
}, {
  'FETCH_TODOS_REQUEST': (state, payload) => assign({}, state, {
    isFetching: true,
  }),
  'FETCH_TODOS_SUCCESS': (state, payload) => assign({}, state, {
    isFetching: false,
    todos: [...state.todos, payload.todos],
  }),
  'FETCH_TODOS_FAILURE': (state, payload) => assign({}, state, {
    isFetching: false,
    errorMessage: payload.errorMessage,
  }),
});

describe('createReducer', () => {
  it('should create reducer which returns initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      todos: [],
      isFetching: false,
      errorMessage: undefined,
    });
  });

  it('should create reducer which not mutate state or action objects', () => {
    const state = {
      todos: [],
      isFetching: false,
      errorMessage: undefined,
    };
    const action = {
      type: 'FETCH_TODOS_REQUEST',
    };

    deepFreeze(state);
    deepFreeze(action);

    reducer(state, action);
  });

  it('should create reducer which returns given state, if provided action doesn\'t matches declared any', () => {
    const state = {
      todos: [],
      isFetching: true,
    };
    expect(reducer(state, { type: '' })).toBe(state);
  });

  it('should create reducer which returns new state handled by given action, if this action is matches declared any ', () => {
    expect(reducer({
      todos: ['first todo'],
      isFetching: true,
    }, {
      type: 'FETCH_TODOS_SUCCESS',
      payload: {
        todos: 'second todo',
      },
    })).toEqual({
      todos: ['first todo', 'second todo'],
      isFetching: false,
    });
  });
});
