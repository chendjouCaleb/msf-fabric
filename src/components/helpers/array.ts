export function toArray(values: string | string[]): string[] {
  let result = [];


  if(values instanceof(Array)){
    values.forEach(v => result.push(v));
  }else{
    result.push(values);
  }

  return result;
}
