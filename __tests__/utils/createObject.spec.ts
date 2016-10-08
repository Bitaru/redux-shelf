import createObject from '../../src/utils/createObject';

describe('createObject', () => {
  it('should create object by given one level deep path string', () => {
    expect(createObject('a')).toEqual({
      a: {},
    });
  });

  it('should create object by given two level deep path string', () => {
    expect(createObject('a.b')).toEqual({
      a: {
        b: {}
      },
    });
  });

  it('should create object by given three level deep path string', () => {
    expect(createObject('a.b.c')).toEqual({
      a: {
        b: {
          c: {}
        }
      },
    });
  });

  it('should throw an Error if path starts with .', () => {
    expect(() => createObject('.a.b.c')).toThrowError('Path can\'t starts with .');
  })

  it('should throw an Error if path ends with .', () => {
    expect(() => createObject('a.b.c.')).toThrowError('Path can\'t ends with .');
  })
});
