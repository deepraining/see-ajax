export const getOption = (env, first, second) => {
  let result;

  if (typeof first !== 'undefined') {
    if (Array.isArray(first)) result = first[env];
    else result = first;
  } else if (typeof second !== 'undefined') {
    if (Array.isArray(second)) result = second[env];
    else result = second;
  }

  return result;
};

// placeholder
export default {};
