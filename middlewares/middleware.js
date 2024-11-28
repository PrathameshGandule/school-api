function addSchoolMiddleware(req, res, next){
    // TAKING INPUTS THROUGH BODY
    const { name, address, latitude, longitude } = req.body;

    // CHECKING FOR ALL PARAMETER'S EXISTENCE
    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required - name, address, latitude, longitude' 
        });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({
            success: false,
            message: "Latitude and longitude must be valid numbers",
        });
    }
    next();
}

function listSchoolsMiddleware(req, res, next){
    // TAKING AND LAT AND LONG THROUGH QUERY 
    const { latitude, longitude , limit , page } = req.query;

    // CHECKING FOR EXISTENCE OF LAT AND LONG
    if (!latitude || !longitude) {
        return res.status(400).json({
            success: false,
            message: 'Latitude and longitude are required in query parameters',
        });
    }

    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({
            success: false,
            message: "Latitude and longitude must be valid numbers",
        });
    }
    next();
}

export { addSchoolMiddleware , listSchoolsMiddleware };