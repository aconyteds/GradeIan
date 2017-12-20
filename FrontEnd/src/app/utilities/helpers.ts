export function formatDate(date:Date|string):string{
  //function takes a Date object or YYYY-MM-DD string
  //Converts to MM/DD/YYYY string
  if(typeof date === "string"){
    date = new Date(date);
  }
  return (date.getUTCMonth()+1)+"/"+date.getUTCDate()+"/"+date.getUTCFullYear();
}
