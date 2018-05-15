/**
 * Cache module for Football.org api requests
 * we store api calls to football.org in memory to reduce
 * number of calls. The data is reasonably static use
 * cache.keepForMs to define for how long is data stored in memory.
 * Timer is applied for each key using createdAt prop.
 * v.0.0.1
 */

const football = require('./.football');

const cache={
  keepForMs: football.timeInCache,
  /**
   * Store keeps cached data by key. Use constructKey function to create unique key
   * on per request base. Values stored are stringified json objects.
   * @param key: unique string
   * @param key.value: stringified data
   * @param key.createdAt: date - moment values are stored in cache store
   */
  store:{
    key:{
      value:"JSON.stringify()",
      createdAt:"Moment of creation"
    }
  },
  /**
   * Creates unique key to be used for caching
   */
  constructKey: (url, params)=>{
    let uid = url;

    //keys=Object.keys(params);
    uid+="_&_" + JSON.stringify(params);

    return uid;
  },
  isExpired:(createdAt)=>{
    let now = new Date();
    let diff = now - createdAt;
    if (diff > cache.keepForMs){
      //console.log("Expired data in cache...", diff);
      return true;
    }else{
      return false;
    }
  },
  /**
   * Add key value pair to cache store
   * @param key: unique string key. Build thisone based on url request including all parameters
   * @param value: object that will be stringified using JSON.stringify
   */
  write:(key, value)=>{
    try{
      //check if key already exists
      if (cache.store[key]){
        //send notification about update
        console.warn("Updating cache key...", key);
      }
      //save data to cache
      cache.store[key] = {
        value: JSON.stringify(value),
        storedAt: new Date()
      }
      return true;
    }catch(e){
      console.error("Caching failed...", e);
      return false;
    }
  },
  /**
   * Get data from specific key from cache
   * @param key: unique string key. Build thisone based on url request including all parameters
   */
  read:(key)=>{
    let data;
    if (cache.store[key]){
      let raw = cache.store[key];
      if (cache.isExpired(raw.storedAt)==false){
        //get data from cache
        data = JSON.parse(raw.value);
      }
    }
    return data;
  },
  /**
   * Remove key - value pair from store
   * @param key: unique string key. Build thisone based on url request including all parameters
   */
  remove:(key)=>{
    cache.store.delete(key);
  }
}

module.exports = cache;
