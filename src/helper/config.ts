


export const envNum = (key:string,defaultvalue:number):number => {
    try{
      const envValue = process.env[key];
      if(!envValue){
        return defaultvalue;
      }
      return Number(envValue);
    }
    catch {
      throw new Error(`key ${key} environment variable is not a number`);
    }

}

export const env = (key:string,defaultvalue:string):string =>{
  const envValue = process.env[key];
  if(!envValue){
    return defaultvalue;
  }
  return envValue;  

}

export const envBool = (key:string,defaultvalue:boolean):boolean =>{
  try{
    const envValue = process.env[key];
    if(!envValue){
      return defaultvalue;
    }
    return Boolean(envValue);
  }
  catch {
    throw new Error(`key ${key} environment variable is not a boolean`);
  }


}