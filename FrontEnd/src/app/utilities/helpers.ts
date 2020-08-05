export function formatDate(date: Date | string): string {
  // function takes a Date object or YYYY-MM-DD string
  // Converts to MM/DD/YYYY string
  if (typeof date === "string") {
    date = new Date(date);
  }
  return (date.getUTCMonth() + 1) + "/" + date.getUTCDate() + "/" + date.getUTCFullYear();
}

export function validateToken(token: string): boolean {
  return !!token && token.search(/[a-zA-Z]/) > -1;
}

export function getContextualDateInformation(startDate: string, endDate: string): string {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  let returnString = "";

  if (end < now) {
    // Class is over
    const difference = Math.floor((now.getTime() - end.getTime()) / (1000 * 3600 * 24));
    returnString = "Class ended " + difference + " day" + (difference > 1 ? "s" : "") + " ago";
  } else if (start < now && end > now) {
    // Class is current
    const difference = Math.floor((end.getTime() - now.getTime()) / (1000 * 3600 * 24));
    if (difference > 0) {
      returnString = "Class ends in " + difference + " day" + (difference > 1 ? "s" : "");
    } else {
      returnString = "Class ends today";
    }
  } else {
    // Class is upcoming
    const difference = Math.ceil((start.getTime() - now.getTime()) / (1000 * 3600 * 24));
    returnString = "Class starts in " + difference + " day" + (difference > 1 ? "s" : "");
  }

  return returnString;
}

export function getGradeColor(grade, minPassing): string {
  const passingGrades = 100 - minPassing;
  const sections = Math.round(passingGrades / 3);
  if ( grade < minPassing) {
    return "bg-danger";
  } else if ( grade < (100 - (sections * 2))) {
    return "bg-warning";
  } else if ( grade < (100 - sections)) {
    return "bg-info";
  } else {
    return "bg-success";
  }
}
