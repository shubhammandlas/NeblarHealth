function deepEqualWithExclusion(obj1 = {}, obj2, excludeFields = []) {
    // Helper function to check if two values are equal
    function isDeepEqual(value1, value2) {
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        return deepEqualWithExclusion(value1, value2, excludeFields);
      }
      return value1 === value2;
    }
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      if (excludeFields.includes(key)) {
        continue;
      }
  
      const value1 = obj1[key];
      const value2 = obj2[key];
  
      if (!isDeepEqual(value1, value2)) {
        return false;
      }
    }
    return true;
}

module.exports = deepEqualWithExclusion;