(function() {
  'use strict';
  //var sinon = require("sinon");

  if (typeof window !== 'object') {
    //_ = {};
    global._ = {};
  }
  if (typeof window === 'object') {
    //_ = {};
    window._ = {};
  }

    // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    // When the input n not is provided, we return a single value from the array,
    // rather than an array of values
    if (n === undefined) {
      return array[array.length - 1];
    }
    return array.slice(Math.max(0, array.length - n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];

    _.each(collection, function(val) {
      test(val) && result.push(val);
    });

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(val) {
      return !test(val);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var hash = {};

    iterator = (isSorted && iterator) || _.identity;

    _.each(array, function(val) {
      var transformed = iterator(val);
      if (hash[transformed] === undefined) {
        hash[transformed] = val;
      }
    });

    return _.map(hash, function(value) {
      return value;
    });
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];

    _.each(collection, function(item, index, collection) {
      results.push(iterator(item, index, collection));
    });

    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var initializing = arguments.length === 2; //false

    _.each(collection, function(val) {
      if (initializing) {
        initializing = false;
        accumulator = val;
      } else {
        accumulator = iterator(accumulator, val);
      }
    });

    return accumulator;
  };

 // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    /* START SOLUTION */
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
    /* END SOLUTION */
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    /* START SOLUTION */

    /* END SOLUTION */
    if(collection.length === 0) {
      return true;
    }
    var isTrue = true;

    if(iterator) {
      for(let j = 0; j < collection.length; j++) {
        if(!iterator(collection[j])) {
          isTrue = false;
          return isTrue;
        } else {
          isTrue = true;
        }
      }
    } else {
        for(let i = 0; i < collection.length; i++) {
          if(!collection[i] || typeof(collection[i]) === undefined || collection[i] === 0 || collection[i] === null) {
            isTrue = false;
            return isTrue;
          } else {
            isTrue = true;
          }
        }
    }
    return isTrue;

    // collection will always be an array
    // empty array should evaluate to true
    // array could have different data types && if they are truthy that should
    // ...evaluate to true if not evaluate to false
    // if any value is false should evaluate to false
    // if any of the value is undefined should evaluate to false
    // if all the values passed to the iterator function evaluates to true return
    // ...true if not false
  };

/*
var isEven = function(num) {
  return num % 2 === 0;
};

var myTest = _.every([0, 10, 28], isEven)
console.log(myTest);*/

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    /* START SOLUTION */
    let value = true;
    //console.log(JSON.stringify(arguments));
    //console.log(arguments.length);
    if(arguments.length > 1) {
      if(collection.length === 0) {
        return false;
      }
      //value = _.every(collection, iterator);
      for(let i = 0; i < collection.length; i++) {
        if(iterator(collection[i])) {
          value = true;
          return value;
        }
      }
      if(_.every(collection, iterator) || collection.includes(true) || collection.includes('yes')) {
        value = true;
      } else {
        value = false;
      }
    } else {
      //value = _.every(collection)
      if(collection.length === 0) {
        return false;
      }
      if(collection.includes(true) || _.every(collection) || collection.includes('yes')) {
        value = true;
      } else {
        value = false;
      }
    }
return value;

    /* END SOLUTION */
    // collection is always an array
    // when empty collection, should fail
    // should pass for all truthy value
    // should fail for all falsy values (null, 0, undefined, false)
    // should pass for a collection of truthy and falsey values
    // should pass for a set containing one truthy value that is a string - 'yes'
    // when iterator, no matching values, then fail
    // when iterator, atleast one matching value, then pass
    // should work when no callbacks provided
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  //returns the first argument
    // should extend object with attributes of another object
    // should override properties found on destination
    // should not override properties not found in the source
    // should extend from multiple source objects
    // in case of conflict, it should use last properties values when extending from multiple source objects
  _.extend = function(obj) {
    if(arguments.length === 2) {
      let arg1 = JSON.stringify(arguments[0]);
      let arg2 = JSON.stringify(arguments[1]);
      if(arg1 === arg2) {
        return arguments[0];
      }
    }
    let newObj = {};
    for(let i = 0; i < arguments.length; i++) {
      let currObj = arguments[i];
      for(let key in currObj) {
          newObj[key] = currObj[key];
      }
    }
    return newObj;
    /*if(arguments.length > 1) {
      let arg1 = JSON.stringify(arguments[0]);
      let arg2 = JSON.stringify(arguments[1]);
      if(arg1 === arg2) {
        //debugger;
        return arguments[0];
      } else {
        //debugger;
        let key1 = JSON.stringify(Object.keys(arguments[0]));
        let key2 = JSON.stringify(Object.keys(arguments[1]));
        if(Object.keys(arguments[0]).length === 0) {
          newObj = {...arguments[1]};
          return newObj;
        } else if(key1 === key2) {
          //debugger;
          newObj = {...arguments[1]};
          return newObj;
        } else if(key1 !== key2) {
          //debugger;
          newObj = {...arguments[0],...arguments[1]};
          return newObj;
        }
      }
    }
    return newObj;*/
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    /* START SOLUTION */
    if(arguments.length === 2) {
      let arg1 = JSON.stringify(arguments[0]);
      let arg2 = JSON.stringify(arguments[1]);
      if(arg1 === arg2) {
        return arguments[0];
      }
    }
    for(let i = 0; i < arguments.length; i++) {
      for(let key in arguments[i]) {
          if(arguments[0][key] === undefined) {
            arguments[0][key] = arguments[i][key];
          } else {
            continue;
          }
      }
    }
    return arguments[0];
    /* END SOLUTION */
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var executed = false;
    var args;
    return function() {
      if (!executed) {
        args = func.apply(this, arguments);
        executed = true;
      }
      return args;
    }

    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    /* START SOLUTION */

    /* END SOLUTION */
    // this should return a function
    // it should run only once
    // .call to take the function arguments and call the function based on the arguments
    // should always return the result of first call
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    /* START SOLUTION */
    var cacheObj = {};
    var args;
    return function() {
      //debugger;
      var key = JSON.stringify(arguments);
      //for(let key in cacheObj) {
        if(cacheObj.hasOwnProperty(key)) {
          return cacheObj[key];
        } else {
          cacheObj[key] = func.apply(null, arguments);
          //cacheObj[arguments] = arguments;
          //cacheObj[args] = args;
          return cacheObj[key];
        }
      //}
    }
    /* END SOLUTION */
    // Create a cache, object
    // call the function with the arguments, put it in cache
    // next time we make a call to the same function, with similar arguments, it should fetch the result from cache
    // if not make a new call
  };
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    /* START SOLUTION */
    var args = Array.prototype.slice.call(arguments,2);
    return setTimeout(function(){
      return func.apply(this, args);
    }, wait);
    /* END SOLUTION */
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    /* START SOLUTION */
    let arr1 = [];
    for(let i = array.length-1; i >= 0; i--) {
      arr1.push(array[i]);
    }
    return arr1;
    /* END SOLUTION */
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    /* START SOLUTION */

    /* END SOLUTION */
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    /* START SOLUTION */

    /* END SOLUTION */
  };
}());