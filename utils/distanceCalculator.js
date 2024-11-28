function haversine(lat1, lon1, lat2, lon2) {
    // EARTH'S RADIUS IN KILOMETERS
    const earthRadius = 6371;

    // DISTANCE BETWEEN LATITUDES AND LONGITUDES IN RADIANS
    let dLat = (lat2 - lat1) * Math.PI / 180.0;
    let dLon = (lon2 - lon1) * Math.PI / 180.0;

    // CONVERT LATITUDES TO RADIANS
    lat1 = lat1 * Math.PI / 180.0;
    lat2 = lat2 * Math.PI / 180.0;

    // https://en.wikipedia.org/wiki/Haversine_formula
    // HAVERSINE FORMULA
    let a = Math.pow(Math.sin(dLat / 2), 2) +
            Math.pow(Math.sin(dLon / 2), 2) *
            Math.cos(lat1) *
            Math.cos(lat2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // CALCULATE THE DISTANCE
    return Math.round((earthRadius * c) * 1000) / 1000;
}

function calculateDistanceAndSort(schoolsData, userLat, userLon){

    // CALCULATING DISTANCE BETWEEN USER AND SCHOOL
    let schoolsWithDistance = schoolsData.map(school => ({
        ...school,
        distance: haversine(userLat, userLon, school.latitude, school.longitude),
    }));

    // SORTING THEM BASED ON THE DISTANCE
    const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    return sortedSchools;
}

export { calculateDistanceAndSort };