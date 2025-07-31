
const hasError = (errors: {[key:string]: string}) => {
  let result = false;
  for(let prop in errors){
    if(errors[prop]){
      result = true;
    }
  }
  return result;
};

export default hasError;
